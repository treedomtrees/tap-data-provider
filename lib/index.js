'use strict'

const testsMethod = require('./testsMethod')

module.exports = (tap) => {
  tap.Test.prototype.tests = testsMethod
}
