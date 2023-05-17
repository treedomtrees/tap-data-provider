# tap-data-provider

Extends [node-tap](https://node-tap.org/) with a new tests assertion and introduces the concept of "DataProvider" in tests.

## Install

```shell
npm install tap-data-provider
```

## Usage
The module will add a new ```tests``` method which accept the following params:
- **name**: The name of test, same of the original tap test function
- **dataSource**: The data with which the tests will be executed. 
- **fn**: A function similar to the original one, but which receives also an ```input``` , an ```expected``` and an ```index``` params

Datasource can be sent in form of array or **data provider function**. In case of function it must return an array. 

The first element of the array will be the **input** params of the callback function, the second element will be 
the **expected** params.

```javascript
const t = require('tap')
const tapDataProvider = require('tap-data-provider')

const tap = tapDataProvider(t)

function sum(number1, number2) {
  return number1 + number2
}

// Data source given as array
const datasource = [
  [{n1: 1, n2: 2}, 3],
  [{n1: 3, n2: 2}, 5],
]
tap.tests('sum should return right values', datasource, (tap, {n1, n2}, expected) => {
  t.equal(sum(n1, n2), expected)
  t.end()
})

// Data source given as provider function
function sumDataProvider() {
  return [
    [{n1: 1, n2: 2}, 3],
    [{n1: 3, n2: 2}, 5],
  ]
}
tap.tests('sum should return right values', sumDataProvider, (tap, {n1, n2}, expected) => {
  t.equal(sum(n1, n2), expected)
  t.end()
})
```

## Caveats
The tests method double the number of total asserts 

```javascript
function sumDataProvider() {
  return [
    [{n1: 1, n2: 2}, 3],
    [{n1: 3, n2: 2}, 5],
  ]
}
tap.tests('sum should return right values', sumDataProvider, (tap, {n1, n2}, expected) => {
  t.equal(sum(n1, n2), expected)
  t.end()
})
// 4 asserts
```

```javascript
tap.test('sum should return right values 1', (tap) => {
  t.equal(sum(1, 2), 3)
  t.end()
})

tap.test('sum should return right values 2', (tap) => {
  t.equal(sum(3, 2), 5)
  t.end()
})

// 2 asserts
```
