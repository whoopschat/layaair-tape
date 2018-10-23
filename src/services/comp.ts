import comp_toast from "./comps/comp_toast";
import comp_modal from "./comps/comp_modal";
import comp_loading from "./comps/comp_loading";
import comp_vibrate from "./comps/comp_vibrate";

export function showLoading(params) {
    comp_loading.showLoading(params);
}

export function hideLoading() {
    comp_loading.hideLoading();
}

export function showToast(params) {
    comp_toast.showToast(params);
}

export function hideToast() {
    comp_toast.hideToast();
}

export function showModal(params) {
    comp_modal.showModal(params)
}

export function vibrateShort() {
    comp_vibrate.vibrateShort();
}

export function vibrateLong() {
    comp_vibrate.vibrateLong();
}