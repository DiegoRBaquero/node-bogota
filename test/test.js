const test = require('tape')

test('1 check', t => {
  t.plan(1)
  t.ok(true)
})

test('2 checks', t => {
  t.plan(2)
  t.ok(true)
  t.ok(true)
})

test('3 checks', t => {
  t.plan(3)
  t.ok(true)
  t.ok(true)
  t.ok(true)
})
