[![Build status](https://ci.appveyor.com/api/projects/status/lg827hhyt9n4jc11/branch/master?svg=true)](https://ci.appveyor.com/project/MortenHoustonLudvigsen/ts-json-loader/branch/master) [![Build Status](https://travis-ci.org/MortenHoustonLudvigsen/ts-json-loader.svg?branch=master)](https://travis-ci.org/MortenHoustonLudvigsen/ts-json-loader)
# ts-json-loader

**_This package is not ready for use_**

Create [TypeScript](http://www.typescriptlang.org/) typings for JSON files loaded in [webpack](https://webpack.js.org/) for use with [ts-loader](https://github.com/TypeStrong/ts-loader).

## Installation

```
npm install ts-json-loader
```

You will also need to install [TypeScript](http://www.typescriptlang.org/) and [ts-loader](https://github.com/TypeStrong/ts-loader) if you have not already.

```
npm install typescript ts-loader
```

## Example

The following example webpack configuration provides typings for modules ending with `.json`.

Note that `ts-json-loader` comes **_after_** [ts-loader](https://github.com/TypeStrong/ts-loader), and that [ts-loader](https://github.com/TypeStrong/ts-loader) **_must_** be configured with `usePreviousLoaderGeneratedFiles: true`.

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { usePreviousLoaderGeneratedFiles: true }
          },
          {
            loader: 'ts-json-loader',
            options: { test: /\.json$/ }
          }
        ]
      }
    ]
  },
  ...
};
```

To make the typings generated by `ts-json-loader` available to other tools (f.ex. `tsc`) they can be saved as `.d.ts` files:

```js
{
  loader: 'ts-json-loader',
  options: { test: /\.json$/, save: true }
}
```

With the configution above, and given a file `object.json`:

```json
{
    "empty": null,
    "valid": true,
    "not-valid": false,
    "count": 42,
    "name": "Aragorn",
    "array": [null, true, false, 43, "Frodo"]
}
```

... typings like the following will be generated by `ts-json-loader` and be available to [ts-loader](https://github.com/TypeStrong/ts-loader):

```typescript
declare const __jsonRoot: {
    readonly empty: null;
    readonly valid: boolean;
    readonly 'not-valid': boolean;
    readonly count: number;
    readonly name: string;
    readonly array: [
        null,
        boolean,
        boolean,
        number,
        string
    ];
}
export = __jsonRoot;
```

If the option `save` is `true` these typings will also be saved to file `object.json.d.ts`.

It is now possible to import `object.json` in [TypeScript](http://www.typescriptlang.org/):

```typescript
import * as obj from './object.json';

console.log(obj.name);
```

Named imports can also be used:

```typescript
import { name, count } from './object.json';

console.log(name, count);
```

## Options

### test _(RegExp) (default=/\.json$/)_

Specifies which modules to generate typings for.

If [json-loader](https://github.com/webpack-contrib/json-loader) is used (webpack 2 automatically loads `.json` files), this option should match the `test` option for [json-loader](https://github.com/webpack-contrib/json-loader).

### save _(boolean) (default=false)_

Specifies whether to save the generated typings to disk. If true, the typings will be saved to a file with `".d.ts"` appended to the file path of the imported module. So the typings for `object.json` will be saved in file `object.json.d.ts`.

This makes the typings available to other tools, f.ex. `tsc`.

### compiler _(string) (default='typescript')_

Allows use of TypeScript compilers other than the official one. Should be set to the NPM name of the compiler, eg [`ntypescript`](https://github.com/basarat/ntypescript).


## Developement

First, install dependent packages:

```
npm install
```

To build the project:

```
npm run build
```

### Testing

At the moment there are two simple test projects:

* `./test/tests/basic`
* `./test/tests/save-dts-files`

To run webpack on these test projects:

```
npm test
```
