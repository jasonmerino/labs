/**
*    Router Module
*    @author kuakman | <3dimentionar@gmail.com> | https://github.com/kuakman
**/
var fs = require('fs'),
    path = require('path'),
    Directory = require('../util/directory'),
    Labs = require('../util/class'),
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
        this._process();
        this._injectServices();
        return this;
    },
    
    /**
    *    Process Routers
    *    @private
    *    @method _process
    *    @desc TODO
    **/
    _process: function() {
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
    *    Inject Services into routes.
    *    @private
    *    @method _injectServices
    *    @desc TODO
    **/
    _injectServices: function() {
        // TODO
    },
    
    /**
    *    Render
    *    @public
    *    @method render
    *    @desc TODO
    **/
    render: function(req, res, opts) {
        opts || (opts = {});
        
        if(!opts.action) throw new Error('\'action\' parameter is required in order to render the view properly.');
        if(!opts.model) opts.model = {};
        
        var params = { action: opts.action, path: this.viewPath, model: opts.model };
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
    }
    
});

module.exports = Router;