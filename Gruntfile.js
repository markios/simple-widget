module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'scripts',
                    mainConfigFile: './scripts/main.js',
                    name: 'main',
                    optimize: 'uglify2',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,

                    // exclude from the build, load at runtime
                    paths: {
                        'jQuery': 'empty:',
                        'Lodash': 'empty:',
                        'openbox': 'empty:',
                        'Backbone' : 'empty:'
                    },

                    out: 'scripts/main-built.js'
                }
            }
        },

        less: {
            css: {
                files: [{
                        'style/style.css': 'style/less/style.less'
                    }]
            }
        },
        cssmin: {
          minify: {
            expand: true,
            cwd: 'style/',
            src: ['style.css', '!*.min.css'],
            dest: 'style/',
            ext: '.min.css'
          }
        },
        watch: {
            files: ['style/less/*.less', 'scripts/**/*.js', 'Gruntfile.js'],
            tasks: ['less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['watch']);
    // grunt.registerTask('build', ['jshint', 'less', 'requirejs']);
    grunt.registerTask('build', ['less', 'cssmin', 'requirejs']);

};
