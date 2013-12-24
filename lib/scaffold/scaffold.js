/**
*    Scaffold Tasks
*    @author kuakman <3dimentionar@gmail.com> | https://github.com/kuakman
*    @desc Scaffold tools for generating template for the MVSC (Model, View, Service, Controller (Router)).
*    NOTE: Need to improve the processing logic here. Focused first on 'results', no writting 'nice code'.
**/

module.exports = function(grunt) {
    'use strict';
    
    var fs = require('fs'),
        path = require('path'),
        _ = grunt.util._;
    _.str = grunt.util._.str;
    
    /**
    * Validate if Layer can be created.
    **/
    function validate(l) { 
        var layers = grunt.config.get('scaffold.layers'),
            exist = false;
        if(l != 'full') {
            for(var o in layers) {
                exist = (l == layers[o]);
                if(exist) break;
            }
        } else {
            exist = true;    
        }
        return exist;
    }
    
    /**
    *    Get File extension
    **/
    function getExtension(l, op) {
        return (l == 'view' && op == 'app') ? '.hbs' : '.js';
    }
    
    /**
    *    Build Template Path
    **/
    function buildTplPath(l, op) {
        var tplPath = grunt.config.get('scaffold.templates') + '/';
        if(op == 'app') {
            tplPath += ('lib/' + l + '.tpl');
        } else if(op == 'js') {
            tplPath += ('js/' + l + '.tpl');
        } else if(op == 'test') {
            tplPath += (op + '.tpl');
        }
        return tplPath;
    }
    
    function applyTemplate(contents, layer, name) {
        var data = {
            authorName: grunt.config.get('scaffold.author').name,
            authorEmail: grunt.config.get('scaffold.author').email,
            namespace: 'application.' + layer + '.' + grunt.util._.str.capitalize(name) + grunt.util._.str.capitalize(layer),
            name: name,
            cname: grunt.util._.str.capitalize(name)
        };
        return grunt.template.process(contents, { data: data });
    }
    
    /**
    *    Add Layer
    **/
    function add(l, n, op) {
        if(op == 'app' && l == 'controller') l = 'router';
        var destOpt = 'scaffold.options.' + op,
            dest = grunt.template.process(grunt.config.get(destOpt), { layer: l }),
            file = (dest + l + '/' + n + '_' + l + getExtension(l, op)),
            tpl = buildTplPath(l, op);
        if(!grunt.file.exists(tpl)) return false;
        grunt.file.copy(tpl, file, { process: function(contents, tplFile) { return applyTemplate(contents, l, n); } });
        grunt.log.ok('Generated: ' + tpl, ' -> ', file);
        return true;
    }
    
    /**
    *    Remove Layer
    **/
    function remove(l, n, op) {
        if(op == 'app' && l == 'controller') l = 'router';
        var destOpt = ('scaffold.options.' + op),
            dest = grunt.template.process(grunt.config.get(destOpt), { layer: l }),
            file = (dest + l + '/' + n + '_' + l + getExtension());
        if(grunt.file.exists(file)) {
            grunt.file.delete(file);
            grunt.log.ok('Removed: ', file);
        } else {
            grunt.log.warn('File doesn\'t exists: ', file, ' -> ignoring...'); 
        }
        var dir = path.resolve(dest + l);
        if(fs.existsSync(dir)) {
            var files = fs.readdirSync(dir);
            if(files && files.length == 0) grunt.file.delete(dir); // remove layer directory if it's empty.
        }
        return true;
    }
    
    // Command line parameters
    var layer = grunt.option('l'); // Layer Parameter
    var iTest = grunt.option('test'); // Include Test
    
    /**
    *    Scaffold Create Layer
    **/
    grunt.registerTask('scaffold:create', 'Creates Template Layers', function(name) {
        if(!layer || !validate(layer)) return false;
        if(!name || name == '') return false;
        if(iTest && iTest == 'true') iTest = true;
        var result = true;
        if(layer == 'full') {
            var layers = grunt.config.get('scaffold.layers');
            for(var l in layers) {
                grunt.log.subhead('Layer: ' + layers[l]);
                result = add(layers[l], name, 'app');
                result = add(layers[l], name, 'js');
                if(iTest) result = add(layers[l], name, 'test');
            }
        } else {
            grunt.log.subhead('Layer: ' + layer);
            result = add(layer, name, 'app');
            result = add(layer, name, 'js');
            if(iTest) result = add(layer, name, 'test');
        }
        return result;
    });
    
    /**
    *    Scaffold Remove Layer
    **/
    grunt.registerTask('scaffold:remove', 'Removes Template Layers', function(name) {
        if(!layer || !validate(layer)) return false;
        if(!name || name == '') return false;
        if(iTest && iTest == 'true') iTest = true;
        var result = true;
        if(layer == 'full') {
            var layers = grunt.config.get('scaffold.layers');
            for(var l in layers) {
                grunt.log.subhead('Layer: ' + layers[l]);
                result = remove(layers[l], name, 'app');
                result = remove(layers[l], name, 'js');
                if(iTest) result = remove(layers[l], name, 'test');
            }
        } else {
           grunt.log.subhead('Layer: ' + layer);
           result = remove(layer, name, 'app');
           result = remove(layer, name, 'js');
           if(iTest) result = remove(layer, name, 'test');
        }
        return result;
    });

    /**
    *    Scaffold Help
    **/
    grunt.registerTask('scaffold:help', 'Show Help Topics for this tools', function() {
        grunt.log.subhead(grunt.config.get('scaffold.help'));
    });
};