'use strict'

const testsMethod = require('./testsMethod')

function createTestProxy(tapTest) {
  const handler = {
    get(target, prop, receiver) {
      if (prop === 'tests') {
        return testsMethod
      }
      return Reflect.get(...arguments)
    },
  }

  return new Proxy(tapTest, handler)
}
function decorateTestMethod(tap) {
  const originFn = tap.test
  tap.test = async (name, fn) => {
    const wrapperFn = (tap) => {
      decorateTestMethod(tap)
      const proxyTest = createTestProxy(tap)
      return fn.call(tap, proxyTest)
    }
    return originFn.call(tap, name, wrapperFn)
  }
}

module.exports = (tap) => {
  decorateTestMethod(tap)
  return createTestProxy(tap)
}
