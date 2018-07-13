class TestPop extends Tape.PopView {

    ui = new ui.test_popUI;

    constructor() {
        super();
        this.isTranslucent = false;
        this.canceledOnTouchOutside = true;
    }

    onShow() {
        console.log('onShow', this);
    }

    onHide() {
        console.log('onHide', this);
    }

}