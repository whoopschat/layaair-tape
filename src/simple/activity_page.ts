class PageActivity extends Tape.Activity {

    ui = new ui.page_actiUI;
    
    onCreate() {
        this.ui.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(MainActivity);
        })
        this.ui.pop.on(Laya.Event.CLICK, this, () => {
            Tape.PopManager.showPop(TestPop, {}, () => {
                console.log(' ------------------ ');
            });
        });
        this.ui.toast.on(Laya.Event.CLICK, this, () => {
            Tape.ToastManager.showToast(new ui.test_toastUI);
            // Tape.ToastManager.hideAll();
        });
        this.ui.popToTop.on(Laya.Event.CLICK, this, () => {
            this.popToTop();
        });
        this.ui.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
    }

}