# easy-queuer

A lightweight queuing library that also provides convenient wrappers for managing timeouts and intervals with easier removal. It offers a simple and efficient way to control the execution time of functions.

## Installation

```
npm i easy-queuer
```

## Usage

Two convenience functions: `timer()` and `interval()` both return a `remove()` function that can be used to clear the timeout or interval, respectively. These functions are useful when used within React's `useEffect` hooks for example.

```javascript
import { timer, interval } from "easy-queuer";

useEffect(timer(() => render(), 1000).remove, [...deps]);
useEffect(interval(() => render(), 1000).remove, [...deps]);
```

### makeQueuer()

The `makeQueuer()` function creates a queuer that restricts the execution frequency of the function passed to it. This is particularly useful when you want to limit the invocation rate of some expensive functions.

```javascript
import { makeQueuer } from "easy-queuer";

const queuer = useMemo(() => makeQueuer(100), []);
// ...
useEffect(() => queuer.push(drawCanvas), [...deps]);
```

In the above example, `makeQueuer(100)` creates a queuer that ensures the `drawCanvas()` function is called no more than 10 times per second. The queuer will always use the latest function it received.

It's also possible to override the queuer's interval when a crucial dependency changes. By calling `push()` with the second argument set to `true`, the `drawCanvas()` function will be run immediately.
