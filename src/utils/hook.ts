type Method = (...params: any[]) => any;
type HookMethod = (target: object, methodName: string, originalMethod: Method, ...params: any[]) => any;

export function addHook(target: object, methodName: string, hook: HookMethod, upsert: boolean = false) {
    const method = target[methodName] as Method;
    if (!method && !upsert) {
        return;
    }
    Object.defineProperty(target, methodName, {
        value(...params: any[]) {
            return hook.call(this, target, methodName, method, ...params);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    });
}
