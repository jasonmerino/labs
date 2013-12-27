/**
*    <%= cname %>Model Class
*    @namespace {<%= namespace %>}
*    @author <%= authorName %> <<%=authorEmail %>>
*    @desc <Description>
**/
var Labs = require('../util/class'),
    _ = require('underscore');

/**
*    @class <%= cname %>Model
*    @classdesc <ClassDescription>
**/
var <%= cname %>Model = Labs.Model.extend({
    
    /**
    *    @constructor
    **/
    initialize: function() {
        <%= cname %>Model.__super__.initialize.apply(this, arguments);
        return this;
    }

}, {

    NAME: '<%= cname %>Model'
    
});

module.exports = <%= cname %>Model;