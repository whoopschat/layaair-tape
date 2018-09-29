class SimpleActivity extends Tape.Activity {

    ui = new ui.page.simpleUI;

    onCreate() {
        Tape.app.configShare('快来一起玩游戏吧', 'res/atlas/comp.png');
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
            Tape.app.shareAsync('default', {
                data: {
                    name: '111',
                    value: '222'
                }
            });
        });
        this.ui.btnRewardedVideo.on(Laya.Event.CLICK, this, () => {
            Tape.ad.configRewardedVideoAd('facebook', '456456456456_456456456456');
            Tape.ad.configRewardedVideoAd('wechat', 'adunit-5cf669a77cf5a440');
            Tape.ad.watchRewardedVideoAd(() => {
                this.ui.output.text = `onRewarded --------------------`;
            }, () => {
                this.ui.output.text = `onCancel --------------------`;
            }, (err) => {
                this.ui.output.text = `onError --------------------\n${JSON.stringify(err)}`;
            })
        });
        Tape.app.onLaunch((options) => {
            this.ui.output.text = `onLaunch --------------------\n${JSON.stringify(options)}`;
        });
        Tape.app.onPause(() => {
            this.ui.output.text = 'onPause --------------------';
        });
    }

    onFocus(focus) {
        console.log('PageActivity onFocus ---------------------------------', focus);
    }

}
