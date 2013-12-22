{{#extend "master"}}
    
    {{#append "extraCss"}}
         <link href="css/<%= name %>/<%= name %>.css" rel="stylesheet" type="text/css" />
    {{/append}}
    
    {{#append "header"}}
         <h2><%= cname %> | {{action}}</h2>
    {{/append}}

    {{#append "content"}}
         <p class="content"><%= cname %> | Content</p>
    {{/append}}
    
    {{#append "footer"}}
         <p class="footer"><%= cname %> | Footer</p>
    {{/append}}
    
{{/extend}}