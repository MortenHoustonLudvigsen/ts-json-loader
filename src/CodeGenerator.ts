import { TsHost } from './TsHost';

export class CodeGenerator {
    private _code = '';
    private _indentCount = 0;
    private _indent = '';
    private _atStartOfLine = true;

    indent() {
        this._indentCount += 1;
        this._indent = Array(this._indentCount * 4 + 1).join(' ');
    }

    outdent() {
        this._indentCount = Math.max(0, this._indentCount - 1);
        this._indent = Array(this._indentCount * 4 + 1).join(' ');
    }

    get code(): string {
        return this._code;
    }

    write(...strings: string[]): void {
        strings.forEach(str => this.writeStr(str, false));
    }

    writeLine(line?: string): void {
        this.writeStr(line, true);
    }

    private writeIndentation(): void {
        if (this._atStartOfLine) {
            this._code += this._indent;
            this._atStartOfLine = false;
        }
    }

    private splitLines(str: string): string[] {
        return str.split(/\r\n|\r|\n/g);
    }

    private writeFragmentInternal(str: string, isLine: boolean): void {
        this.writeIndentation();
        this._code += str;
        if (isLine) {
            this._code += '\n';
        }
        this._atStartOfLine = isLine;
    }

    private writeStr(str: string | undefined, isLine: boolean): void {
        if (str == null) {
            str = '';
        }
        if (str === '') {
            if (isLine) {
                this.writeFragmentInternal('', true);
            }
        }
        else {
            const lines = this.splitLines(str);
            const lastLine = <string>lines.pop();
            for (const line of lines) {
                this.writeFragmentInternal(line, true);
            }
            this.writeFragmentInternal(lastLine, isLine);
        }
    }
}
