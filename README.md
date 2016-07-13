# pull-cat

concatenate pull-streams

```shell
npm install --save pull-cat
```

## example

```js
var cat = require('pull-cat')
var pull = require('pull-stream')

pull(
  cat([
    pull.values([1,2,3]),
    pull.values([4,5,6])
  ]),
  pull.log()
)
// 1
// 2
// 3
// 4
// 5
// 6
```


## api

### `cat = require('pull-cat')`

### `stream = cat(streams)`

Reads from each stream in `streams` until finished.

If a stream errors, stop all the streams.

## License

MIT
