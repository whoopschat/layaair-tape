class PageActivity extends Tape.Activity {

    private pageUI = new ui.page_actiUI();

    public onCreate() {
        this.addChild(this.pageUI);
        this.pageUI.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(MainActivity);
        })
        this.pageUI.pop.on(Laya.Event.CLICK, this, () => {
            Tape.PopManager.showPop(TestPop);
        });
        this.pageUI.toast.on(Laya.Event.CLICK, this, () => {
            Tape.ToastManager.showToast(new ui.test_toastUI);
            // Tape.ToastManager.hideAll();
        });
        this.pageUI.popToTop.on(Laya.Event.CLICK, this, () => {
            this.popToTop();
        });
        this.pageUI.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
    }

}