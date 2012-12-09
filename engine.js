var Template = exports,
    s = this;

Template.variable = function (context, data) {
    var v = function () {
        var self = this,
            c = context,
            d = data,
            out = '';

        // cache representation
        self.repr = context;
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
        }
    }; 

    return new v();
};

Template.context = function (context, data) {
        
};
