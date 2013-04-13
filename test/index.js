

var pull = require('pull-stream')
var cat = require('../')
var test = require('tape')

test('cat', function (t) {

  cat([pull.values([1,2,3]), pull.values([4,5,6])])
  .pipe(pull.collect(function (err, ary) {
    console.log(err, ary)
    t.notOk(err)
    t.deepEqual(ary, [1,2,3,4,5,6])
    t.end()
  }))

})

test('cat - with empty', function (t) {

  cat([pull.values([1,2,3]), null, pull.values([4,5,6])])
  .pipe(pull.collect(function (err, ary) {
    console.log(err, ary)
    t.notOk(err)
    t.deepEqual(ary, [1,2,3,4,5,6])
    t.end()
  }))

})

test('cat - with empty stream', function (t) {
  var ended = false
  var justEnd = function (err, cb) { ended = true; cb(true) }
  cat([pull.values([1,2,3]), justEnd, pull.values([4,5,6])])
  .pipe(pull.collect(function (err, ary) {
    console.log(err, ary)
    t.ok(ended)
    t.notOk(err)
    t.deepEqual(ary, [1,2,3,4,5,6])
    t.end()
  }))
})



test('abort - with empty', function (t) {

  cat([pull.values([1,2,3]), null, pull.values([4,5,6])])
  .pipe(function (read) {
    read(true, function (err) {
      t.equal(err, true)
      t.end()
    })
  })

})

