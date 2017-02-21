const test = require('tape')

test('Hello', t => {
  t.plan(1)
  t.ok(true)
})

test('THis', t => {
  t.plan(2)
  t.ok(true)
  t.ok(true)
})

test('Is a test', t => {
  t.plan(3)
  t.ok(true)
  t.ok(true)
  t.ok(true)
})
