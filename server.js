var env = require('./config/env'),
	util = require('util'),
	express = require('express'),
	exphbs = require('express3-handlebars'),
	getTemplates = require('./getTemplates'),
	app = express();

/**
 * Setup Handlebars templating
 */
app.set('views', __dirname + '/examples/');
app.engine('.hbs', exphbs({
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

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
	app.listen(env.port);

	/**
	 * Notify dev
	 */
	console.log(util.format('Server listening at %s:%d ...', env.host, env.port));
});
