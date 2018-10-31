import ToastView from "../display/toastview";
import { TipsView } from "../views/tips";

class Toast extends ToastView {

    ui = new TipsView;

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
        this.nonPenetrating = this.params.mask === true;
        this.ui.setContent(this.params.title || '', this.params.image || this.params.icon || 'success');
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