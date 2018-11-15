import env from "../utils/env";
import { fbInit } from "./platform/fb/init";
import { qqInit } from "./platform/qq/init";
import { wxInit } from "./platform/wx/init";
import { brInit } from "./platform/br/init";

import { initScreen } from "./manager/screen";
import { initNavigator } from "./navigator/init";

let _inited = false;

function _get() {
    if (env.isFacebookApp()) {
        return fbInit;
    } else if (env.isWechatApp()) {
        return wxInit;
    } else if (env.isQQApp()) {
        return qqInit;
    } else {
        return brInit;
    }
}

export function init(width: number, height: number, ...options) {
    if (_inited) {
        return;
    }
    if (!env.isLayaApp()) {
        env.printError('Please ensure that the \'Laya\' library has been introduced.');
        return;
    }
    if (env.isQQApp()) {
        env.execQQ('Script.loadlib', 'GameRes://layaforqq/laya.bkadpter.js')
    }
    env.printDebug(`init...`);
    env.printDebug(`tape version: ${env.getVersion()}`);
    env.printDebug(`app version: ${env.getAppVersion()}`);
    env.printDebug(`platform: ${env.getPlatform()}`);
    if (env.isWechatApp()) {
        Laya.MiniAdpter.init(true);
    }
    initScreen(false, width, height, ...options);
    _inited = true;
}

export function init3D(width: number, height: number, ...options) {
    if (_inited) {
        return;
    }
    if (!env.isLayaApp()) {
        env.printError('Please ensure that the \'Laya\' library has been introduced.');
        return;
    }
    if (env.isQQApp()) {
        env.execQQ('Script.loadlib', 'GameRes://layaforqq/laya.bkadpter.js')
    }
    env.printDebug(`init3D...`);
    env.printDebug(`tape version: ${env.getVersion()}`);
    env.printDebug(`app version: ${env.getAppVersion()}`);
    env.printDebug(`platform: ${env.getPlatform()}`);
    if (env.isWechatApp()) {
        Laya.MiniAdpter.init(true);
    }
    initScreen(true, width, height, ...options);
    _inited = true;
}

export function start(options, onLoaded = null) {
    if (!_inited) {
        env.printError('Please perform \'Tape.init\' initialization first.');
        return;
    }
    if (!options) {
        options = {};
    }
    let newOptions = {
        mainPage: options.mainPage || null,
        commonRes: options.commonRes || [],
        fileVersion: options.fileVersion,
        onLoadProgress: (progress) => {
            _get().onLoadProgress(progress);
            options.onLoadProgress && options.onLoadProgress(progress);
        },
        onLoaded: () => {
            _get().onLoaded();
            onLoaded && onLoaded();
            options.onLoaded && options.onLoaded();
        }
    }
    let onStart = () => {
        initNavigator(newOptions);
    }
    _get().start(onStart);
}

export function exit() {
    _get().exit();
}