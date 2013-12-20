/**
*    Application RequireJS Config
*    @author: kuakman | https://github.com/kuakman
**/
require.config({

    paths: {
        lib: '../../libraries',
        /** Controllers **/
        controller: 'application/controller',
        /** Models **/
        model: 'application/model',
        /** Services **/
        service: 'application/service',
        /** Views **/
        view: 'application/view'
    },

    shim: {
        /** Minimum Third-Party Libraries use for the app **/
        'lib/backbone/backbone': ['lib/underscore/underscore'],
        'lib/underscore/underscore': ['lib/jquery/jquery'],
        'lib/jquery/jquery': []
    }

});

/**
*    Application Module
*    @author kuakman | https://github.com/kuakman
**/
require(['controller/controller', 'view/view'], function(Controller, View) {

    // Test
    console.log('Testing Modules...');
    console.log('Controller Constructor: ', Controller);
    console.log('View Constructor: ', View);

});