var fs = require('fs'),
	examplesDir = './examples';

/**
 * Walks the given directory and returns all the files within it
 * @param  {String}   dir  The directory to walk
 * @param  {Function} done Callback
 */
function walk(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function(file) {
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, res) {
						results = results.concat(res);
						if (!--pending) done(null, results);
					});
				} else {
					results.push(file);
					if (!--pending) done(null, results);
				}
			});
		});
	});
}

/**
 * Takes the walk of the file system and extracts out the handlebars templates
 * @param  {Array} files All files from the given directory
 * @return {Array|null}  All template files
 */
function extractTemplateFiles(files) {
	if (typeof files === 'object') {
		var templates = [];
		files.forEach(function(path) {
			if (typeof path === 'string' && path.indexOf('.hbs') > -1) {
				templates.push({
					route: path.replace('./examples', '').replace('.hbs', ''),
					path: path.replace('./examples/', '')
				});
			}
		});
		return templates;
	}
	return null;
}

/**
 * Gets all the templates within the examples directory
 * @param  {Function} fn Callback
 */
var getAllTemplates = function(fn) {
	walk(examplesDir, function(err, files) {
		if (err !== null) {
			return err;
		}
		if (typeof fn === 'function') {
			fn(extractTemplateFiles(files));
		}
	});
};

module.exports = getAllTemplates;
