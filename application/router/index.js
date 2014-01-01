/**
*    Router Module
*    @author kuakman | <3dimentionar@gmail.com> | https://github.com/kuakman
**/
var fs = require('fs'),
    path = require('path'),
	Labs = require('../util/class'),
    Directory = require('../util/directory'),
    _ = require('underscore'),
    _s = require('underscore.string');

/**
*    @class Router
*    @classdesc Define a base class to process URL routes.
*    @author kuakman | <3dimentionar@gmail.com> | https://github.com/kuakman
**/
var Router = Labs.Service.extend({
    
    /**
    *    initialize
    *    @public
    *    @method initialize
    *    @desc TODO
    **/
    initialize: function(opts) {
        if(!opts.app || !opts.path) throw new Error('Router Class requires an app (express) and path in order to work.');
		this._loadHelpers();
        this._loadRoutes();
        this._loadServices();
        return this;
    },
	
	/**
	*	Load Helpers defined in the current router.
	*	@private
	*	@method _loadHelpers
	*    @desc TODO
	**/
	_loadHelpers: function() {
		// TODO: Research how we implement handlebar helpers and injected into the service/controllers
	},
	
    /**
    *    Load Routers
    *    @private
    *    @method _loadRoutes
    *    @desc TODO
    **/
    _loadRoutes: function() {
		console.log('\n');
        if(this.routes) {
            console.log(('-> Routes for [' + this.viewPath + ']'));
            _.each(this.routes, function(r) {
                if(this[r.method]) {
                    console.log(('    ' + r.url + ' -> ' + r.verb));
                    var deps = _.compact(_.map(r.depends, function(m) { 
                        if(_.isFunction(m)) return m;
                        return _.bind(this[m], this);
                    }, this));
                    this.get('app')[r.verb](r.url, deps, _.bind(this[r.method], this));
                }
            }, this);
        }
        return this;
    },
    
    /**
    *    Load Services into Routers
    *    @private
    *    @method _loadServices
    *    @desc TODO
    **/
    _loadServices: function() {
		if(this.services && _.isArray(this.services)) {
			_.each(this.services, function(s) {
				try {
					var ServiceClazz = require('../service/' + s);
					if(serviceClazz) this[s] = new ServiceClazz();
				} catch(ex) {
					console.log('Service: ' + s + ' not found.');
				}
			}, this);
		}
    },
    
    /**
    *    Render View through Handlebars.
    *    @public
    *    @method render
    *    @desc TODO
    **/
    render: function(req, res, opts) {
        opts || (opts = {});
        
        if(!opts.action) throw new Error('\'action\' parameter is required in order to render the view properly.');
        if(!opts.model) opts.model = {};
        
		// Reload 'Layouts' if in development mode as partials (This is quite expensive operation for production environments)
		if(this.get('env').debug) Router.loadLayouts();
		
        var params = { action: opts.action, title: _s.capitalize(opts.action), path: this.viewPath, model: opts.model };
        res.render(this.viewPath + '/' + opts.action, params);
    }
    
}, {
   
    /**
    *    Routes Config Initializer
    *    @static
    *    @method configure
    *    @param opts {Object}
    **/
    configure: function(opts) {
		if(opts.layout) this.layout = opts.layout;
        var files = Directory.walk(opts.path);
        if(files) {
            _.each(files, function(f) {
                if(f.indexOf('.js') != -1) {
                    var rFile = _s.strLeft(f, '.');
                    if(rFile != 'index') {
                        var RouteClass = new require(rFile);
                        new RouteClass(opts);
                    }
                }
            }, this);  
        }
		return this;
    },
	
	/**
    *    Load Layouts
    *    @static
    *    @method loadLayouts
    **/
	loadLayouts: function() {
		if(this.layout) {
			this.layout.registerPartial('master', fs.readFileSync('application/view/layouts/master.hbs', 'utf8'));
			this.layout.registerPartial('layout', fs.readFileSync('application/view/layouts/layout.hbs', 'utf8'));	
		}
	}
    
});

module.exports = Router;