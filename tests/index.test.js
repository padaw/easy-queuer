const easyTimer = require('../dist/index.js')

test('remove() clears a timer/interval', done => {
  let a = 100
  const handler = easyTimer.timer(() => (a = 0), 100)
  handler.remove()
  setTimeout(() => {
    expect(a).toBe(100)
    done()
  }, 500)
})

test("makeQueuer() doesn't exceed the interval", done => {
  let a = 0
  const queue = easyTimer.makeQueuer(100)
  const int = easyTimer.interval(() => queue.push(() => a++), 20)
  setTimeout(() => {
    int.remove()
    expect(a).toBe(9)
    done()
  }, 1020)
})
