/* global describe, it, expect, before */
/* jshint expr: true */

const IdnStrategy = require('../lib/strategy')

// ## //

describe('Strategy#userProfile', () => {
  describe('loading profile', () => {
    const strategy = new IdnStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, (() => {
    }))

    strategy._oauth2.get = function (url, accessToken, callback) {
      if (url !== 'https://anywhere.idn.laposte.fr/oauth/v2/me') {
        callback(new Error('wrong url argument'))
        return
      }

      if (accessToken !== 'token') {
        callback(new Error('wrong token argument'))
        return
      }

      const body = [
        '{',
        '"id":"mbl",',
        '"namePerson/friendly":"mbl",',
        '"namePerson":"M LE-JAMBON Paul",',
        '"namePerson/prefix":"M",',
        '"namePerson/last":"LE-JAMBON",',
        '"namePerson/first":"Paul",',
        '"birthdate":"01-04-1984",',
        '"contact/postalAddress/home":";;4 rue Franconville;;Paris;75050",',
        '"contact/city/home":"Paris",',
        '"contact/country/home":"France",',
        '"contact/email":"mbl@somewhere.net",',
        '"contact/phone/cell":"0607080910" }'
      ].join('')

      callback(null, body, undefined)
    }

    let profile

    before(done => {
      strategy.userProfile('token', (err, p) => {
        if (err) {
          done(err)
        } else {
          profile = p
          done()
        }
      })
    })

    it('should parse profile', () => {
      expect(profile.provider).to.equal('idn')

      expect(profile.id).to.equal('mbl')
      expect(profile.username).to.equal('mbl')
      expect(profile.name).to.equal('M LE-JAMBON Paul')
      expect(profile.emails).to.have.length(1)
      expect(profile.emails[0].value).to.equal('mbl@somewhere.net')
    })

    it('should set raw property', () => {
      expect(profile._raw).to.be.a('string')
    })

    it('should set json property', () => {
      expect(profile._json).to.be.an('object')
    })
  })
})
