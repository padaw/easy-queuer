export function timer(action: TimerHandler, time: number): RemovableHandler {
    const timer = setTimeout(action, time);
    return { remove: () => clearTimeout(timer) };
}

export function interval(action: TimerHandler, time: number): RemovableHandler {
    const interval = setInterval(action, time);
    return { remove: () => clearInterval(interval) };
}

export function makeQueuer(interval: number): EasyQueuer {
    let timeout: RemovableHandler | undefined;
    let pending: (() => any) | undefined;

    function handler() {
        if (pending) {
            pending();
        }
        timeout = undefined;
    }

    return {
        push(action: () => any, isInstant?: boolean) {
            if (isInstant) {
                this.cancel();
                action();
            } else {
                pending = action;
                if (!timeout) {
                    timeout = timer(handler, interval);
                }
            }
        },
        cancel() {
            if (timeout) {
                timeout.remove();
            }
            pending = undefined;
        },
    };
}

export interface RemovableHandler {
    remove: () => void;
}

export interface EasyQueuer {
    push(action: () => any, isInstant?: boolean): void;
    cancel(): void;
}
