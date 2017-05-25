import * as path from 'path';
import * as webpack from 'webpack';
import { Options } from './Options';
import { TsHost } from './TsHost';
import { parseImports } from './Imports';
import { modules, Module } from './ModuleCache';

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
            let module = modules.get(filePath);
            if (module) {
                return resolve(module);
            }
            const source = this.host.readFile(filePath);
            const contents = this.parseJsonModule(source);
            if (contents) {
                module = modules.add(filePath, `${prequel}\n\n${contents}`);
                if (this.options.save) {
                    this.host.writeFileIfChanged(module.dtsPath, module.contents);
                }
                return resolve(module);
            }
            return resolve(undefined);
        });
    }

    private parseJsonModule(source: string | undefined): string | undefined {
        const json = parseJson(source);
        if (!json) {
            return undefined;
        }
        console.log(json);

        
        const host = this.host;

        function generateTypeDefinitions(classNames: string[]) {
            let typings = '';

            // Generate default object
            typings += '// Default object containing all local CSS classes\n';
            typings += 'declare const __styles: {\n';
            for (const className of classNames) {
                typings += `    ${JSON.stringify(className)}: string;\n`;
            }
            typings += '};\n';
            typings += 'export default __styles;\n\n';

            // Generate named exports
            let firstNamedExport = true;
            for (const className of classNames) {
                if (className !== '__styles' && host.isValidIdentifier(className)) {
                    if (firstNamedExport) {
                        typings += '// Named exports with local CSS classes whose names are valid identifiers\n';
                    }
                    firstNamedExport = false;
                    typings += `export const ${className}: string;\n`;
                }
            }

            return typings;
        }

        function parseClassNames(source: string): string[] {
            const match = /exports.locals\s*=\s*({[^}]*})/.exec(source);
            const locals = match && JSON.parse(match[1]) || {};
            const classNames = [];
            for (const className in locals) {
                if (locals.hasOwnProperty(className)) {
                    classNames.push(className);
                }
            }
            return classNames;
        }

        function parseJson(source: string | undefined): any {
            if (!source){
                return undefined;
            }
            try {
                return JSON.parse(source);
            } catch (err) {
                return undefined;
            }
        }

        // return generateTypeDefinitions(parseClassNames(source));
        return "";
    }
}
