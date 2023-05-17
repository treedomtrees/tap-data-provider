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
    const wrapperFn = async (testObject) => {
      decorateTestMethod(testObject)
      const proxyTest = createTestProxy(testObject)
      return await fn.call(this, proxyTest)
    }
    return originFn.call(this, name, wrapperFn)
  }
}

module.exports = (tap) => {
  decorateTestMethod(tap)
  return createTestProxy(tap)
}
