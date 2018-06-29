class TestPop extends Tape.PopView {

    constructor() {
        super();
        this.addChild(new ui.test_popUI);
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