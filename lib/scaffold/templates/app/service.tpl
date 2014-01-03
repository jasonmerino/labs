/**
*    <%= cname %>Service Class
*    @namespace {<%= namespace %>}
*    @author <%= authorName %> <<%=authorEmail %>>
*    @desc <Description>
**/
var Labs = require('../../util/class'),
    _ = require('underscore');

/**
*    @class <%= cname %>Service
*    @classdesc <ClassDescription>
**/
var <%= cname %>Service = Labs.Service.extend({
    
    /**
    *    @constructor
    **/
    initialize: function() {
        <%= cname %>Service.__super__.initialize.apply(this, arguments);
        return this;
    }

}, {

    NAME: '<%= cname %>Service'
    
});

module.exports = <%= cname %>Service;