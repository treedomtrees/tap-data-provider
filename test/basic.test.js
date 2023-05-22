'use strict'

const tap = require('tap')

const tdp = require('../lib/index')
tdp(tap)

tap.test('It should extends tap with tests method', (tap) => {
  tap.type(tap.tests, 'function', 'tests should be of type function')
  tap.end()
})

tap.test('It should throw if data source is not an array', (tap) => {
  tap.throws(
    () => {
      tap.tests('Test with object datasource', { fake: true }, (tap) => {
        tap.fail('Should not reach this point')
        tap.end()
      })
    },
    {
      message: 'Invalid datasource',
    }
  )
  tap.end()
})

tap.test(
  'It should throw if data source is a function which does not return an array',
  (tap) => {
    tap.throws(
      () => {
        tap.tests(
          'Test with object datasource',
          () => ({ fake: true }),
          (tap) => {
            tap.fail('Should not reach this point')
            tap.end()
          }
        )
      },
      {
        message: 'Invalid datasource',
      }
    )
    tap.end()
  }
)

tap.test(
  'It should throw in case element of the datasource are not an array of two elements',
  (tap) => {
    tap.throws(
      () => {
        tap.tests(
          'Test with object datasource',
          () => [
            [1, 2],
            [1, 2, 3],
          ],
          (tap) => {
            tap.fail('Should not reach this point')
            tap.end()
          }
        )
      },
      {
        message: 'Datasource array element #1 must have exactly 2 element',
      }
    )
    tap.end()
  }
)

tap.test(
  'It should throw in case element of the datasource are not an object with input and expected fields',
  (tap) => {
    tap.throws(
      () => {
        tap.tests(
          'Test with object datasource',
          () => [{ input: 1, expected: 2 }, { input: 1 }],
          (tap) => {
            tap.fail('Should not reach this point')
            tap.end()
          }
        )
      },
      {
        message:
          'Datasource object element #1 does not have input and/or expected field',
      }
    )
    tap.end()
  }
)
