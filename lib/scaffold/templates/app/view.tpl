{{#extend "master"}}
    
    {{#append "header"}}
         <h2><%= cname %> | {{action}}</h2>
    {{/append}}

    {{#append "content"}}
         <p class="content"><%= cname %> | Content</p>
    {{/append}}
    
    {{#append "footer"}}
         <p class="footer"><%= cname %> | Footer</p>
    {{/append}}
    
    {{#append "JSmodule"}}
        <script type="text/javascript">
            function initializer () {
                /** RequireJS MVC **/
                require(['model/<%= name %>/<%= name %>_model', 'view/<%= name %>/<%= name %>_view', 'controller/<%= name %>/<%= name %>_controller', 'service/<%= name %>/<%= name %>_service'], function(M, V, C, S) {
                    // TODO: Validation
					console.log(M,V,C,S);
                    var module = V.run({
                        model: new M(),
                        controller: new C({ service: new S() })
                    }).render();
                });
            };
        </script>
    {{/append}}
    
{{/extend}}