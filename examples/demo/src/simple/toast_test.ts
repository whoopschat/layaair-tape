class TestToast extends Tape.ToastView {

    ui = new ui.test_toastUI;

    constructor() {
        super();
    }

    onShow() {
        console.log('onShow', this);
    }

}
