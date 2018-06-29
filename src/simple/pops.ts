class A extends Tape.PopView {

    constructor() {
        super();
        this.addChild(new ui.DemoUI);
        this.isTranslucent = false;
        this.canceledOnTouchOutside = true;
    }

    onShow() {
        console.log('onShow',this);
    }

    onHide() {
        console.log('onHide',this);
    }

}