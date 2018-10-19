/* global describe, it, expect */
/* jshint expr: true */

const IdnStrategy = require('../lib/strategy')

// ## //

describe('Strategy', () => {
  const strategy = new IdnStrategy({
    clientID: 'ABC123',
    clientSecret: 'secret'
  }, (() => {
  }))

  it('should be named idn', () => {
    expect(strategy.name).to.equal('idn')
  })

  it('should have default user agent', () => {
    expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('passport-idn')
  })

  describe('constructed with user agent option', () => {
    const strategy = new IdnStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      userAgent: 'cool-idn-agent'
    }, (() => {
    }))

    it('should have default user agent', () => {
      expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('cool-idn-agent')
    })
  })

  describe('constructed with custom headers including user agent', () => {
    const strategy = new IdnStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      customHeaders: {
        'User-Agent': 'cool-idn-agent'
      }
    }, (() => {
    }))

    it('should have default user agent', () => {
      expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('cool-idn-agent')
    })
  })

  describe('constructed with both custom headers including user agent and user agent option', () => {
    const strategy = new IdnStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      userAgent: 'cool-idn-agent',
      customHeaders: {'User-Agent': 'even-better-idn-agent'}
    }, (() => {
    }))

    it('should have default user agent', () => {
      expect(strategy._oauth2._customHeaders['User-Agent']).to.equal('even-better-idn-agent')
    })
  })
})
