"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeQueuer = exports.interval = exports.timer = void 0;
function timer(action, time) {
    var timer = setTimeout(action, time);
    return { remove: function () { return clearTimeout(timer); } };
}
exports.timer = timer;
function interval(action, time) {
    var interval = setInterval(action, time);
    return { remove: function () { return clearInterval(interval); } };
}
exports.interval = interval;
function makeQueuer(interval) {
    var timeout;
    var pending;
    function handler() {
        if (pending) {
            pending();
        }
        timeout = undefined;
    }
    return {
        push: function (action, isInstant) {
            if (isInstant) {
                this.cancel();
                action();
            }
            else {
                pending = action;
                if (!timeout) {
                    timeout = timer(handler, interval);
                }
            }
        },
        cancel: function () {
            if (timeout) {
                timeout.remove();
                timeout = undefined;
            }
            pending = undefined;
        },
    };
}
exports.makeQueuer = makeQueuer;
