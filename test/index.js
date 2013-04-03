

var pull = require('pull-stream')
var cat = require('../')

require('tape')('cat', function (t) {

  cat([pull.values([1,2,3]), pull.values([4,5,6])])
  .pipe(pull.collect(function (err, ary) {
    console.log(err, ary)
    t.notOk(err)
    t.deepEqual(ary, [1,2,3,4,5,6])
    t.end()
  }))

})
