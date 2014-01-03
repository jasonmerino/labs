/**
*    <%= cname %>Model Module
*    @namespace {<%= namespace %>}
*    @author <%= authorName %> <<%=authorEmail %>>
*    @dependencies <ListOfDependencies>
*    @desc <Description>
**/
define(['lib/backbone/backbone'], function() {
    
    /**
    *    @class <%= cname %>Model
    *    @classdesc <ClassDescription>
    **/
    var <%= cname %>Model = Backbone.Model.extend({
        
        /**
        *    @constructor
        **/
        initialize: function() {
            <%= cname %>Model.__super__.initialize.apply(this, arguments);
            return this;
        }
    
    }, {
        
        /**
        *    Class Name
        *    @static
        *    @var {String} NAME
        **/
        NAME: '<%= cname %>Model',
        
        /**
        *    Event Types
        *    @static
        *    @var {Object} EVENTS
        **/
        EVENTS: { }
        
    });
    
    return <%= cname %>Model;
    
});