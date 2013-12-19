var express = require('express'),
	exphbs  = require('express3-handlebars'),
	getTemplates = require('./getTemplates'),
    path = require('path'),
	app = express();

/**
 * Setup Handlebars templating
 */
app.set('views', __dirname + '/examples/');
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static(path.resolve(__dirname + '/examples/getting-started/', 'public')));

/**
 * Setup routes
 */
getTemplates(function(templates) {

	/**
	 * Run through all templates and register routes
	 */
	templates.forEach(function(template) {
		app.get(template.route, function(req, res) {
			res.render(template.path);
		});
	});

	/**
	 * Have server listen to port
	 */
	app.listen(8080);

	/**
	 * Notify dev
	 */
	console.log('Server listening at localhost:8080...');
});
