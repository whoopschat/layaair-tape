import platform from "../utils/platform";
import { fbApp } from "./platform/app_fb";
import { wxApp } from "./platform/app_wx";

function shareAsync(options) {
    if (platform.isFacebookApp()) {
        return fbApp.shareAsync(options);
    } else if (platform.isWechatApp()) {
        return wxApp.shareAsync(options);
    }
    return Promise.reject();
}

function onShare(callback) {
    if (platform.isFacebookApp()) {
        return fbApp.onShare(callback);
    } else if (platform.isWechatApp()) {
        return wxApp.onShare(callback);
    }
}

function getUserInfo(callback) {
    if (platform.isFacebookApp()) {
        return fbApp.getUserInfo(callback);
    } else if (platform.isWechatApp()) {
        return wxApp.getUserInfo(callback);
    } else {
        callback && callback(null);
    }
}

function onLaunch(callback) {
    if (platform.isFacebookApp()) {
        return fbApp.onLaunch(callback);
    } else if (platform.isWechatApp()) {
        return wxApp.onLaunch(callback);
    }
}

function onPause(callback) {
    if (platform.isFacebookApp()) {
        return fbApp.onPause(callback);
    } else if (platform.isWechatApp()) {
        return wxApp.onPause(callback);
    }
}

export default {
    shareAsync,
    onShare,
    getUserInfo,
    onPause,
    onLaunch,
}
