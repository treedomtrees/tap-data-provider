'use strict'

const t = require('tap')
// const tap = require('tap')
const tdp = require('../index')


t.test('It should run tap test, for each records in data provider', (t) => {
  const testRun = {
    '#1 This is a test': false,
    '#2 This is a test': false,
  }
  const fakeTapInstance = { fakeData: true}
  const mockedTap = {
    test: (name, callback) => {
      testRun[name] = true
      callback(fakeTapInstance)
    }
  }
  const dataSource = [
    [{value: 1}, { value: 2}],
    [{value: 2}, { value: 4}],
  ]
  tdp(mockedTap, dataSource).test('This is a test', (tap, input, output, index) => {
    t.equal(tap, fakeTapInstance, 'First params should be the fake tap instance')
    t.equal(input.value, dataSource[index][0].value, 'Input params should be the same of the current data source element')
    t.equal(output.value, dataSource[index][1].value, 'Input params should be the same of the current data source element')
  })

  t.equal(Object.values(testRun).every((called) => called), true )
  t.end()
})

