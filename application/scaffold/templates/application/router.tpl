/**
*    <%= cname %>Router Class
*    @namespace {<%= namespace %>}
*    @author <%= authorName %> <<%=authorEmail %>>
*    @desc <Description>
**/

/**
*    @class <%= cname %>Router
*    @classdesc <ClassDescription>
**/
var <%= cname %> = Router.extend({
    
    /**
    *    View Path
    *    @var {String} viewPath
    **/
    viewPath: '<%= name %>',
    
    /**
    *    Routes Definition
    *    @var {Object} routes 
    **/
    routes: {
        { '/<%= name %>', verb: 'get', method: '<%= name %>' }
    },
    
    /**
    *    @constructor
    **/
    initialize: function() {
        <%= cname %>.__super__.initialize.apply(this, arguments);
        return this;
    },
    
    /**
    *    <%= name %> handler
    *    @public
    *    @method <%= name %>
    *    @desc <methodDescription>
    **/
    <%= name %>: function(req, res) {
        this.render(req, res, { action: '<%= name %>' });
    }

}, {

    NAME: '<%= cname %>'
    
});

module.exports = <%= cname %>;