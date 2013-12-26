/**
*    Grunt Configuration File
*    @author {Name} | {<email>}
**/
module.exports = function(grunt) {
    
    var colors = require('colors'),
        env = require('./config/env'),
        _ = grunt.util._,
        nodeprocess = null;
    
	// Project configuration.
	grunt.initConfig({
        apppath: __dirname,
		pkg: grunt.file.readJSON('package.json'),
        scaffold: {
            help: grunt.file.read('lib/scaffold/help.txt'),
            templates: 'lib/scaffold/templates',
            layers: ['model', 'controller', 'service', 'view'],
            options: {
                app: 'application/<%= layer %>',
                js: 'public/js/application/<%= layer %>',
                test: 'test/<%= layer %>'
            },
            author: {
                name: 'kuakman',
                email: '3dimentionar@gmail.com'
            }
        },
        sass: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: 'application/sass',
                        src: ['*.scss'],
                        dest: 'public/css',
                        ext: '.css'
                    }]
                }
            },
            cssmin: {
                add_banner: {
                    options: {
                        banner: '/* <%= pkg.name %> | <%= grunt.template.today("mm-dd-yyyy") %> */'
                    }  
                },
                minify: {
                    expand: true,
                    cwd: 'public/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/css/',
                    ext: '.min.css'
                }  
            },
            requirejs: {
                compile: {
                    options: {
                        baseUrl: 'public/js',
                        mainConfigFile: 'public/js/app.js',
                        name: 'app',
                        out: 'public/js/<%= pkg.name %>-<%= pkg.version %>.js',
                        optimize: 'none',
                        done: function(done, output) { }
                    }
                }
            },
        test: {
            options: {
                path: 'test',
                reporter: 'spec', // Available options 'spec', 'dot', 'progress', 'landing', 'list', 'min' and more...
                coveragePath: 'public/coverage',
                coverageExcludeFiles: ['util/class.js', 'util/directory.js']
            }
        },
        build: {
            options: {
                tasks: ['sass', 'cssmin', 'requirejs']
            }
        },
        watch: {
            css: {
                files: ['application/sass/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true, // Start a live reload server on the default port 35729
                }
            }
        },
        run: {
            options: {
                appfile: 'serverv2.js'
            }
        }
	});
    
    // Custom Tasks
    grunt.loadTasks('lib/scaffold');
    grunt.loadTasks('lib/unittest');
    grunt.loadTasks('lib/build');
    
	// Load plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
            
    // Run Task
    grunt.registerTask('run', 'Run Server', function() {
        var cfg = this.options();
        
        // Unit Test done
        grunt.event.once('test:success', _.bind(function() {
            grunt.task.run('build');
            return true;
        }, this));
        
        // Build done
        grunt.event.once('build:success', _.bind(function() {
            var args = [cfg.appfile];
            if(env.debug) args.push('debug');
            if(env.livereload) grunt.task.run('watch');
            if(nodeprocess) nodeprocess.kill();
            nodeprocess = grunt.util.spawn({ cmd: 'node', args: args, opts: { stdio: 'inherit' } });
            grunt.log.writeln('Completed Application Run.'.cyan);
        }, this));
        
        grunt.log.writeln('Executing Application Run -> '.yellow);
        grunt.task.run('test');
    });
    
    // Default task(s).
	grunt.registerTask('default', ['run']);
};