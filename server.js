var env = require('./config/env'),
    fs = require('fs'),
    path = require('path'),
	util = require('util'),
	express = require('express'),
	exphbs = require('express3-handlebars').create({ extname: '.hbs' }),
	hbslayout = require('handlebars-layouts')(exphbs.handlebars),
    Labs = require('./application/util/class'),
    router = require('./application/router'),
	app = express();

/**
*	HandleBars layout ISSUE:
*	With the current implementation, we have 2 layout templates that are being injected dynamically with the following view hierarchy strategy:
*	layout.hbs -> master.hbs -> [page].hbs
*	This issue occurs when the live reload feature (watch task) is activated and the server is running in dev mode.
*	Diagnostic: layout and master hbs files are being loaded (or compiled) as handlebars partials 'only once' when the server starts.
*	After that, these ones are stored in memory by the handlebars engine. So, any changes applied to these templates in real time are not being reflected after a live reload event.
*	Possible Solution: Research to see if it's possible to execute a some sort of reload mechanism to update the compiled files with the new ones when a live reload event occurs.
**/

/**
*    Application Configure
**/
app.configure(function() {
    
    app.set('views', __dirname + '/application/view');
    app.engine('.hbs', exphbs.engine);
    app.set('view engine', '.hbs');
    
    app.use(express.compress());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.enable('strict routing');
    
    /** Process Routes **/
	router.configure({ app: app, path: path.resolve(__dirname, 'application/router'), hbslayout: hbslayout }).loadLayouts();
    
    /** Variables added into Handlerbars template engine **/
    app.locals.debug = env.debug;
    app.locals.livereload = env.livereload;
    
    /** Static Files Express Handler **/
    app.use(express.static(path.resolve(__dirname, 'public')));
    
    app.configure('development', function() {
        console.log('\nRunning on Development Environment >');
        app.use(express.logger('development'));
        app.use(express.errorHandler({ dumExceptions: true, showStack: true }));
    });
    
    app.configure('production', function() {
        console.log('\nRunning on Production Environment >');
		app.use(express.logger('production'));
        app.use(express.errorHandler());
    });
    
    app.listen(env.port, function() {
        /** Notify Dev **/
        console.log(util.format('Server listening at %s:%d ...', env.host, env.port));
    });
    
});