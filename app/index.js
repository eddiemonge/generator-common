'use strict';

var yeoman = require('yeoman-generator');
var join = require('path').join;
var files = [
  'editorconfig',
  'gitattributes',
  'gitignore',
  'jshintrc',
  'test-jshintrc'
];

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    files.forEach(function (file) {
      var desc = 'Create .' + file + ' file';
      if (file === 'test-jshintrc') {
        desc = 'Create test/.jshintrc file';
      }
      this.option(file, {
        type: Boolean,
        desc: desc,
        defaults: true
      });
    }, this);
  },

  sayHi: function () {
    // Have Yeoman greet the user.
    if (!this.options['skip-messages']) {
      this.log(require('yosay')('Welcome to the Yeoman Common generator!'));
      this.log('Copying requested files\n');
    }
  },

  save: function () {
    var options = {};
    files.forEach(function (file) {
      options[file] = this.options[file];
    }, this);

    this.config.set(options);
  },

  writeFiles: function () {
    files.forEach(function (file) {
      if (this.options[file]) {
        this.copy(
          file,
          file === 'test-jshintrc' ? join('test/.jshintrc') : '.' + file
        );
      }
    }, this);
  }
});
