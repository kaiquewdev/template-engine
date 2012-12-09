var assert = require('assert'),
    template = require('./engine');

suite('Template Engine Suite', function () {
    suite('Variables', function () {
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
        });
    });

    suite('Context', function () {
        test('single value', function () {
            var context = '{{ Hello @name }}',
                data = { name: 'Kaique' },
                result = 'Hello Kaique';

            assert.equal(
                template.context( context, data ),
                result
            ); 
        });    
    });    
});
