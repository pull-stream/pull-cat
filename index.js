var pull = require('pull-core')

function all(ary, abort, cb) {
  var n = ary.length
  ary.forEach(function (f) {
    if(f) f(abort, next)
    else next()
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
      else if(!streams[0])
        streams.shift(), next()
      else
        streams[0](null, function (err, data) {
          if(err) {
              streams.shift()
            if(err !== true) {
              abort = err
              //abort all streams
              while(streams.length)
                streams.shift()(err, function () {})
              cb(err)
            }
            next()
          }
          else
            cb(null, data)
        })
      })()
  }
})
