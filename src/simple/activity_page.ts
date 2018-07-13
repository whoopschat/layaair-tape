class PageActivity extends Tape.Activity {


    onCreate() {
        this.contentView = new ui.page_actiUI();
        this.contentView.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(MainActivity);
        })
        this.contentView.pop.on(Laya.Event.CLICK, this, () => {
            Tape.PopManager.showPop(TestPop,{},() => {
                console.log(' ------------------ ');
            });
        });
        this.contentView.toast.on(Laya.Event.CLICK, this, () => {
            Tape.ToastManager.showToast(new ui.test_toastUI);
            // Tape.ToastManager.hideAll();
        });
        this.contentView.popToTop.on(Laya.Event.CLICK, this, () => {
            this.popToTop();
        });
        this.contentView.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
    }

}