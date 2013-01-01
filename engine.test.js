var assert = require('assert'),
    template = require('./engine');

suite('Template Engine Suite', function () {
    suite('Filter', function () {
        test('Add operation', function () {
            var operations = template.filter.operations;

            assert.equal(
                operations.length,
                0
            );

            template.filter.add('hello', function () {
                return 'Hello';    
            }); 

            assert.equal(
                operations.length,
                1
            );
        });

        test('Invoke operation', function () {
            template.filter.add('hello', function () {
                return 'simple hello';    
            });

            assert.equal(
                'function' === typeof( 
                    template.filter.invoke('hello') 
                ),
                true
            );    
        });
    });

    /*suite('Variables', function () {
        test('single variable', function () {
            var context = '@name',
                data = { name: 'Kaique' },
                result = data['name'];

            assert.equal(
                template.variable( context, data ).out,
                result
            );
        });    

        test('multiple variables', function () {
            var context = '@name @last',
                data = { name: 'Kaique', last: 'Silva' },
                result = data['name'] + ' ' + data['last'];

            assert.equal(
                template.variable( context, data ).out,
                result
            );
        });

        test('variables repetitions', function () {
            var context = '@last @name, @name @last',
                data = { name: 'Kaique', last: 'Silva' },
                result = data['last'] + ' ' + data['name'] + ', ' +
                         data['name'] + ' ' + data['last'];

            assert.equal(
                template.variable( context, data ).out,
                result
            );
        });
    });

    suite('Context', function () {
        test('single value', function () {
            var context = '{{ Hello @name }}',
                data = { name: 'Kaique' },
                result = ' Hello Kaique ';

            assert.equal(
                template.context( context, data ).out,
                result
            ); 
        });    

        test('change multiple values', function () {
            var context = '{{ Hello my name is @name! I live in ' +
                          '@city }}',
                data = { name: 'Kaique', city: 'São Paulo' },
                result = ' Hello my name is Kaique! I live in ' +
                         'São Paulo ';

            assert.equal(
                template.context( context, data ).out,
                result
            );
        });

        test('change context in multiple state', function () {
            var context = 'hi {{@name}}',
                data = { name: 'Kaique' },
                result = 'hi Kaique';

            assert.equal(
                template.context( context, data ).out,
                result
            );
        });

        test('double context', function () {
            var context = 'hi {{@name}} {{@last}}',
                data = { name: 'Kaique', last: 'Silva' },
                result = 'hi Kaique Silva';

            assert.equal(
                template.context(context, data).nctx,
                2
            );

            assert.equal(
                template.context( context, data ).out,
                result
            );
        });
    });*/    
});
