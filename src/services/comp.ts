import comp_toast from "./comps/comp_toast";
import comp_modal from "./comps/comp_modal";
import comp_loading from "./comps/comp_loading";

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