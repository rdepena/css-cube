/* jshint node: true*/
'use strict';
module.exports = function(grunt) {
  var files = {
    js: [
      'gruntfile.js',
      'public/**/*.js',
      'public/**/*.json',
      '*.json',
      '!public/bower_components/**/*.*'
    ],
    html: [
      'public/**/*.html'
    ],
    css: [
      'public/**/*.css'
    ]
  };

  grunt.initConfig({
    watch: {
      code: {
        files: files.html.concat(files.css).concat(files.js),
        tasks: ['default'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          open: true,
          base: [
            'public'
          ]
        },
        files: files.html.concat(files.css).concat(files.js)
      }
    },
    jshint: {
      jsFiles: files.js,
      options: {
        node: false
      }
    },
    jsbeautifier: {
      jsFiles: files.js,
      options: {
        js: {
          braceStyle: "collapse",
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: " ",
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: false,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0
        }
      }
    },
    connect: {
      options: {
        port: process.env.PORT || 5000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: false,
          base: [
            'public'
          ]
        }
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['jshint', 'jsbeautifier']);
  grunt.registerTask('test', ['jshint', 'jsbeautifier']);
  grunt.registerTask('serve', ['test', 'connect:livereload', 'watch']);

};
