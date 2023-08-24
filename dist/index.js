"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQueuer = exports.interval = exports.timer = void 0;
function timer(action, time) {
    var timer = setTimeout(action, time);
    return function () { return clearTimeout(timer); };
}
exports.timer = timer;
function interval(action, time) {
    var interval = setInterval(action, time);
    return function () { return clearInterval(interval); };
}
exports.interval = interval;
function makeQueuer(interval) {
    var cleanup;
    var pending;
    function handler() {
        if (pending) {
            pending();
        }
        cleanup = undefined;
    }
    return {
        push: function (action, isInstant) {
            if (isInstant) {
                this.cancel();
                action();
            }
            else {
                pending = action;
                if (!cleanup) {
                    cleanup = timer(handler, interval);
                }
            }
        },
        cancel: function () {
            if (cleanup) {
                cleanup();
                cleanup = undefined;
            }
            pending = undefined;
        },
    };
}
exports.makeQueuer = makeQueuer;
