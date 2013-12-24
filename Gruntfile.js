module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
        watch: {
            css: {
                files: ['application/sass/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true, // Start a live reload server on the default port 35729
                }
            }
        }
	});
    
    // Labs Scaffold Task
    grunt.loadTasks('lib/scaffold');
    
	// Load plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Default task(s).
	grunt.registerTask('default', ['requirejs']);
};