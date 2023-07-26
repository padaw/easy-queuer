const easyTimer = require("../dist/index.js");

test("remove() clears a timer/interval", (done) => {
    let a = 100;
    const timer = easyTimer.timer(() => {
        a = 0;
    }, 50);
    const interval = easyTimer.interval(() => {
        a = 0;
    }, 50);
    timer.remove();
    interval.remove();
    setTimeout(() => {
        try {
            expect(a).toBe(100);
            done();
        } catch (err) {
            done(err);
        }
    }, 100);
});

test("calls to makeQueuer() don't exceed the interval", (done) => {
    let a = 0;
    const queue = easyTimer.makeQueuer(40);
    const interval = easyTimer.interval(() => {
        queue.push(() => {
            a += 1;
        });
    }, 10);
    setTimeout(() => {
        interval.remove();
        try {
            expect(a).toBe(2);
            done();
        } catch (err) {
            done(err);
        }
    }, 110);
});

test("running push() inside an instant action works", (done) => {
    let a = 10;
    const queue = easyTimer.makeQueuer(100);
    queue.push(() => {
        a = 20;
        queue.push(() => {
            a *= 2;
        });
    }, true);
    setTimeout(() => {
        try {
            expect(a).toBe(40);
            done();
        } catch (err) {
            done(err);
        }
    }, 100);
});
