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
    },
	
	callback: function() {
		console.log('callback args: ', arguments);
	}

});

/**
*	PageView initializer
*   FIXME: Still need to figure out JS strategy...
**/
require(app.deps, function(M, V, C, S) { var module = V.run({ model: new M(), controller: new C({ service: new S() }) }).render(); });

/**
*    Decide if we use Global Error Handling
**/
/** requirejs.onError = function(err) { console.log("RequireTypeError: ", err); }; **/