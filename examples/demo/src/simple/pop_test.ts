class TestPop extends Tape.PopupView {

    ui = new ui.test_popUI;

    constructor() {
        super();
        this.ui.btnClose.on(Laya.Event.CLICK, this, () => {
            this.finish();
        });
    }

    onShow() {
        console.log('onShow', this);
    }

    onHide() {
        console.log('onHide', this);
    }

}
