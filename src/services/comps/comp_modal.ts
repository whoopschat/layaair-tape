import PopupView from "../display/popupview";
import { ModalContentView } from "../views/modal";

class Modal extends PopupView {

    ui = new ModalContentView;

    constructor() {
        super();
    }

    onShow() {
        this.isTranslucent = false;
        this.ui.setContent(
            this.params.title,
            this.params.content,
            this.params.showCancel,
            this.params.cancelText,
            this.params.cancelColor,
            this.params.confirmText,
            this.params.confirmColor,
            (res) => {
                this.hide();
                this.params.success && this.params.success(res);
                this.params.complete && this.params.complete(res);
            }
        );
    }

}

function showModal(params) {
    Modal.show(params, null);
}

export default {
    showModal,
}