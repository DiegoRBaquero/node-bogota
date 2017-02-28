const test = require('tape')

test('1 check', t => {
  t.plan(1)
  setTimeout(() => {
    t.ok(true)
  }, 500)
})

test('2 checks', t => {
  t.plan(2)
  setTimeout(() => {
    t.ok(true)
    setTimeout(() => {
      t.ok(true)
    }, 500)
  }, 500)
})

test('3 checks', t => {
  t.plan(3)
  setTimeout(() => {
    t.ok(true)
    setTimeout(() => {
      t.ok(true)
    }, 500)
    setTimeout(() => {
      t.ok(true)
    }, 500)
  }, 500)
})
