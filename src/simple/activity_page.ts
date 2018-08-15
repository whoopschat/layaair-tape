class PageActivity extends Tape.Activity {

    ui = new ui.page_actiUI;

    onCreate() {
        this.ui.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(MainActivity);
        });
        this.ui.finish.on(Laya.Event.CLICK, this, () => {
            this.finish(PageActivity);
        })
        this.ui.pop.on(Laya.Event.CLICK, this, () => {
            Tape.PopManager.showPop(TestPop, {}, (pop, res) => {
                console.log('TestPop onHide ---------------------------------', res);
            });
        });
        this.ui.toast.on(Laya.Event.CLICK, this, () => {
            testToast.show();
        });
        this.ui.popToTop.on(Laya.Event.CLICK, this, () => {
            this.popToTop();
        });
        this.ui.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
    }

    onFocus(focus) {
        console.log('PageActivity onFocus ---------------------------------', focus);
    }

}