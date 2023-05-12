'use strict'

const testDP = require('./lib/testDP')
module.exports = (tap, dataSource) => {
  tap.Test.prototype.addAssert('testDP', 3, testDP)

}
