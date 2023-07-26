export declare function timer(action: TimerHandler, time: number): RemovableHandler;
export declare function interval(action: TimerHandler, time: number): RemovableHandler;
export declare function makeQueuer(interval: number): EasyQueuer;
export interface RemovableHandler {
    remove: () => void;
}
export interface EasyQueuer {
    push(action: () => any, isInstant?: boolean): void;
    cancel(): void;
}
