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

        if ( d ) {
            for ( var key in d ) {
                var r = self.at + key;

                c = c.replace(r, d[key]);
            } 

            self.out = c;
        }
    }; 

    return new v();
};

Template.context = function (context, data) {
        
};
