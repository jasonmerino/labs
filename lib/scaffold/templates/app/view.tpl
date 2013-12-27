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
            $(document).ready(function() {
                /** RequireJS MVC **/
                require(['model/<%= name %>_model', 'view/<%= name %>view', 'controller/<%= name %>_controller', 'service/<%= name %>_service'], function(M, V, C, S) {
                    // TODO: Validation
                    var module = V.run({
                        model: new M(),
                        controller: new C({ service: new S() })
                    }).render();
                });
            });
        </script>
    {{/append}}
    
{{/extend}}