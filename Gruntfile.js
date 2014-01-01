/**
*    Grunt Configuration File
*    @author kuakman | <3dimentionar@gmail.com>
*    Notes:
*    To Fix:
*    1) Live Reload: Handlebars templates (*.hbs) are pre-compilated when node starts.
*    So, if a developers adds a new template while node is running, they are forced to restart node (or re-run grunt:run)
*    to make that new template available.
*    Research to see what's possible...
**/
module.exports = function(grunt) {
    
    var colors = require('colors'),
        env = require('./config/env'),
        _ = grunt.util._,
        np = null;
    
	// Project configuration.
	grunt.initConfig({
        app: {
            path: __dirname,
            appfolder: 'application',
			jsfolder: 'public/js',
			testfolder: 'test'
        },
		pkg: grunt.file.readJSON('package.json'),
        scaffold: {
            help: grunt.file.read('lib/scaffold/help.txt'),
            tplsPath: 'lib/scaffold/templates',
            layers: ['model', 'controller', 'service', 'view'],
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
                    src: ['**/*.scss'],
                    dest: 'public/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/* <%= pkg.name %> | <%= grunt.template.today("mm-dd-yyyy") %> */'
                },
                files: {
                    'public/css/<%= pkg.name %>-<%= pkg.version %>.min.css': ['public/css/**/*.css', 'public/css/!*.min.css']
                }
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
                tasks: ['sass', 'cssmin:add_banner', 'requirejs']
            }
        },
        watch: {
            css: {
                files: ['application/sass/**/*.scss'],
                tasks: ['sass'],
                options: { livereload: 4000 } // Start a live reload server on the default port 35729
            },
            views: {
                files: ['application/view/**/*.hbs'],
                tasks: ['reload'],
                options: { livereload: 4000 }
            },
            js: {
               files: ['public/js/**/*.js'],
               tasks: ['reload'],
               options: { livereload: 4000 }
            }
        },
        run: {
            options: {
                appfile: 'server.js'
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
    
    // Reload Task (This task doen't do anything because the task watch doesn't allow to pass a empty array).
    grunt.registerTask('reload', 'Triggers Watch Reload', function() {
        grunt.log.writeln('Reloading Connection Instances...'.magenta);
    });
    
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
            if(np) nodeprocess.kill();
            np = grunt.util.spawn({ cmd: 'node', args: args, opts: { stdio: 'inherit' } });
            grunt.log.writeln('Completed Application Run.'.cyan);
        }, this));
        
        grunt.log.writeln('Executing Application Run -> '.yellow);
        grunt.task.run('test');
    });
    
    /** Listen Grunt Quit Signal (ctrl + c) -> Force to Kill Node Process spawn by Grunt **/
    process.on('SIGINT', _.bind(function() {
        console.log('\n Grunt Terminated.');
        if(np) { np.kill('SIGKILL'); process.exit(0); }
    }, this));
    
    // Default task(s).
	grunt.registerTask('default', ['run']);
};