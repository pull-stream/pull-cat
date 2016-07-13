var noop = function () {}

function all (ary, abort, cb) {
  var n = ary.length
  if (!n) return cb(abort)
  ary.forEach(function (f) {
    if (f) f(abort, next)
    else next()
  })

  function next () {
    if (--n) return
    cb(abort)
  }
  if (!n) next()
}

module.exports = function pullCat (streams) {
  return function (abort, cb) {
    ;(function next () {
      if (abort) {
        all(streams, abort, cb)
      } else if (!streams.length) {
        cb(true)
      } else if (!streams[0]) {
        streams.shift()
        next()
      } else {
        streams[0](null, function (err, data) {
          if (err) {
            streams.shift()
            if (err !== true) {
              abort = err
              // abort all streams
              while (streams.length) {
                (streams.shift() || noop)(err, noop)
              }
              cb(err)
            }
            next()
          } else cb(null, data)
        })
      }
    })()
  }
}
