class TestPop extends Tape.PopView {

    ui = new ui.test_popUI;

    constructor() {
        super();
        this.isTranslucent = false;
        this.canceledOnTouchOutside = false;
    }

    onShow() {
        console.log('onShow', this);
        this.finish(false)
    }

    onHide() {
        console.log('onHide', this);
    }

}