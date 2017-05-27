import * as path from 'path';
import * as webpack from 'webpack';
import { Options } from './Options';
import { TsHost } from './TsHost';
import { parseImports } from './Imports';
import { modules, Module } from './ModuleCache';
import { CodeGenerator } from './CodeGenerator';

interface Type {
    generate(generator: CodeGenerator, isRoot?: boolean): void;
}

class SimpleType implements Type {
    static readonly undefined = new SimpleType('undefined');
    static readonly null = new SimpleType('null');
    static readonly boolean = new SimpleType('boolean');
    static readonly number = new SimpleType('number');
    static readonly string = new SimpleType('string');

    constructor(readonly type: string) {
    }

    generate(generator: CodeGenerator, isRoot?: boolean): void {
        if (isRoot) {
            generator.write('declare const __jsonRoot: ');
        }
        generator.write(this.type);
        if (isRoot) {
            generator.writeLine(';');
            generator.writeLine('export = __jsonRoot;');
        }
    }
}

class ObjectType implements Type {
    constructor(readonly host: TsHost, value: any) {
        for (const property of Object.keys(value)) {
            const type = getType(host, value[property]);
            this.properties.push({ property, type });
        }
    }

    readonly properties: { property: string, type: Type }[] = [];

    generate(generator: CodeGenerator, isRoot?: boolean): void {
        if (isRoot) {
            generator.write('declare const __jsonRoot: ');
        }
        generator.writeLine('{');
        generator.indent();

        this.properties.forEach(property => {
            generator.write('readonly ', this.host.identifier(property.property), ': ');
            property.type.generate(generator);
            generator.writeLine(';');
        });

        generator.outdent();
        generator.write('}');
        if (isRoot) {
            generator.writeLine();
            generator.writeLine('export = __jsonRoot;');
        }
    }
}

class ArrayType implements Type {
    constructor(readonly host: TsHost, value: any[]) {
        this.itemTypes = value.map(v => getType(host, v));
    }

    readonly itemTypes: Type[];

    generate(generator: CodeGenerator, isRoot?: boolean): void {
        if (isRoot) {
            generator.write('declare const __jsonRoot: ');
        }
        if (this.itemTypes.length === 0) {
            generator.write('void[]');
        } else {
            generator.writeLine('[');
            generator.indent();

            let first = true;
            this.itemTypes.forEach(itemType => {
                if (!first) {
                    generator.writeLine(',');
                }
                itemType.generate(generator);
                first = false;
            });

            generator.outdent();
            generator.writeLine();
            generator.write(']');
        }
        if (isRoot) {
            generator.writeLine(';');
            generator.writeLine('export = __jsonRoot;');
        }
    }
}

function getType(host: TsHost, value: any): Type {
    switch (typeof value) {
        case 'undefined':
            return SimpleType.undefined;
        case 'boolean':
            return SimpleType.boolean;
        case 'number':
            return SimpleType.number;
        case 'string':
            return SimpleType.string;
        case 'object':
            if (value === null) {
                return SimpleType.null;
            }
            if (Array.isArray(value)) {
                return new ArrayType(host, value);
            }
            return new ObjectType(host, value);
    }
    throw new Error(`Unknown type for ${value}`);
}

export class JsonModules {
    constructor(readonly host: TsHost, readonly loader: webpack.loader.LoaderContext, readonly options: Options) {
    }

    loadJsonModules(sourceText: string, prequel: string): Promise<Module[]> {
        const promises = Array.from(parseImports(this.host, this.loader.resourcePath, sourceText, this.options.test))
            .map(filePath => this.loadJsonModule(filePath, prequel));

        return Promise.all(promises)
            .then(modules => modules.filter(m => !!m));
    }

    private loadJsonModule(filePath: string, prequel: string): Promise<Module> {
        return new Promise<Module>((resolve, reject) => {
            const file = modules.get(filePath);
            if (file) {
                return resolve(file);
            }
            this.loader.loadModule(filePath, (err, source) => {
                if (err) return reject(err);
                const contents = this.parseJsonModule(source);
                const file = modules.add(filePath, `${prequel}\n\n${contents}`);
                if (this.options.save) {
                    this.host.writeFileIfChanged(file.dtsPath, file.contents);
                }
                resolve(file);
            });
        });
    }

    private parseJsonModule(source: string | undefined): string | undefined {
        function parseJson(source: string | undefined): any {
            if (!source) {
                return undefined;
            }
            const module: {exports?: any} = {};
            eval(source);
            return module.exports;
        }

        const json = parseJson(source);
        if (json === undefined) {
            return undefined;
        }

        const generator = new CodeGenerator();
        const type = getType(this.host, json);
        type.generate(generator, true);
        return generator.code;
    }
}
