/* global describe, it, expect, before */
/* jshint expr: true */

const fs = require('fs')
const parse = require('../lib/profile').parse

// ## //

describe('profile.parse', () => {
  describe('example profile', () => {
    let profile

    before(done => {
      fs.readFile('test/data/example.json', 'utf8', (err, data) => {
        if (err) {
          done(err)
        } else {
          profile = parse(data)
          done()
        }
      })
    })

    it('should parse profile', () => {
      expect(profile.id).to.equal('mbl')
      expect(profile.username).to.equal('mbl')
      expect(profile.name).to.equal('M LE-JAMBON Paul')
      expect(profile.emails).to.have.length(1)
      expect(profile.emails[0].value).to.equal('mbl@somewhere.net')
    })
  })

  describe('example profile with null email', () => {
    let profile

    before(done => {
      fs.readFile('test/data/example-null-email.json', 'utf8', (err, data) => {
        if (err) {
          done(err)
        } else {
          profile = parse(data)
          done()
        }
      })
    })

    it('should parse profile', () => {
      expect(profile.id).to.equal('mbl')
      expect(profile.username).to.equal('mbl')
      expect(profile.name).to.be.undefined
      expect(profile.emails).to.be.undefined
    })
  })
})
