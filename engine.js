var self = this; 

(function () {
    var Engine = exports;
        // Internal methods
        Engine.internal = {};

    // Filter definition
    var Filter = Engine.internal.filter = function () {};
    // Filter composition
    Filter.prototype = {
        // cache operations
        operations: [],
        // add to cache operations
        add: function addOperation ( name, fn ) {
            var self = this,
                name = name || 'anonymous',
                fn = fn || function () {};

            if ( 'string' !== typeof( name ) ) {
                throw TypeError(
                    'First parameter not is a string!'
                ); 
            } if ( 'function' !== typeof( fn ) ) {
                throw TypeError(
                    'Second parameter not is a function!'
                ); 
            } else {
                self.operations.push([ name, fn ]);
            } 

            return self;
        },
        // invoke from cache an operation
        invoke: function invokeOperation ( name ) {
            var self = this,
                name = name || 'anonymous';

            if ( 'string' !== typeof( name ) ) {
                throw TypeError(
                    'First parameter not is a string!'
                );    
            } else {
                return self.operations.map(function (o) {
                    if ( name === o[0] ) {
                        return o[1];    
                    }  
                })[0]; 
            }

            return undefined;
        },
        // call from cache an operation
        trigger: function triggerOperation ( options ) {
            var self = this,
                name = options[0] || 'anonymous';

            return self.invoke(name);
        },
    };
    // Define a engine filter
    Engine.filter = new Filter();

    // Variable definition
    var Variable = Engine.internal.variable = function () {};
    // Variable context
    Variable.prototype = {
        identifier: '@',

        ocurrences: function variableOcurrences ( context, key ) {
            var out = 0,
                last = 0;

            while ( true ) {
                if ( context.indexOf( key, last ) > -1 ) {
                    out += 1;
                    last = context.indexOf( key, last ) + 1;
                } else {
                    break;    
                } 
            }

            return out;
        },

        change: function changeVariable ( context, data ) {
            var self = this,
                _context = context || '',
                data = data || '',
                out = '';

            if ( _context && data ) {
                for ( var key in data ) {
                    var variable = self.identifier + key,
                        value = data[ key ],
                        n = self.ocurrences( _context, variable );    

                    for ( var i = 0; i < n; i++ ) {
                        _context = _context.replace(
                            variable, value
                        );
                    }
                }    

                out = _context;
            }

            return out;
        }    
    };
    // Define engine variable
    Engine.variable = new Variable();

    // Context definition
    var Context = Engine.internal.context = function () {};
    // Context in context
    Context.prototype = {
        identifier: [ '{{', '}}' ],

        extract: function extractContext ( context, braces ) {
            var self = this,
                out = '',
                begin = -1, end = -1; 

            if ( braces ) {
                begin = context.indexOf(
                    self.identifier[0]
                );

                end = context.indexOf(
                    self.identifier[1]
                ) + self.identifier[1].length;
            } if ( !braces ) {
                begin = context.indexOf(
                    self.identifier[0]
                ) + self.identifier[0].length;

                end = context.indexOf(
                    self.identifier[1]
                );  
            } if ( begin > -1 && end > -1 ) {
                out = context.slice(
                    begin, end
                );    
            }

            return out;
        },

        ocurrences: function ocurrencesContext ( context ) {
            var self = this,
                out = 0,
                begin = context.indexOf(
                    self.identifier[0]
                ),
                end = context.indexOf(
                    self.identifier[1]
                );

            while ( true ) {
                if ( begin > -1 && end > -1 ) {
                    out += 1;

                    begin = context.indexOf(
                        self.identifier[0],
                        begin + self.identifier[0].length
                    );

                    end = context.indexOf(
                        self.identifier[1],
                        end + self.identifier[1].length
                    );
                } else {
                    break;    
                }    
            }

            return out;
        },

        change: function changeTemplateContext ( context, data ) {
            var self = this,
                out = context,
                n = self.ocurrences( context );

            for ( var i = 0; i < n; i++ ) {
                var firstState = self.extract( out, true ),
                    secondState = Engine.variable.change(
                        self.extract( out ), data
                    );

                out = out.replace(
                    firstState,
                    secondState
                ); 
            }

            return out;
        }
    };
    // Context in engine
    Engine.context = new Context();
}).call(self);
