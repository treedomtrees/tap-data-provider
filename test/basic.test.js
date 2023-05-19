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
