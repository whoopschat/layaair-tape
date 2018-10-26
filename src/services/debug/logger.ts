import { addHook } from "../../utils/hook";
import platform from "../../utils/platform";

let _logs = {
    log: [],
    error: [],
    debug: [],
    warn: [],
};

export function initLogs() {
    ['log', 'debug', 'warn', 'error'].forEach(level => {
        addHook(console, level, (target, methodName, originalMethod, ...params) => {
            if (platform.isDev()) {
                _logs[level].push({
                    date: Date.now(),
                    params,
                });
                return originalMethod.call(this, ...params);
            }
        });
    });
}

export function clearLogs() {
    ['log', 'debug', 'warn', 'error'].forEach(level => {
        _logs[level].splice(0, _logs[level].length);
    });
}

export function fetchLogs(level) {
    return _logs[level] || [];
}