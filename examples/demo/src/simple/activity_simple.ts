class SimpleActivity extends Tape.Activity {

    ui = new ui.page.simpleUI;

    onCreate() {
        this.ui.btnNavigate.on(Laya.Event.CLICK, this, () => {
            this.navigate(Page1Activity);
        });
        this.ui.btnNavigate2.on(Laya.Event.CLICK, this, () => {
            this.navigate(Page2Activity);
        });
        this.ui.btnToast.on(Laya.Event.CLICK, this, () => {
            TestToast.show();
        });
        this.ui.btnPopup.on(Laya.Event.CLICK, this, () => {
            TestPop.show();
        });
        this.ui.btnQuit.on(Laya.Event.CLICK, this, () => {
            Tape.exit();
        });
        this.ui.btnRank.on(Laya.Event.CLICK, this, () => {
            RankActivity.open();
        });
        this.ui.btnShare.on(Laya.Event.CLICK, this, () => {
            Tape.app.shareAsync({
                intent: 'SHARE',
                text: '快来一起玩游戏吧',
                image: 'res/atlas/comp.png',
                data: {
                    name: '111',
                    value: '222'
                }
            });
        });
        Tape.app.onPause(() => {
            this.ui.output.text = 'onPause --------------------';
        });
        Tape.app.onLaunch((options) => {
            this.ui.output.text = `onLaunch --------------------\n${JSON.stringify(options)}`;
        });
    }

    onFocus(focus) {
        console.log('PageActivity onFocus ---------------------------------', focus);
    }

}
