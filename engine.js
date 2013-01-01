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
        }
    };
    // Define a engine filter
    Engine.filter = new Filter();
}).call(self);

/*Template.variable = function (context, data) {
    var v = function () {
        var self = this,
            c = context,
            d = data,
            out = '';

        // cache representation
        self.repr = c;
        // varible represetation of sub
        self.at = '@';
        // find ocurrences in the context
        self.ocurr = function (context, key) {
            var c = 0,
                last = 0;

            while ( true ) {
                if ( context.indexOf(key, last) > -1 ) {
                    c += 1;
                    last = context.indexOf(key, last) + 1;
                } else {
                    break;    
                } 
            }

            return c;
        };

        if ( d ) {
            for ( var key in d ) {
                var r = self.at + key,
                    n = self.ocurr(c, r);

                for ( var i = 0; i < n; i++ )
                    c = c.replace(r, d[key]);
            } 

            self.out = c;
        } else {
            self.out = out;    
        }
    }; 

    return new v();
};

Template.context = function (context, data) {
    var ctx = function () {
        var self = this,
            c = context,
            d = data,
            out = '';

        // cache pure representation
        self.repr = c;
        // interpolation match
        self.itrp = ['{{', '}}'];
        // match ocurrences
        self.extractCtx = function (context) {
            var out = '',
                s = context.indexOf(self.itrp[0]) + self.itrp[0].length,
                e = context.indexOf(self.itrp[1]);

            if ( s > -1 && e > -1 ) {
                out = context.slice(s, e);
            }

            return out;
        };
        // replace context in cache procing output
        self.replaceCtx = function (context, replacement) {
            var out = '',
                s = context.indexOf(self.itrp[0]),
                e = context.indexOf(self.itrp[1]) + self.itrp[1].length;

            out = context.replace(
                context.slice(s, e),
                replacement
            );

            return out;
        };
        // ctx number
        self.nctx = (function () {
            var c = 0,
                s = context.indexOf(self.itrp[0]),
                e = context.indexOf(self.itrp[1]);

            while (true) {
                if ( s > -1 && e > -1 ) {
                    c += 1;
                    s = context.indexOf(self.itrp[0], 
                                        s + self.itrp[0].length);
                    e = context.indexOf(self.itrp[1],
                                        e + self.itrp[1].length);
                } else {
                    break;    
                }    
            }

            return c;
        } ());
        // change context
        self.applyContext = function (context, data) {
            var c = self.extractCtx(context),
                d = data,
                ctx = Template.variable(c, d).out;

            c = self.replaceCtx(context, ctx);

            return c;
        };

        if ( c ) {
            out = c;

            for ( var i = 0; i < self.nctx; i++ ) {
                out = self.applyContext(out, d);    
            }
        }

        self.out = out;
    };

    return new ctx();
};

Template.process = function (c, d) {
    var out = Template.context(c, d).out;

    return out;
};

Template.buffer = function (c, d) {
    var buffer = require('buffer');    

    return new Buffer( Template.process(c, d), 'utf-8');
};*/
