var pull = require('pull-stream')

function all(ary, abort, cb) {
  var n = ary.length
  ary.forEach(function (f) {
    f(abort, next)
  })
  function next() {
    if(--n) return
    cb(abort)
  }
  if(!n) next()
}

module.exports = pull.Source(function (streams) {

  return function (abort, cb) {
    ;(function next () {
      if(abort) 
        all(streams, abort, cb)
      else if(!streams.length)
          cb(true)
      else
        streams[0](null, function (err, data) {
          if(err) {
            streams.shift();
            if(err !== true)
              abort = err
            next()
          }
          else
            cb(null, data)
        })
      })()
  }
})
