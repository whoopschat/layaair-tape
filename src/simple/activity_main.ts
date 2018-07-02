class MainActivity extends Tape.Activity {

    private page1 = new ui.main_actiUI();

    public inEase = Laya.Ease.linearIn;
    public inEaseDuration = 300;
    public inEaseFromProps = {
        y: Laya.stage.height
    }
    public inEaseToProps = {
        y: 0
    }

    public onLoad() {
    }

    public onCreate() {
        this.setContentView(new ui.main_actiUI);
        let view = this.view as ui.main_actiUI;
        view.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(PageActivity);
        });
        view.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
    }

}