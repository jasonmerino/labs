/**
*    Build Task Process
*    @author Patricio Ferreira | <3dimentionar@gmail.com>
**/

module.exports = function(grunt) {
    'use strict';
    
    var fs = require('fs'),
        path = require('path');
    
    var env = require('../../config/env'),
        cfg = grunt.config.get('build.options');
    
    grunt.registerTask('build:sass', 'Compile Sass Files', function() {
        //grunt.task.run('sass');
    });
    
    grunt.registerTask('build:cssmin', 'Minify CSS Files generated from Sass Compilation', function() {
        //grunt.task.run('cssmin');
    });
    
    grunt.registerTask('build:requirejs', 'Compile Javascript Modules using RequireJS optimizer', function() {
        //grunt.task.run('requirejs');
    });
    
    grunt.registerTask('build', 'Build Labs Project', function() {
        // TODO
    });
    
};