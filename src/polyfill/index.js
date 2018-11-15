import { polyfill } from 'es6-promise';

polyfill();

// Object.assign
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

// global
let polyfillGlobal = {};
if (typeof GameGlobal !== 'undefined') {
    polyfillGlobal = GameGlobal
} else {
    polyfillGlobal = window || {
        setTimeout: (callback, timeout) => {
            if (BK && BK.Director) {
                let obj = {};
                BK.Director.ticker.setTimeout(callback, timeout, obj);
                return obj;
            }
            return setTimeout(callback, timeout);
        },
        setInterval: (callback, timeout) => {
            if (BK && BK.Director) {
                let obj = {};
                BK.Director.ticker.setInterval(callback, timeout, obj);
                return obj;
            }
            return setInterval(callback, timeout);
        },
        clearTimeout: (target) => {
            if (BK && BK.Director) {
                return BK.Director.ticker.removeTimeout(target);
            }
            return clearTimeout(target);
        },
        clearInterval: (target) => {
            if (BK && BK.Director) {
                return BK.Director.ticker.removeInterval(target);
            }
            return clearInterval(target);
        }
    };
}

// window
if (typeof window === 'undefined') {
    window = polyfillGlobal;
    window.self = window;
    window.parent = window;
    window.window = window;
    window.global = window;
    window.GameGlobal = window;
}

// FBInstant
if (typeof FBInstant !== 'undefined') {
    window.FBInstant = FBInstant;
}

// BK
if (typeof BK !== 'undefined') {
    window.BK = BK;
}

// wx
if (typeof wx !== 'undefined') {
    window.wx = wx;
}