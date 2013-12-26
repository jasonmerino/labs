/**
*    Build Task Process
*    @author Patricio Ferreira | <3dimentionar@gmail.com>
**/

module.exports = function(grunt) {
    'use strict';
    
    var fs = require('fs'),
        path = require('path'),
        _ = grunt.util._;
    
    var env = require('../../config/env'),
        cfg = grunt.config.get('build.options');
    
    
    grunt.registerTask('build', 'Build Labs Project', function() {
        grunt.log.writeln('    Executing Build -> '.yellow);
        var done = this.async();
        var options = this.options();
        if(options.tasks && _.isArray(options.tasks)) {
            // Removes cssmin and requirejs compilation if it's in debug mode.
            if(env.debug) options.tasks = _.reject(options.tasks, function(t) { return (t == 'cssmin' || t == 'requirejs'); });
            grunt.util.async.forEachSeries(options.tasks, _.bind(function(task, next) {
                grunt.log.writeln(('        Executing ' + task + ' Compilation -> ').yellow);
                // add opts: { stdio: 'inherit' } to output debug info about the tasks involved in the build process.
                grunt.util.spawn({ grunt: true, args: [task] }, _.bind(function(error, result, code) {
                    if(error) {
                        grunt.fail.fatal(error, code);
                        done(false);
                    } else {
                        grunt.log.writeln(('        Completed ' + task + ' Compilation.').cyan);   
                        next();
                    }
                }, this));
            }, this), function() {
                grunt.log.writeln('    Completed Build -> '.cyan);
                done();
                grunt.event.emit('build:success');
            });
        }
    });
    
};