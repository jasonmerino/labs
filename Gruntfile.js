module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					baseUrl: 'public/getting-started/js',
					mainConfigFile: 'public/getting-started/js/app.js',
					name: 'app',
					out: 'public/getting-started/js/<%= pkg.name %>-<%= pkg.version %>.js',
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