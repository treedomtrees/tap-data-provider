'use strict'

module.exports = (tap, dataSource) => {
  return {
    test: (name, callback) => {
      for (let i = 0; i < dataSource.length; i++) {
        tap.test(`#${i + 1} ${name}`, (t) => callback(t, ...dataSource[i], i))
      }
    },
  }
}
