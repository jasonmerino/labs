/**
*    UnitTest Task Process
*    @author Patricio Ferreira | <3dimentionar@gmail.com>
**/

module.exports = function(grunt) {
    'use strict';
    
    // Dependecies
    var fs = require('fs'),
        path = require('path'),
        exec = require('child_process').exec,
        rimraf = require('rimraf'),
        directory = require('../../application/util/directory');
    
    // Variables
    var globalpath = grunt.config.get('app.path'),
        appfolder = grunt.config.get('app.appfolder'),
        env = require('../../config/env'),
        cfg = grunt.config.get('test.options'),
        testPath = path.resolve(globalpath, cfg.path),
        covpath = path.resolve(globalpath, appfolder + '-cov/'),
        covReportPath = path.resolve(globalpath, cfg.coveragePath),
        testFiles = directory.walk(testPath),
        _ = grunt.util._;
    
    grunt.registerTask('coverage:clean', 'Clean Previous Coverage Report generated', function() {
        grunt.log.writeln('        Executing JSCoverage Clean -> '.yellow);
        if(fs.existsSync(covpath)) rimraf.sync(covpath);
        if(fs.existsSync(covReportPath)) rimraf.sync(covReportPath);
        grunt.event.emit('coverage:clean:success');
        return true;
    });
    
    grunt.registerTask('coverage:create', 'Create Coverage Report', function() {
        grunt.log.writeln('        Executing JSCoverage Report -> '.yellow);
        var done = this.async();
        var exclFiles = _.map(cfg.coverageExcludeFiles, function(f) { return path.resolve(globalpath, appfolder + '/' + f); }, this).join(',');
        var jscovCmd = 'node_modules/jscoverage/bin/jscoverage --no-highlight --exclude ' + exclFiles + ' ' + globalpath + '/' + appfolder + ' ' + covpath;
        exec(jscovCmd, _.bind(function(error, stdout, stderr) { 
            if(error) grunt.fail.fatal(error);
            grunt.event.emit('coverage:create:success');
            done();
            return true;
        }, this));
    });
    
    grunt.registerTask('test:unit:reporter', 'Execute Mocha Unit Tests Output Reporter', function() {
        grunt.log.writeln(('        Executing Mocha Report (' + cfg.reporter + ') -> ').yellow);
        if(testFiles.length > 0) {
            var done = this.async();
            var mochaCmd = 'export UT=1; node_modules/mocha/bin/mocha -R ' + cfg.reporter + ' -c -t 5000 -u bdd ' + testFiles.join(' ');
            exec(mochaCmd, _.bind(function(error, stdout, stderr) { 
                if(error) grunt.fail.fatal(error);
                grunt.log.writeln(stdout);
                grunt.event.emit('test:unit:reporter:success');
                done();
            }, this));
        } else {
            grunt.log.ok('        Mocha Report Warning: No Unit Test found.' .magenta);
        }
        grunt.event.emit('test:unit:reporter:success');
        return true;
    });
    
    grunt.registerTask('test:unit:html', 'Execute Mocha Unit tests (Integration with JSCoverage)', function() {
        if(testFiles.length > 0) {
            var done = this.async();
			if(!fs.existsSync(covReportPath)) grunt.file.mkdir(covReportPath);
            var mochaCmd = 'export UT=1; node_modules/mocha/bin/mocha -R html-cov -c -t 5000 -u bdd ' + testFiles.join(' ') + " --coverage > " + covReportPath + '/coverage.html';
            exec(mochaCmd, _.bind(function(error, stdout, stderr) {
                if(error) grunt.fail.fatal(error);
                grunt.event.emit('test:unit:html:success');
                done();
            }, this));
        } else {
            grunt.event.emit('test:unit:html:success');
        }
        return true;
    });
    
    // Unit test Task
    grunt.registerTask('test', 'Execut Complete Unit Testing Phase', function() {
        grunt.log.writeln('    Executing Unit Testing -> '.yellow);
        grunt.event.once('coverage:clean:success', _.bind(function() { 
            grunt.log.writeln('        Completed JSCoverage Clean.'.cyan);
            grunt.task.run('coverage:create');
        }, this));
        grunt.event.once('coverage:create:success', _.bind(function() {
            grunt.log.writeln('        Completed JSCoverage Report.'.cyan)
            grunt.task.run('test:unit:reporter');
        }, this));
        grunt.event.once('test:unit:reporter:success', _.bind(function() {
            grunt.task.run('test:unit:html'); // Silent
        }, this));
        grunt.event.once('test:unit:html:success', _.bind(function() { 
            grunt.log.writeln(('        Completed Mocha Report (' + cfg.reporter + ').\n').cyan);
            grunt.log.writeln('    Completed Unit Testing.'.cyan);
            grunt.event.emit('test:success');
        }, this));
        grunt.task.run('coverage:clean');
    });
    
};