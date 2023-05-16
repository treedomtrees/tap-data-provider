'use strict'

const t = require('tap')

const { tapDecorator } = require('../index')
tapDecorator(t)

t.test('It should decorate tap with tests method', async () => {
  t.type(t.tests, 'function', 'tests should be of type function')
})

t.test('It should expose a function which accept array source', async () => {
  const source = [
    [1, 2],
    [3, 4],
  ]
  t.tests('This is a test name', source, (tap, input, output, index) => {
    t.type(tap, 'object', 'First params should be of type object')
    t.equal(
      tap.name,
      `This is a test name with data set #${index} ${JSON.stringify(
        source[index]
      )}`
    )
    t.equal(
      input,
      source[index][0],
      'Input should be the first element of the current source'
    )
    t.equal(
      output,
      source[index][1],
      'Output should be the second element of the current source'
    )
    tap.end()
  })
  t.end()
})

t.test('It should expose a function which accept function source', async () => {
  const dataSource = () => [
    [1, 2],
    [3, 4],
  ]
  const source = dataSource()
  t.tests('This is a test name', dataSource, (tap, input, output, index) => {
    t.type(tap, 'object', 'First params should be of type object')
    t.equal(
      tap.name,
      `This is a test name with data set #${index} ${JSON.stringify(
        source[index]
      )}`
    )
    t.equal(
      input,
      source[index][0],
      'Input should be the first element of the current source'
    )
    t.equal(
      output,
      source[index][1],
      'Output should be the second element of the current source'
    )
    tap.end()
  })
  t.end()
})
