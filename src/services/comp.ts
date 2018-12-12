import env from "../utils/env";
import comp_toast from "./comps/comp_toast";
import comp_modal from "./comps/comp_modal";
import comp_loading from "./comps/comp_loading";
import comp_vibrate from "./comps/comp_vibrate";

export function showLoading(params) {
    if (env.isWechatApp()) {
        return env.execWX('showLoading', params)
    }
    if (env.isBaiduApp()) {
        return env.execBD('showLoading', params)
    }
    comp_loading.showLoading(params);
    comp_toast.hideToast();
}

export function hideLoading() {
    if (env.isWechatApp()) {
        return env.execWX('hideLoading')
    }
    if (env.isBaiduApp()) {
        return env.execBD('hideLoading')
    }
    comp_loading.hideLoading();
}

export function showToast(params) {
    if (env.isWechatApp()) {
        return env.execWX('showToast', params)
    }
    if (env.isBaiduApp()) {
        return env.execBD('showToast', params)
    }
    comp_toast.showToast(params);
    comp_loading.hideLoading();
}

export function hideToast() {
    if (env.isWechatApp()) {
        return env.execWX('hideToast')
    }
    if (env.isBaiduApp()) {
        return env.execBD('hideToast')
    }
    comp_toast.hideToast();
}

export function showModal(params) {
    if (env.isWechatApp()) {
        return env.execWX('showModal', params)
    }
    if (env.isBaiduApp()) {
        return env.execBD('showModal', params)
    }
    comp_modal.showModal(params)
}

export function vibrateShort() {
    if (env.isWechatApp()) {
        return env.execWX('vibrateShort')
    }
    if (env.isBaiduApp()) {
        return env.execBD('vibrateShort')
    }
    comp_vibrate.vibrateShort();
}

export function vibrateLong() {
    if (env.isWechatApp()) {
        return env.execWX('vibrateLong')
    }
    if (env.isBaiduApp()) {
        return env.execBD('vibrateLong')
    }
    comp_vibrate.vibrateLong();
}