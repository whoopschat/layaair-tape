import ToastView from "../display/toastview";
import { TipsView } from "../views/tips";

class Loading extends ToastView {

    ui = new TipsView;

    constructor() {
        super();
    }

    onShow() {
        this.duration = 0;
        this.displayDuration = -1;
        this.isTranslucent = true;
        this.nonPenetrating = this.params.mask === true;
        this.ui.setContent(this.params.title, 'loading');
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