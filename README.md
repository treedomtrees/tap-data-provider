# tap-data-provider

Extends [node-tap](https://node-tap.org/) with a new tests assertion and introduces the concept of "DataProvider" in tests.

## Install

```shell
npm install @treedom/tap-data-provider
```

## Usage
The module will add a new ```tests``` method which accept the following params:
- **name**: The name of test, same of the original tap test function
- **dataSource**: The data with which the tests will be executed. 
- **fn**: A function similar to the original one, but which receives also a variable number of params based on data source elements

### Datasource
Datasource can be provided in form of array or **data provider function**. In case of function it must return an array. 

The data source array element can be of type
**array** or **object**. 

In case of array element, the first value will be the _input_ params of the callback function, and the second value will be the _expected_

In case of object element it should have the propery _input_ and _expected_ that will be mapped in the relative params of the callback function


```javascript
const tap = require('tap')
const tdp = require('@treedom/tap-data-provider')
tdp(tap)

function sum(number1, number2) {
  return number1 + number2
}

// Data source given as array
const datasource = [
  { input: {value_1: 1, value_2: 2}, expected: 3},
  { input: {value_1: 3, value_2: 2}, expected: 5},
]
tap.tests('sum should return right values', datasource, (tap, {value_1, value_2}, expected) => {
  tap.equal(sum(value_1, value_2), expected)
  tap.end()
})

// Data source given as provider function
function sumDataProvider() {
  return [
    [{value_1: 1, value_2: 2}, 3],
    [{value_1: 3, value_2: 2}, 5],
  ]
}
tap.tests('sum should return right values', sumDataProvider, (tap, {value_1, value_2}, expected) => {
  tap.equal(sum(value_1, value_2), expected)
  tap.end()
})
```
