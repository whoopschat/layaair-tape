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
        this.ui.btnBanner.on(Laya.Event.CLICK, this, () => {
            Tape.ad.configBannerAd('facebook', '456456456456_456456456456');
            Tape.ad.configBannerAd('wechat', 'adunit-5cf669a77cf5a440');
            Tape.ad.showBannerAd(0, 0, 100, 40, (err) => {
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
        if (focus) {
            Tape.app.showGameClubButton('res/unpack/default_share_img.png', 450, 200, 50, 50)
        } else {
            Tape.app.hideGameClubButton();
        }
    }

}
