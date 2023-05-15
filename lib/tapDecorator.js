'use strict'

const testDP = require('./testDP')

module.exports = (tap) => {
  tap.Test.prototype.addAssert('testDP', 3, testDP)
}
