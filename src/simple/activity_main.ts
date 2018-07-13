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

    onCreate() {
        this.contentView = new ui.main_actiUI;
        this.contentView.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(PageActivity);
        });
        this.contentView.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
        console.log(this.params);
    }

}