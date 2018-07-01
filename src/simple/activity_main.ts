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
        this.addChild(this.page1);
        this.page1.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(PageActivity);
        });
        this.page1.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
    }

}