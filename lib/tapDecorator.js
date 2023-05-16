'use strict'

const testsAssertion = require('./testsAssertion')

module.exports = (tap) => {
  tap.Test.prototype.addAssert('tests', 3, testsAssertion)

  return tap
}
