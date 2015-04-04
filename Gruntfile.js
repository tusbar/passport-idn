'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        jscs: {
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'tasks/**/*.js',
                        'test/*.js',
                        'test/fixtures/*/*.js'
                    ]
                }
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            all: {
                files: {
                    src: [
                        'Gruntfile.js',
                        'tasks/**/*.js',
                        'test/*.js',
                        'test/fixtures/*/*.js'
                    ]
                }
            }
        },

        // ## //

        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'test/bootstrap/node'
            },
            tests: [
                'test/*.test.js'
            ]
        }
    });

    grunt.registerTask('test', [
        'jscs:all',
        'jshint:all',
        'mochaTest'
    ]);

    // Alias default task to test
    grunt.registerTask('default', [
        'test'
    ]);
};
