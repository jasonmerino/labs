/**
*    Home Module
*    @author kuakman | <3dimentionar@gmail.com> | https://github.com/kuakman
**/

var Router = require('../index'),
    _ = require('underscore'),
    _s = require('underscore.string');

var Home = Router.extend({
    
    viewPath: 'home',
    
    routes: [
       { url: '/', verb: 'get', method: 'home' },
       { url: '/anotherView', verb: 'get', method: 'anotherView' }
    ],
    
    //services: ['loginService'],
    
    initialize: function() {
        Home.__super__.initialize.apply(this, arguments);
        return this;
    },
    
    /**
    *    JSDocs here
    **/
    home: function(req, res) {
        //if(this.loginService.login(req.params)) {
            //this.redirect('/app');
        //} else {
            this.render(req, res, { action: 'home' });
        //}
    },
    
    /**
    *    JSDocs here
    **/
    anotherView: function() {
        this.render(req, res, { action: 'anotherView' });
    }
    
});

module.exports = Home;