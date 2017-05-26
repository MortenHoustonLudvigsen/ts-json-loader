/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = [
	{
		"null": null,
		"true": true,
		"false": false,
		"number": 42,
		"string": "string",
		"emptyArray": [],
		"array": [
			1,
			2,
			3,
			4,
			5
		],
		"mixedArray": [
			1,
			"2",
			true,
			false,
			null,
			{
				"false": false,
				"number": 42,
				"string": "string"
			}
		],
		"child1": {
			"null": null,
			"true": true,
			"false": false
		},
		"child2": {
			"number": 42,
			"string": "string",
			"array": [
				1,
				2,
				3,
				4,
				5
			]
		}
	},
	{
		"null": null,
		"true": true,
		"false": false,
		"number": 42,
		"string": "string",
		"emptyArray": [],
		"array": [
			1,
			2,
			3,
			4,
			5
		],
		"mixedArray": [
			1,
			"2",
			true,
			false,
			null,
			{
				"false": false,
				"number": 42,
				"string": "string"
			}
		],
		"child1": {
			"null": null,
			"true": true,
			"false": false
		},
		"child2": {
			"number": 42,
			"string": "string",
			"array": [
				1,
				2,
				3,
				4,
				5
			]
		}
	},
	{
		"null": null,
		"true": true,
		"false": false,
		"number": 42,
		"string": "string",
		"emptyArray": [],
		"array": [
			1,
			2,
			3,
			4,
			5
		],
		"mixedArray": [
			1,
			"2",
			true,
			false,
			null,
			{
				"false": false,
				"number": 42,
				"string": "string"
			}
		],
		"child1": {
			"null": null,
			"true": true,
			"false": false
		},
		"child2": {
			"number": 42,
			"string": "string",
			"array": [
				1,
				2,
				3,
				4,
				5
			]
		}
	}
];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
	"null": null,
	"true": true,
	"false": false,
	"number": 42,
	"string": "string",
	"emptyArray": [],
	"array": [
		1,
		2,
		3,
		4,
		5
	],
	"mixedArray": [
		1,
		"2",
		true,
		false,
		null,
		{
			"false": false,
			"number": 42,
			"string": "string"
		}
	],
	"child1": {
		"null": null,
		"true": true,
		"false": false
	},
	"child2": {
		"number": 42,
		"string": "string",
		"array": [
			1,
			2,
			3,
			4,
			5
		]
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = null;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = 42;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {
	"empty": null,
	"valid": true,
	"not-valid": false,
	"count": 42,
	"name": "Aragorn",
	"array": [
		null,
		true,
		false,
		43,
		"Frodo"
	]
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
	"name": "ts-json-loader",
	"version": "1.0.0",
	"description": "Generate typescript typings for json files loaded using webpack",
	"main": "lib/ts-json-loader.js",
	"scripts": {
		"clean:lib": "rimraf lib/* test/lib/*",
		"prebuild:lib": "npm run clean:lib",
		"build:lib": "tsc -p src",
		"clean:test": "rimraf test/lib/*",
		"prebuild:test": "npm run clean:test",
		"build:test": "tsc -p test/src",
		"build": "npm run build:lib && npm run build:test",
		"prewatch": "npm run clean:lib",
		"watch": "tsc -p src --watch",
		"pretest": "npm run build",
		"test": "node test/lib/index.js",
		"prepublishOnly": "npm test"
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/MortenHoustonLudvigsen/ts-json-loader.git"
	},
	"keywords": [
		"ts-loader",
		"webpack",
		"webpack loader",
		"loader",
		"typescript",
		"ts",
		"TypeScript"
	],
	"author": "Morten Houston Ludvigsen",
	"license": "MIT",
	"bugs": {
		"url": "https://github.com/MortenHoustonLudvigsen/ts-json-loader/issues"
	},
	"homepage": "https://github.com/MortenHoustonLudvigsen/ts-json-loader#readme",
	"devDependencies": {
		"@types/escape-string-regexp": "0.0.30",
		"@types/fs-extra": "^2.0.0",
		"@types/glob": "^5.0.30",
		"@types/minimist": "^1.2.0",
		"@types/mocha": "^2.2.40",
		"@types/rimraf": "0.0.28",
		"@types/webpack": "^2.2.14",
		"css-loader": "^0.28.0",
		"escape-string-regexp": "^1.0.5",
		"fs-extra": "^2.1.2",
		"glob": "^7.1.1",
		"minimist": "^1.2.0",
		"mocha": "^3.2.0",
		"rimraf": "^2.6.1",
		"source-map-support": "^0.4.14",
		"ts-loader": "^2.1.0",
		"typescript": "^2.3.0",
		"webpack": "^2.4.1"
	},
	"dependencies": {
		"loader-utils": "^1.1.0"
	}
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "Forty two";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var empty_object_json_1 = __webpack_require__(2);
var namedEmptyObject = __webpack_require__(2);
var null_json_1 = __webpack_require__(4);
var namedNull = __webpack_require__(4);
var true_json_1 = __webpack_require__(9);
var namedTrue = __webpack_require__(9);
var false_json_1 = __webpack_require__(3);
var namedFalse = __webpack_require__(3);
var number_json_1 = __webpack_require__(5);
var namedNumber = __webpack_require__(5);
var string_json_1 = __webpack_require__(8);
var namedString = __webpack_require__(8);
var object_json_1 = __webpack_require__(6);
var namedObject = __webpack_require__(6);
var child_objects_json_1 = __webpack_require__(1);
var namedChildren = __webpack_require__(1);
var array_json_1 = __webpack_require__(0);
var namedArray = __webpack_require__(0);
var package_json_1 = __webpack_require__(7);
var namedPkg = __webpack_require__(7);
var everything = {
    emptyObject: empty_object_json_1.default,
    namedEmptyObject: namedEmptyObject,
    Null: null_json_1.default,
    namedNull: namedNull,
    True: true_json_1.default,
    namedTrue: namedTrue,
    False: false_json_1.default,
    namedFalse: namedFalse,
    Number: number_json_1.default,
    namedNumber: namedNumber,
    String: string_json_1.default,
    namedString: namedString,
    object: object_json_1.default,
    namedObject: namedObject,
    children: child_objects_json_1.default,
    namedChildren: namedChildren,
    array: array_json_1.default,
    namedArray: namedArray,
    pkg: package_json_1.default,
    namedPkg: namedPkg
};


/***/ })
/******/ ]);