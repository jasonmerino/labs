/**
*    <%= cname %>View Module
*    @namespace {<%= namespace %>}
*    @author <%= authorName %> <<%=authorEmail %>>
*    @dependencies <ListOfDependencies>
*    @desc <Description>
**/
define([], function() {
    
    /**
    *    @class <%= cname %>View
    *    @classdesc <ClassDescription>
    **/
    var <%= cname %>View = Backbone.View.extend({
        
        /**
        *    @constructor
        **/
        initialize: function() {
            <%= cname %>View.__super__.initialize.apply(this, arguments);
            return this;
        }
    
    }, {
        
        /**
        *    Class Name
        *    @static
        *    @var {String} NAME
        **/
        NAME: '<%= cname %>View',
        
        /**
        *    Event Types
        *    @static
        *    @var {Object} EVENTS
        **/
        EVENTS: { },
        
        /**
        *    Run
        *    @static
        *    @method run
        *    @param opts {Object}
        *    @desc Static View initializer
        **/
        run: function(opts) {
            return new <%= cnameView %>(opts);
        }
        
    });
    
    return <%= cname %>View;
    
});