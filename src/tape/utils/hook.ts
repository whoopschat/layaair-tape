module Tape {

    type Method = (...params: any[]) => any
    type HookMethod = (target: Object, methodName: string, originalMethod: Method, ...params: any[]) => any

    export function addHook(target: Object, methodName: string, hook: HookMethod, upsert: boolean = false) {
        let method = <Method>target[methodName];
        if (!method && !upsert) {
            return;
        }
        if (method) {
            // bind original method to target
            method = method.bind(target);
        }
        Object.defineProperty(target, methodName, {
            value: (...params: any[]) => hook(target, methodName, method, ...params),
            enumerable: true,
            writable: true,
            configurable: true,
        });
    }
    
}
