'use strict';
var babel = require('babel-core');
var wallabify = require('wallabify');
var wallabyPostprocessor = wallabify({
  // browserify options, such as insertGlobals: false
}
// you may also pass an initializer function to chain other browserify options,
// such as transformers , b =>
// b.exclude('mkdirp').transform(require('babelify'))
);

module.exports = (wallaby) => {
  return {
    files: [
      {
        pattern: 'node_modules/chai/chai.js',
        instrument: false
      }, {
        pattern: 'src/*.ts',
        load: false
      }
    ],
    tests: [
      {
        pattern: 'tests/*spec.ts',
        load: false
      }
    ],
    compilers: {
      'src/*.ts': wallaby.compilers.typeScript({
          "outDir": "./ts-build/",
          "sourceRoot": "./src",
          "sourceMap": true,
          "noImplicitAny": true,
          "moduleResolution": "node",
          "module": "commonjs",
          "target": "es6",
          "allowJs": true,
          "experimentalDecorators": true
        })
    },
    testFramework: "mocha",
    postprocessor: wallabyPostprocessor,
    bootstrap: function (wallaby) {
      var mocha = wallaby.testFramework;
      mocha.ui("bdd");
      window.chai = chai;
      window.expect = chai.expect;
      // required to trigger tests loading
      window
        .__moduleBundler
        .loadTests();
    },
    debug: true
  };
};