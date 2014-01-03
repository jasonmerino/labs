/**
*	Scaffold Tasks
*	@author kuakman <3dimentionar@gmail.com> | https://github.com/kuakman
*	@desc Scaffold tools for generating template for the MVSC (Model, View, Service, Controller (Router)).
*	@version 0.1 (Beta)
**/

module.exports = function(grunt) {
    'use strict';
    
    // Dependencies
    var fs = require('fs'),
        path = require('path'),
        _ = grunt.util._,
        _s = grunt.util._.str;
    
    // Variables
    var cfg = grunt.config,
		scaff = cfg.get('scaffold'),
        globalpath = cfg.get('app.path'),
		appfolder = cfg.get('app.appfolder'),
		jsfolder = cfg.get('app.jsfolder'),
		testfolder = cfg.get('app.testfolder'),
		apppath = path.resolve(globalpath, appfolder),
		jspath = path.resolve(globalpath, (jsfolder + '/' + appfolder)),
		testpath = path.resolve(globalpath, testfolder),
		sasspath = path.resolve(apppath, './sass'),
        layers = cfg.get('scaffold.layers'),
        tplsPath = cfg.get('scaffold.tplsPath'),
		defaultTplData = {
			authorName: (scaff.author && scaff.author.name) ? scaff.author.name : 'DeveloperName',
			authorEmail: (scaff.author && scaff.author.email) ? scaff.author.email : '<DeveloperEmail>',
            appfolder: apppath
		};
    
    // Command line parameters
    var layer = grunt.option('l');
    var test = grunt.option('test');
    
    /**
    *    Validate Command-line input
    *    @param l {String} Layer choosen
    *    @param n {String} Name choosen
    **/
    function validate(l, n) {
        if(l && !_.contains(layers, l)) grunt.fail.fatal('Unsupported Layer ' + l);
        if(!n && n === '') grunt.fail.fatal('Name cannot be null or equals to \'\'');
		return (l) ? [l] : layers; // if 'l' is not specified, we assume full MVCS layers.
    }
	
	/**
	*	Apply Template
	*	@param l {String} layer
	*	@param n {String} name
	*	@param tpl {String} template Type
	*	@returns {Object}
	**/
	function template(l, n, tpl) {
		var filename = (_.contains(['test', 'sass'], tpl)) ? (tpl + '/' + tpl + '.tpl') : (tpl + '/' + l + '.tpl'),
			tplpath = path.resolve(tplsPath, filename);
		if(!fs.existsSync(tplpath)) grunt.fail.fatal('Unexistent Template for layer <' + l + '>.');
		l = (tpl === 'test' && l === 'controller') ? 'router' : l;
		return {
			name: n,
			tplfile: tplpath,
			data: templateData(l, n, tpl)
		};
	}
	
	/**
	*	Builds Template Data based on layer and Template Type.
	*	@param l {String} layer
	*	@param n {String} name
	*	@param tpl {String} template type
	*	@returns {Object}
	**/
	function templateData(l, n, tpl) {
		return _.extend({}, defaultTplData, {
			namespace: appfolder + '.' + l + '.' + n + '.' + _s.capitalize(n) + _s.capitalize(l),
            layer: l, clayer: _s.capitalize(l),
            name: n, cname: _s.capitalize(n),
		});
	}
	
    /**
    *    Parse and build data structure to operate with.
    *    @param l {String} Layer choosen
    *    @param n {String} Name choosen
    *    @param t {Boolean} Test Flag
    *    @returns {Object}
    **/
    function parse(l, n, t) {
        var data = validate(l, n);
		data = _.map(data, function(d) {
			return { layer: d,
				app: template(d, n, 'app'),
				js: template(d, n, 'js'),
				sass: (d == 'view') ? template(d, n, 'sass') : null,
				test: (t && d !== 'view') ? template(d, n, 'test') : null
			};
		}, this);
        return data;
    }
	
	/**
	*	Builds subfolder depending on the layer and the context.
	*	@param l {String} layer
	*	@param n {String} name
	*	@param cxt {String} context
	*	@returns {String}
	**/
	function buildFolderPath(l, n, cxt) {
		if(cxt === 'test') return testpath + '/' + l + '/' + n + '/';
		if(cxt === 'sass') return sasspath + '/' + n + '/';
		var fpath = ((cxt == 'app') ? apppath : jspath) + '/';
		fpath += (l === 'controller' && cxt === 'app') ? 'router/' : (l + '/'); // Layer folder special case for controllers.
		return (fpath + n + '/');
	}
	
	/**
	*	Builds the full path of the FileName only in which the template will be parsed and copy.
	*	@param l {String} layer
	*	@param n {String} name
	*	@param t {Boolean} isTest
	*	@returns {String}
	**/
    function buildTargetFile(l, n, cxt) {
		var filename = (cxt === 'app' || cxt == 'sass') ? n : (cxt === 'test') ? [n,l,'test'].join('_') : [n,l].join('_'); // Filename cases.
		if(l === 'view' && cxt === 'app') return (buildFolderPath(l, n, cxt) + filename + '.hbs'); // File Extension for handlebars.
		if(l === 'view' && cxt === 'sass') return (buildFolderPath(l, n, cxt) + filename + '.scss'); // File Extension for sass.
		return (buildFolderPath(l, n, cxt) + filename + '.js');
	}
        
    /**
	*	Perform a Layer Add
	*	@param o {Object}
	*	@return {Object}
	**/
    function add(o) {
		return { data: {
				layer: o.layer,
				appF: addFile(buildTargetFile(o.layer, o.app.name, 'app'), o.app.tplfile, o.app.data),
				jsF: addFile(buildTargetFile(o.layer, o.js.name, 'js'), o.js.tplfile, o.js.data),
				sassF: (o.sass) ? addFile(buildTargetFile(o.layer, o.sass.name, 'sass'), o.sass.tplfile, o.sass.data) : null,
				testF: (o.test) ? addFile(buildTargetFile(o.layer, o.test.name, 'test'), o.test.tplfile, o.test.data) : null
		}, op: 'Add' };
	}
        
    /**
	*	Perform a Layer Remove
	*	@param o {Object}
	**/
    function remove(o) {
		return { data: {
				layer: o.layer,
				appF: removeFile(buildFolderPath(o.layer, o.app.name, 'app'), buildTargetFile(o.layer, o.app.name, 'app')),
				jsF: removeFile(buildFolderPath(o.layer, o.js.name, 'js'), buildTargetFile(o.layer, o.js.name, 'js')),
				sassF: (o.sass) ? removeFile(buildFolderPath(o.layer, o.sass.name, 'sass'), buildTargetFile(o.layer, o.sass.name, 'sass')) : null,
				testF: (o.test) ? removeFile(buildFolderPath(o.layer, o.test.name, 'test'), buildTargetFile(o.layer, o.test.name, 'test')) : null
		}, op: 'Remove' };
	}
    
	/**
	*	Log Operations
	*	@param data {Object}
	**/
	function logOp(d) {
		var operation = d.op;
		_.each([d.data], function(d) {
			grunt.log.writeln(('Layer: ' + _s.capitalize(d.layer)).cyan);
			grunt.log.ok(operation + ': ' + d.appF);
			grunt.log.ok(operation + ': ' + d.jsF);
			if(d.sassF) grunt.log.ok(operation + ': ' + d.sassF);
			if(d.testF) grunt.log.ok(operation + ': ' + d.testF);
		}, this);
	}
	
	/**
	*	Create a File (and a subfolder if it's needed).
	*	@param f {String} file
	*	@param tplfile {String} template file
	*	@param data {String} template data
	*	@returns {String}
	**/
	function addFile(f, tplfile, data) {
		if(!f || f == '') return grunt.fail.fatal('Target File was not specified or it\'s empty.');
		if(!tplfile || tplfile == '') return grunt.fail.fatal('Template File was not specified or it\'s empty.');
		if(!data) return grunt.fail.fatal('Template Data is not defined');
		if(fs.existsSync(f)) return grunt.log.warn('File <' + f + '> already exists.');
		grunt.file.copy(tplfile, f, { process: function(contents, tpl) { return grunt.template.process(contents, { data: data }); } });
		return f;
	}
	
	/**
	*	Remove a File (and the folder if it's empty).
	*	@param folder {String} folder
	*	@param f {String} filename
	*	@returns {String}
	**/
	function removeFile(folder, f) {
		if(!folder) return grunt.fail.fatal('Folder was not specified.');
		if(!f || f == '') return grunt.fail.fatal('File was not specified or it\'s empty.');
		if(!fs.existsSync(f)) return grunt.log.warn('File <' + f + '> doens\'t exists.');
		grunt.file.delete(f);
		removeFolder(folder);
		return f;
	}
        
    /**
	*	Remove a Folder
	*	@param p {String} path
	*	@returns {Boolean}
	**/
    function removeFolder(p) {
		if(!p || p == '') return false;
		if(!fs.existsSync(p)) return false;
		if(fs.readdirSync(p).length === 0) grunt.file.delete(p); // Delete only if it's empty.
		return true;
	}
    
    /** Scaffold Tasks Definition **/
    
    // Scaffold Create Task
    grunt.registerTask('scaffold:create', 'Creates Template Layers', function(name) {
        var data = parse(layer, name, test);
		_.each(data, function(o) { logOp(add(o)); }, this);
		return true;
    });
    
    // Scaffold Remove Task
    grunt.registerTask('scaffold:remove', 'Creates Template Layers', function(name) {
        var data = parse(layer, name, test);
		_.each(data, function(o) { logOp(remove(o)); }, this);
		return true;
    });
    
    // Scaffold Help Task
    grunt.registerTask('scaffold:help', 'Creates Template Layers', function(name) {
        grunt.log.subhead(grunt.config.get('scaffold.help'));
        return true;
    });
    
};