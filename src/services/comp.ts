import comp_toast from "./comps/comp_toast";
import comp_modal from "./comps/comp_modal";
import comp_loading from "./comps/comp_loading";
import comp_vibrate from "./comps/comp_vibrate";
import platform from "../utils/platform";

export function showLoading(params) {
    if (platform.isWechatApp()) {
        return platform.execWX('showLoading', params)
    }
    hideToast();
    comp_loading.showLoading(params);
}

export function hideLoading() {
    if (platform.isWechatApp()) {
        return platform.execWX('hideLoading')
    }
    comp_loading.hideLoading();
}

export function showToast(params) {
    if (platform.isWechatApp()) {
        return platform.execWX('showToast', params)
    }
    hideLoading();
    comp_toast.showToast(params);
}

export function hideToast() {
    if (platform.isWechatApp()) {
        return platform.execWX('hideToast')
    }
    comp_toast.hideToast();
}

export function showModal(params) {
    if (platform.isWechatApp()) {
        return platform.execWX('showModal', params)
    }
    comp_modal.showModal(params)
}

export function vibrateShort() {
    if (platform.isWechatApp()) {
        return platform.execWX('vibrateShort')
    }
    comp_vibrate.vibrateShort();
}

export function vibrateLong() {
    if (platform.isWechatApp()) {
        return platform.execWX('vibrateLong')
    }
    comp_vibrate.vibrateLong();
}