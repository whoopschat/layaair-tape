import ToastView from "../display/toastview";
import { ToastContentView } from "../views/toast";

class Toast extends ToastView {

    ui = new ToastContentView;

    constructor() {
        super();
    }

    onShow() {
        this.duration = 0;
        if (this.params.duration) {
            this.displayDuration = this.params.duration;
        }
        if (this.displayDuration > 3000) {
            this.displayDuration = 3000;
        }
        if (this.displayDuration < 500) {
            this.displayDuration = 500;
        }
        this.ui.setContent(this.params.title || '', this.params.image);
        this.params.success && this.params.success();
        this.params.complete && this.params.complete();
    }

}

function showToast(params) {
    Toast.hide();
    Toast.show(params, null)
}

function hideToast() {
    Toast.hide();
}

export default {
    showToast,
    hideToast,
}