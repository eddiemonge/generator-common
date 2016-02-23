'use strict';

const generators = require('yeoman-generator');

const files = [
  'editorconfig',
  'gitattributes',
  'gitignore'
];

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    files.forEach(file => {
      this.option(file, {
        type: Boolean,
        desc: 'Create .' + file + ' file',
        defaults: true
      });
    });
  },

  configuring: function () {
    files.forEach( file => this.config.set(file, this.options[file]));
  },

  writing: function () {
    files.forEach(file => {
      if (this.options[file]) {
        this.copy(file, `.${file}`);
      }
    });
  }
});
