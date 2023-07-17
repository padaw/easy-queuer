# easy-queuer

A lightweight queuing library that provides convenient wrappers for managing timeouts and intervals with easier removal. It offers a simple and efficient way to control the execution of functions, especially when working with React's `useEffect` hooks.

## Installation

```
npm i easy-queuer
```

## Usage

easy-queuer provides two convenience functions: `timer()` and `interval()`. Both functions return a `remove()` function that can be used to clear the timeout or interval, respectively. These functions are particularly useful when used within React's `useEffect` hooks.

```javascript
import { timer, interval } from "easy-queuer";

useEffect(timer(() => render(), 1000).remove, [...deps]);
useEffect(interval(() => render(), 1000).remove, [...deps]);
```

### makeQueuer()

The `makeQueuer()` function creates a queuer that restricts the execution frequency of the function passed to it. This is particularly useful when you want to limit the invocation rate of certain functions, such as canvas drawings in a React component with frequently changing variables.

```javascript
import { makeQueuer } from "easy-queuer";

const queuer = useMemo(() => makeQueuer(100), []);
// ...
useEffect(() => queuer.push(drawCanvas), [...deps]);
```

In the above example, `makeQueuer(100)` creates a queuer that ensures the `drawCanvas()` function is called no more than 10 times per second. The queuer will always use the latest state when actually drawing the canvas.

It's also possible to override the queuer's interval when a crucial dependency changes. By calling `push()` with the second argument set to `true`, the `drawCanvas()` function will be invoked immediately.
