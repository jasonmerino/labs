/**
*    <%= cname %> Module
*    @namespace {<%= namespace %>}
*    @author <%= authorName %> <<%=authorEmail %>>
*    @dependencies <ListOfDependencies>
*    @desc <Description>
**/
define([], function() {
    
    /**
    *    @class <%= cname %>Controller
    *    @classdesc <ClassDescription>
    **/
    var <%= cname %>Controller = Backbone.Router.extend({
        
        /**
        *    Routes
        *    @var {Object} routes
        **/
        routes: { },
        
        /**
        *    @constructor
        **/
        initialize: function() {
            <%= cname %>Controller.__super__.initialize.apply(this, arguments);
            return this;
        }
    
    }, {
        
        /**
        *    Class Name
        *    @static
        *    @var {String} NAME
        **/
        NAME: '<%= cname %>Controller',
        
        /**
        *    Event Types
        *    @static
        *    @var {Object} EVENTS
        **/
        EVENTS: { }
        
    });
    
    return <%= cname %>Controller;
    
});