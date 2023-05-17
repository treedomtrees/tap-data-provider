'use strict'

const { Test } = require('tap')

const tdp = require('../lib/index')
const tap = tdp(require('tap'))

tap.test('It should decorate tap with tests method', async (tap) => {
  tap.type(tap.tests, 'function', 'tests should be of type function')
})

tap.test(
  'It should expose a function which accept array source',
  async (tap) => {
    const source = [
      [1, 2],
      [3, 4],
    ]
    tap.tests('This is a test name', source, (tap, input, output, index) => {
      tap.type(tap, Test, 'First params should be of type tap.Test')
      tap.equal(
        tap.name,
        `This is a test name with data set #${index} ${JSON.stringify(
          source[index]
        )}`
      )
      tap.equal(
        input,
        source[index][0],
        'Input should be the first element of the current source'
      )
      tap.equal(
        output,
        source[index][1],
        'Output should be the second element of the current source'
      )
      tap.end()
    })
    tap.end()
  }
)

tap.test(
  'It should expose a function which accept function source',
  async (tap) => {
    const dataSource = () => [
      [1, 2],
      [3, 4],
    ]
    const source = dataSource()
    tap.tests(
      'This is a test name',
      dataSource,
      (tap, input, output, index) => {
        tap.type(tap, Test, 'First params should be of type tap.Test')
        tap.equal(
          tap.name,
          `This is a test name with data set #${index} ${JSON.stringify(
            source[index]
          )}`
        )
        tap.equal(
          input,
          source[index][0],
          'Input should be the first element of the current source'
        )
        tap.equal(
          output,
          source[index][1],
          'Output should be the second element of the current source'
        )
        tap.end()
      }
    )
    tap.end()
  }
)
