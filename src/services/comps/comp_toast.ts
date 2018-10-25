import ToastView from "../display/toastview";
import { ToastContentView } from "../views/toast";
import { PNG_SUCCESS, PNG_LOADING } from "../../utils/pngres";

class Toast extends ToastView {

    ui = new ToastContentView;

    constructor() {
        super();
    }

    private getIcon() {
        if ('success' == this.params.icon) {
            return PNG_SUCCESS;
        } else if ('loading' == this.params.icon) {
            return PNG_LOADING;
        } else if ('none' == this.params.icon) {
            return null;
        } else {
            return PNG_SUCCESS;
        }
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
        if (this.params.image) {
            this.ui.setContent(this.params.title || '', this.params.image);
        } else {
            this.ui.setContent(this.params.title || '', this.getIcon(), this.params.icon === 'loading');
        }
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