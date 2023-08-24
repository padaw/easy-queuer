export function timer(action: TimerHandler, time: number): () => void {
    const timer = setTimeout(action, time);
    return () => clearTimeout(timer)
}

export function interval(action: TimerHandler, time: number): () => void {
    const interval = setInterval(action, time);
    return () => clearInterval(interval)
}

export function makeQueuer(interval: number): EasyQueuer {
    let cleanup: (() => void) | undefined;
    let pending: (() => any) | undefined;

    function handler() {
        if (pending) {
            pending();
        }
        cleanup = undefined;
    }

    return {
        push(action: () => any, isInstant?: boolean) {
            if (isInstant) {
                this.cancel();
                action();
            } else {
                pending = action;
                if (!cleanup) {
                    cleanup = timer(handler, interval);
                }
            }
        },
        cancel() {
            if (cleanup) {
                cleanup()
                cleanup = undefined;
            }
            pending = undefined;
        },
    };
}

export interface EasyQueuer {
    push(action: () => any, isInstant?: boolean): void;
    cancel(): void;
}
