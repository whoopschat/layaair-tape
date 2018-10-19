import platform from "../utils/platform";
import { wxInit } from "./platform/wechat/init";
import { fbInit } from "./platform/facebook/init";
import { browserInit } from "./platform/browser/init";

import { initScreen } from "./manager/screen";
import { initNavigator } from "./navigator/init";

function _get() {
    if (platform.isFacebookApp()) {
        return fbInit;
    } else if (platform.isWechatApp()) {
        return wxInit;
    } else {
        return browserInit;
    }
}

export function init(width: number, height: number, ...options) {
    platform.printDebug(`init...`);
    platform.printDebug(`tape version: ${platform.getVersion()}`);
    platform.printDebug(`app version: ${platform.getAppVersion()}`);
    platform.printDebug(`platform: ${platform.getPlatform()}`);
    if (platform.isWechatApp()) {
        Laya.MiniAdpter.init(true);
    }
    initScreen(false, width, height, ...options);
}

export function init3D(width: number, height: number, ...options) {
    platform.printDebug(`init3D...`);
    platform.printDebug(`tape version: ${platform.getVersion()}`);
    platform.printDebug(`app version: ${platform.getAppVersion()}`);
    platform.printDebug(`platform: ${platform.getPlatform()}`);
    if (platform.isWechatApp()) {
        Laya.MiniAdpter.init(true);
    }
    initScreen(true, width, height, ...options);
}

export function start(options, onLoaded = null) {
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