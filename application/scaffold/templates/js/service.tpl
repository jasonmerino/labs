/**
*    <%= cname %> Module
*    @namespace {<%= namespace %>}
*    @author <%= authorName %> <<%=authorEmail %>>
*    @dependencies <ListOfDependencies>
*    @desc <Description>
**/
define([], function() {
    
    /**
    *    @class <%= cname %>Service
    *    @classdesc <ClassDescription>
    **/
    var <%= cname %>Service = Backbone.Service.extend({
        
        /**
        *    @constructor
        **/
        initialize: function() {
            <%= cname %>Service.__super__.initialize.apply(this, arguments);
            return this;
        }
    
    }, {
        
        /**
        *    Class Name
        *    @static
        *    @var {String} NAME
        **/
        NAME: '<%= cname %>Service',
        
        /**
        *    Event Types
        *    @static
        *    @var {Object} EVENTS
        **/
        EVENTS: { }
        
    });
    
    return <%= cname %>Service;
    
});