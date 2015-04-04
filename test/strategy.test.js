/* global describe, it, expect */
/* jshint expr: true */

var IdnStrategy = require('../lib/strategy');

// ## //

describe('Strategy', function () {
    var strategy = new IdnStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
    }, function () {
    });

    it('should be named idn', function () {
        expect(strategy.name).to.equal('idn');
    });

    it('should have default user agent', function () {
        expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('passport-idn');
    });


    describe('constructed with user agent option', function () {
        var strategy = new IdnStrategy({
            clientID: 'ABC123',
            clientSecret: 'secret',
            userAgent: 'cool-idn-agent'
        }, function () {
        });

        it('should have default user agent', function () {
            expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('cool-idn-agent');
        });
    });

    describe('constructed with custom headers including user agent', function () {
        var strategy = new IdnStrategy({
            clientID: 'ABC123',
            clientSecret: 'secret',
            customHeaders: {
                'User-Agent': 'cool-idn-agent'
            }
        }, function () {
        });

        it('should have default user agent', function () {
            expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('cool-idn-agent');
        });
    });

    describe('constructed with both custom headers including user agent and user agent option', function () {
        var strategy = new IdnStrategy({
            clientID: 'ABC123',
            clientSecret: 'secret',
            userAgent: 'cool-idn-agent',
            customHeaders: { 'User-Agent': 'even-better-idn-agent' }
        }, function () {
        });

        it('should have default user agent', function () {
            expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('even-better-idn-agent');
        });
    });
});
