# passport-idn

[![Build Status](https://secure.travis-ci.org/tusbar/passport-idn.svg?branch=master)](https://travis-ci.org/tusbar/passport-idn)
[![Dependencies Status](https://david-dm.org/tusbar/passport-idn.svg)](https://david-dm.org/tusbar/passport-idn)
[![Dev Dependencies Status](https://david-dm.org/tusbar/passport-idn/dev-status.svg)](https://david-dm.org/tusbar/passport-idn#info=devDependencies)

[Passport](http://passportjs.org/) strategy for authenticating with
[La Poste IDN](https://developpeurs.idn.laposte.fr) using the OAuth 2.0
API.

This module lets you authenticate using La Poste IDN (Identité
Numérique) in your Node.js applications.  By plugging into Passport, IDN
authentication can be easily and unobtrusively integrated into any
application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware,
including [Express](http://expressjs.com/).

## Install

    $ npm install passport-idn

## Usage

#### Configure Strategy

The IDN authentication strategy authenticates users using a IDN account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

    passport.use(new IdnStrategy({
        clientID: IDN_CLIENT_ID,
        clientSecret: IDN_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:3000/auth/idn/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ idnId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'idn'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/idn',
      passport.authenticate('idn'));

    app.get('/auth/idn/callback',
      passport.authenticate('idn', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Tests

    $ npm install --dev
    $ make test

## Credits

  - [Bertrand Marron](http://github.com/tusbar)

## License

[The MIT License](http://opensource.org/licenses/MIT)
