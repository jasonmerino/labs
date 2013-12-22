/**
*    Scaffold Tasks
*    @author kuakman <3dimentionar@gmail.com> | https://github.com/kuakman    
**/

module.exports = function(grunt) {
    'use strict';
    
    var fs = require('fs'),
        path = require('path');
    
    // Task configuration
    grunt.initConfig({
        scaffold: {
            help: grunt.file.read('application/scaffold/help.txt'),
            templates: 'application/scaffold/templates',
            layers: ['model', 'controller', 'service', 'view'],
            options: {
                app: 'application/<%= layer %>',
                js: 'public/js/application/<%= layer %>',
                test: 'test/<%= layer %>'    
            }
        }
    });
    
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
    
    function getExtension(l, op) {
        return (l == 'view' && op == 'app') ? '.hbs' : '.js';
    }
    
    function buildTplPath(l, op) {
        var tplPath = grunt.config.get('scaffold.templates') + '/';
        if(op == 'app') {
            tplPath += ('application/' + l + '.tpl');
        } else if(op == 'js') {
            tplPath += ('js/' + l + '.tpl');
        } else if(op == 'test') {
            tplPath += (op + '.tpl');
        }
        return tplPath;
    }
    
    /**
    *    Add Layer
    **/
    function add(l, n, op) {
        var destOpt = 'scaffold.options.' + op,
            dest = grunt.template.process(grunt.config.get(destOpt), { layer: l }),
            file = (dest + l + '/' + n + '_' + l + getExtension(l, op)),
            tpl = buildTplPath(l, op); 
        if(!grunt.file.exists(tpl)) return false;
        grunt.file.copy(tpl, file);
        grunt.log.ok('Generated: ' + tpl, ' -> ', file);
        return true;
    }
    
    /**
    *    Remove Layer
    **/
    function remove(l, n, op) {
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
    grunt.registerTask('scaffold:create', 'Creates a Template Layer', function(name) {
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
    grunt.registerTask('scaffold:remove', 'Removes a Template Layer', function(name) {
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