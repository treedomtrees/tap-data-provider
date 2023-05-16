'use strict'

/**
 *
 * @param name The name of test, same of the original tap test function
 * @param dataSource { function || []} The data with which the tests will be executed.
 * @param callback A function similar to the original one, but which receives also an ```input``` and an ```expected``` params
 * @returns {*}
 */
module.exports = function testsAssertion(name, dataSource, callback) {
  const source = typeof dataSource === 'function' ? dataSource() : dataSource
  for (let i = 0; i < source.length; i++) {
    this.test(`${name} with data set #${i} ${JSON.stringify(source[i])}`, (t) =>
      callback(t, ...source[i], i)
    )
  }
  return this.pass()
}
