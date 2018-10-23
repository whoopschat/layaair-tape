import PopupView from "../display/popupview";
import { LoadingContentView } from "../views/loading";


// title	string		是	提示的内容	
// mask	boolean	false	否	是否显示透明蒙层，防止触摸穿透	
// success
class Loading extends PopupView {

    ui = new LoadingContentView;

    constructor() {
        super();
    }

    onShow() {
        this.alpha = 0.2;
        this.isTranslucent = false;
        this.ui.setContent(this.params.title);
        this.params.success && this.params.success();
        this.params.complete && this.params.complete();
    }

}

function showLoading(params) {
    Loading.hide(false);
    Loading.show(params, null);
}

function hideLoading() {
    Loading.hide(false);
}

export default {
    showLoading,
    hideLoading,
}