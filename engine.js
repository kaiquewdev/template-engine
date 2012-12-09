var Template = exports,
    s = this;

Template.variable = function (context, data) {
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
                s = c.indexOf(self.itrp[0]) + self.itrp[0].length,
                e = c.indexOf(self.itrp[1]);

            out = context.slice(s, e);

            return out;
        };
        // replace context in cache procing output
        self.replaceCtx = function (context, replacement) {
            var out = '',
                s = c.indexOf(self.itrp[0]),
                e = c.indexOf(self.itrp[1]) + self.itrp[1].length;

            out = context.replace(
                context.slice(s, e),
                replacement
            );

            return out;
        };

        out = self.extractCtx(c);
        out = Template.variable(out, d).out;
        
        self.out = self.replaceCtx(c, out);
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
};
