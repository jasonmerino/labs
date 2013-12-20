module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
		}
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// Default task(s).
	grunt.registerTask('default', ['requirejs']);
};