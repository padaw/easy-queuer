export declare function timer(action: TimerHandler, time: number): RemovableHandler;
export declare function interval(action: TimerHandler, time: number): RemovableHandler;
export declare function makeQueuer(time: number): {
    push: (act: () => any, instant?: boolean) => void;
};
export interface RemovableHandler {
    remove: () => void;
}
