var env = require('./config/env'),
    fs = require('fs'),
    path = require('path'),
	util = require('util'),
	express = require('express'),
    handlebars = require('handlebars'),
	exphbs = require('express3-handlebars'),
    Labs = require('./application/util/class'),
    router = require('./application/router'),
	app = express();

/**
*    Application Configure
*
*    1) Run Unit Tests
*    2) Build Process
*    3) Initialize Http Server
**/
app.configure(function() {
    
    app.set('views', __dirname + '/application/view');
    app.engine('.hbs', exphbs({ extname: '.hbs', handlebars: handlebars }));
    app.set('view engine', '.hbs');
   
    // HandleBars Layouts
    // ENHACEMENT: Move this to a different Location
    require('handlebars-layouts')(handlebars);
    handlebars.registerPartial('master', fs.readFileSync('application/view/master.hbs', 'utf8'));
    handlebars.registerPartial('layout', fs.readFileSync('application/view/layout.hbs', 'utf8'));
    
    app.use(express.compress());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.enable('strict routing');
    
    /** Process Routes **/
    router.configure({ app: app, path: path.resolve(__dirname, 'application/router')});
    
    /** Libraries added by default into Handlerbars template engine **/
    app.locals.debug = env.debug;
    app.locals._ = require('underscore');
    app.locals._s = require('underscore.string');

    app.use(express.static(path.resolve(__dirname, 'public')));
    
    app.configure('development', function() {
        console.log('Running on Development Environment...');
        app.use(express.logger('dev'));
        app.use(express.errorHandler({ dumExceptions: true, showStack: true }));
    });
    
    app.configure('production', function() {
        console.log('Running on Production Environment...');
        app.use(express.errorHandler());
    });
    
    app.listen(env.port, function() {
        /** Extra Features **/
        if(env.liveedit) {} // LiveEdit.launch(app);
        
        /** Notify Dev **/
        console.log(util.format('Server listening at %s:%d ...', env.host, env.port));
    });
    
});