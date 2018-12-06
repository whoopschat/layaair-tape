class Page2Activity extends Tape.Activity {

    ui = new ui.page.page2UI;

    onCreate() {
        this.ui.btnFinish.on(Laya.Event.CLICK, this, () => {
            this.finish(Page2Activity);
        });
        this.ui.btnPopToTop.on(Laya.Event.CLICK, this, () => {
            this.popToTop();
        });
        this.ui.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
        this.ui.btnNavigate.on(Laya.Event.CLICK, this, () => {
            this.navigate(Page1Activity, null, null, true);
        });
    }

}
