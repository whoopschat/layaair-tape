import { addHook } from "../../utils/hook";
import platform from "../../utils/platform";

export function initLogs() {
    ['log', 'debug', 'warn', 'error'].forEach(level => {
        addHook(console, level, (target, methodName, originalMethod, ...params) => {
            if (platform.isDev() || level === 'error') {
                return originalMethod.call(this, ...params);
            }
        });
    });
}