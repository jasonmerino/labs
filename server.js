var env = require('./config/env'),
	pkg = require('./package.json'),
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
	router.configure({ app: app, env: env, path: path.resolve(__dirname, 'application/router'), layout: hbslayout }).loadLayouts();
    
    /** Variables added into Handlerbars template engine **/
    app.locals.debug = env.debug;
    app.locals.livereload = env.livereload;
    
    /** Static Files Express Handler **/
    app.use(express.static(path.resolve(__dirname, 'public')));
	
	/** Application Name and Version **/
	app.locals.appname = pkg.name || 'app';
	app.locals.version = pkg.version || 'unknown';
	
    app.configure('development', function() {
        console.log('\nRunning on Development Environment >');
		/** Logging **/
        app.use(express.logger('development'));
        app.use(express.errorHandler({ dumExceptions: true, showStack: true }));
    });
    
    app.configure('production', function() {
        console.log('\nRunning on Production Environment >');
		/** Logging **/
		app.use(express.logger('production'));
        app.use(express.errorHandler());
    });
    
    app.listen(env.port, function() {
        /** Notify Dev **/
        console.log(util.format('Server listening at %s:%d ...', env.host, env.port));
    });
    
});