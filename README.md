# easy-queuer

A simple queuer with timeout and interval wrappers for easier removal.

## Installation

```
npm i easy-queuer
```

## Usage

### timer()

### interval()

Both return a `remove()` function for `clearTimeout()` and `clearInterval()` respectively. Very useful in React useEffect hooks.

```js
import { timer, interval } from 'easy-queuer'

useEffect(timer(() => render(), 1000).remove, [...deps])
useEffect(interval(() => render(), 1000).remove, [...deps])
```

### makeQueuer()

Creates a queuer that will never run the functions you pass to it more frequently than the interval you set.

It was useful for me when I had to limit my canvas drawings in a React component which had variables that were changing too often.

```js
import { makeQueuer } from 'easy-queuer'

const queuer = useMemo(() => makeQueuer(100), [])
...
useEffect(() => queuer.push(drawCanvas), [...deps])
```

In the example above, `drawCanvas()` method is never called more than 10 times per second and will always use the latest state when it actually
draws the canvas.

```js
useEffect(() => queuer.push(drawCanvas, true), [...importantDeps])
```

It is possible to override the timer when a very important variable is changed. Calling `push()` with the second argument set to `true` will call
`drawCanvas()` instantly.
