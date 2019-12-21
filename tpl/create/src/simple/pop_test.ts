class TestPop extends Tape.PopupView {

    ui = new ui.test_popUI;

    constructor() {
        super();
        this.ui.btnClose.on(Laya.Event.CLICK, this, () => {
            this.hide();
        });
    }

    onShow() {
        this.canceledOnTouchOutside = true;
    }

    onHide() {
    }

}
