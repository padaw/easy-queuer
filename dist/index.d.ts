export declare function timer(action: TimerHandler, time: number): () => void;
export declare function interval(action: TimerHandler, time: number): () => void;
export declare function makeQueuer(interval: number): EasyQueuer;
export interface EasyQueuer {
    push(action: () => any, isInstant?: boolean): void;
    cancel(): void;
}
