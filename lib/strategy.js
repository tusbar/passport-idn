var util                = require('util');
var OAuth2Strategy      = require('passport-oauth2');
var InternalOAuthError  = require('passport-oauth2').InternalOAuthError;
var Profile             = require('./profile');

// ## //

var Strategy = function (options, verify) {
    options = options || {};
    options.authorizationURL = options.authorizationURL || 'https://anywhere.idn.laposte.fr/oauth/v2/authorize';
    options.tokenURL = options.tokenURL || 'https://anywhere.idn.laposte.fr/oauth/v2/authorize';
    options.scopeSeparator = options.scopeSeparator || ',';
    options.customHeaders = options.customHeaders || {};

    if (!options.customHeaders['User-Agent']) {
        options.customHeaders['User-Agent'] = options.userAgent || 'passport-idn';
    }

    OAuth2Strategy.call(this, options, verify);
    this.name = 'idn';
    this._userProfileURL = options.userProfileURL || 'https://anywhere.idn.laposte.fr/oauth/v2/me';
    this._oauth2.useAuthorizationHeaderforGET(true);
};

util.inherits(Strategy, OAuth2Strategy);

Strategy.prototype.userProfile = function (accessToken, done) {
    this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
        var json;

        if (err) {
            done(new InternalOAuthError('Failed to fetch user profile', err));
            return;
        }

        try {
            json = JSON.parse(body);
        } catch (ex) {
            done(new Error('Failed to parse user profile'));
            return;
        }

        var profile = Profile.parse(json);
        profile.provider  = 'idn';
        profile._raw = body;
        profile._json = json;

        done(null, profile);
    });
};

// ## //

module.exports = Strategy;
