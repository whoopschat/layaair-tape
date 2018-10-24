import { LoadingContentView } from "../views/loading";
import ToastView from "../display/toastview";

class Loading extends ToastView {

    ui = new LoadingContentView;

    constructor() {
        super();
    }

    onShow() {
        this.alpha = 0.2;
        this.isTranslucent = true;
        this.duration = 0;
        this.displayDuration = -1;
        this.nonPenetrating = this.params.mask === true;
        this.ui.setContent(this.params.title);
        this.params.success && this.params.success();
        this.params.complete && this.params.complete();
    }

}

function showLoading(params) {
    Loading.hide();
    Loading.show(params, null);
}

function hideLoading() {
    Loading.hide();
}

export default {
    showLoading,
    hideLoading,
}