'use strict';

const join = require('path').join;
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('common', () => {
  var files = [
    '.editorconfig',
    '.gitattributes',
    '.gitignore'
  ];

  it('creates expected default files', done => {
    helpers
      .run(join(__dirname, '../generators/app'))
      .on('end', () => {
        assert.file(files);
        done();
      });
  });

  it('creates no files', done => {
    helpers
      .run(join(__dirname, '../generators/app'))
      .withOptions({
        editorconfig: false,
        gitattributes: false,
        gitignore: false
      })
      .on('end', () => {
        assert.noFile(files);
        done();
      });
  });

  it('creates selected files', done => {
    helpers
      .run(join(__dirname, '../generators/app'))
      .withOptions({
        editorconfig: true,
        gitattributes: false,
        gitignore: true
      })
      .on('end', () => {
        assert.file([
          '.editorconfig',
          '.gitignore'
        ]);
        assert.noFile([
          '.gitattributes'
        ]);
        done();
      });
  });

  files.forEach(function (file) {
    it('creates ' + file + ' file only', done => {
      var options = {
        editorconfig: false,
        gitattributes: false,
        gitignore: false
      };
      options[file.replace('.', '')] = true;

      helpers
        .run(join(__dirname, '../generators/app'))
        .withOptions(options)
        .on('end', () => {
          assert.file(file);
          assert.noFile(files.map(assertFile => {
            return assertFile !== file ? assertFile : false;
          }));
          done();
        });
    });
  });
});
