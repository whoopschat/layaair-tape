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
        this.pageUI.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
    }

}