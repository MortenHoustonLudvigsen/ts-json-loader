import * as webpack from 'webpack';
import * as loaderUtils from 'loader-utils';

export interface Options {
    compiler: string;
    test: RegExp;
    save: boolean;
}

export function getOptions(loader: webpack.loader.LoaderContext): Options {
    return Object.assign({}, {
        compiler: 'typescript',
        test: /\.json$/,
        save: false
    }, loaderUtils.getOptions<Options>(loader));
}
