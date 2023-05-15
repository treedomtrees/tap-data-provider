'use strict'

module.exports = function testDP(name, dataSource, callback) {
  const source = typeof dataSource === 'function' ? dataSource() : dataSource
  for (let i = 0; i < source.length; i++) {
    this.test(`${name} with data set #${i} ${JSON.stringify(source[i])}`, (t) =>
      callback(t, ...source[i], i)
    )
  }
  return this.pass()
}
