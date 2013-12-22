/**
*    <%= name %>Service Class
*    @namespace {<%= namespace %>}
*    @author <%= authorName %> <<%=authorEmail %>>
*    @desc <Description>
**/

/**
*    @class <%= cname %>
*    @classdesc <ClassDescription>
**/
var <%= cname %>Service = Labs.Model.extend({
    
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