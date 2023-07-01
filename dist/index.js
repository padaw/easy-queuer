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
function makeQueuer(time) {
    var timeout;
    var pending;
    var handler = function () {
        pending();
        timeout = null;
    };
    return {
        push: function (act, instant) {
            pending = act;
            if (instant && timeout)
                timeout.remove();
            if (!timeout || instant)
                timeout = timer(handler, instant ? 1 : time);
        },
        cancel: function () {
            if (timeout) {
                timeout.remove();
                timeout = null;
            }
        },
    };
}
exports.makeQueuer = makeQueuer;
