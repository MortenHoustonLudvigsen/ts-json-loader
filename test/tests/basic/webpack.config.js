﻿const path = require('path');

module.exports = {
    entry: './src/index.ts',

    output: {
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: { usePreviousLoaderGeneratedFiles: true, silent: true }
                    },
                    {
                        loader: 'ts-json-loader',
                        options: { test: /\.json$/ }
                    },
                ]
            }
        ]
    },
};