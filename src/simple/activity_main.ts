class MainActivity extends Tape.Activity {

    ui = new ui.main_actiUI();

    onCreate() {
        this.inEase = Laya.Ease.linearIn;
        this.inEaseDuration = 300;
        this.inEaseFromProps = {
            y: Laya.stage.height
        };
        this.inEaseToProps = {
            y: 0
        };
        console.log('MainActivity onCreate');
        this.ui.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(PageActivity);
        });
        this.ui.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
        console.log(this.params);
    }

}