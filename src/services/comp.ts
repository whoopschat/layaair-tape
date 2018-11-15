import env from "../utils/env";
import comp_toast from "./comps/comp_toast";
import comp_modal from "./comps/comp_modal";
import comp_loading from "./comps/comp_loading";
import comp_vibrate from "./comps/comp_vibrate";

export function showLoading(params) {
    if (env.isWechatApp()) {
        return env.execWX('showLoading', params)
    }
    // if (platform.isQQApp()) {
    //     return platform.execQQ('UI.showLoading', params)
    // }
    hideToast();
    comp_loading.showLoading(params);
}

export function hideLoading() {
    if (env.isWechatApp()) {
        return env.execWX('hideLoading')
    }
    // if (platform.isQQApp()) {
    //     return platform.execQQ('UI.hideLoading')
    // }
    comp_loading.hideLoading();
}

export function showToast(params) {
    if (env.isWechatApp()) {
        return env.execWX('showToast', params)
    }
    // if (platform.isQQApp()) {
    //     return platform.execQQ('UI.showToast', params)
    // }
    hideLoading();
    comp_toast.showToast(params);
}

export function hideToast() {
    if (env.isWechatApp()) {
        return env.execWX('hideToast')
    }
    // if (platform.isQQApp()) {
    //     return platform.execQQ('UI.hideToast')
    // }
    comp_toast.hideToast();
}

export function showModal(params) {
    if (env.isWechatApp()) {
        return env.execWX('showModal', params)
    }
    // if (platform.isQQApp()) {
    //     return platform.execQQ('UI.showAlert')
    // }
    comp_modal.showModal(params)
}

export function vibrateShort() {
    if (env.isWechatApp()) {
        return env.execWX('vibrateShort')
    }
    comp_vibrate.vibrateShort();
}

export function vibrateLong() {
    if (env.isWechatApp()) {
        return env.execWX('vibrateLong')
    }
    comp_vibrate.vibrateLong();
}