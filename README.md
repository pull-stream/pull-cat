# pull-cat

concatinate pull-streams

construct a new source stream from a sequential list of source streams,
reading from each one in turn until it ends, then the next, etc.
If one stream errors, then the rest of the streams are aborted immediately.
If the cat stream is aborted (i.e. if it's sink errors) then all the streams
are aborted.

A cat stream is a moderately challenging stream to implement,
especially in the context of error states.

# example

``` js
var cat = require('pull-cat')
var pull = require('pull-stream')
pull(
  cat([pull.values([1,2,3]), pull.values([4,5,6])]),
  sink...
)
```

Reads from the each stream until it is finished.
If a stream errors, stop all the streams.
if the concatenated stream is aborted, abort all the streams,
then callback to the aborter.

## License

MIT


