class MainActivity extends Tape.Activity {

    private page1 = new ui.main_actiUI();

    public onCreate() {
        this.addChild(this.page1);
        this.inEase = Laya.Ease.linearIn;
        this.inEaseDuration = 300;
        this.inEaseFromProps = {
            y: this.height
        }
        this.inEaseToProps = {
            y: 0
        }
        this.page1.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(PageActivity);
        });
        this.page1.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
    }

}