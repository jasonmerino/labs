/**
*    Application RequireJS Config
*    @author: kuakman | https://github.com/kuakman
**/
require.config({

    paths: {
        lib: '../libraries',
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
        'lib/underscore/underscore': ['lib/bootstrap/dist/js/bootstrap'],
        'lib/bootstrap/dist/js/bootstrap': ['lib/jquery/jquery'],
        'lib/jquery/jquery': []
    }

});

/**
*    Error Handling
**/
requirejs.onError = function(err) {
    console.log("RequireTypeError: ", err.requireType);
    if (err.requireType === 'timeout') console.log('Modules: ' + err.requireModules);
};