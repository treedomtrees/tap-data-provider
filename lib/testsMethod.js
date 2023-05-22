'use strict'

function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function validateDataSource(datasource) {
  if (!Array.isArray(datasource)) {
    throw new Error('Invalid datasource')
  }

  const [wrongArrayElement] = datasource
    .map((element, index) => ({ element, index }))
    .filter(({ element }) => Array.isArray(element) && element.length !== 2)
  if (wrongArrayElement) {
    throw new Error(
      `Datasource array element #${wrongArrayElement.index} must have exactly 2 element`
    )
  }

  const [wrongObjectElement] = datasource
    .map((element, index) => ({ element, index }))
    .filter(
      ({ element }) =>
        isObject(element) &&
        (!Object.prototype.hasOwnProperty.call(element, 'input') ||
          !Object.prototype.hasOwnProperty.call(element, 'expected'))
    )
  if (wrongObjectElement) {
    throw new Error(
      `Datasource object element #${wrongObjectElement.index} does not have input and/or expected field`
    )
  }
}
/**
 *
 * @param name The name of test, same of the original tap test function
 * @param dataSource { function || []} The data with which the tests will be executed.
 * @param callback A function similar to the original one, but which receives also an ```input``` and an ```expected``` params
 * @returns {*}
 */
module.exports = function testsAssertion(name, dataSource, callback) {
  const source = typeof dataSource === 'function' ? dataSource() : dataSource

  validateDataSource(source)

  for (let i = 0; i < source.length; i++) {
    const input = isObject(source[i]) ? source[i].input : source[i][0]
    const expected = isObject(source[i]) ? source[i].expected : source[i][1]
    this.test(
      `${name} with data set n.${i} ${JSON.stringify(source[i])}`,
      (t) => callback(t, input, expected, i)
    )
  }
}
