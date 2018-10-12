class TestToast extends Tape.ToastView {

    ui = new ui.test_toastUI;

    constructor() {
        super();
    }

    onShow() {
        this.canceledOnTouchOutside = true;
        console.log('onShow', this);
    }

}
