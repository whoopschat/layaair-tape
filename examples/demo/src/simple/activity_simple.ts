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
            Tape.showToast({ title: '金币+50', image: 'res/ic_coin.png', duration: 1500 })
        });
        this.ui.btnModal.on(Laya.Event.CLICK, this, () => {
            Tape.showModal({
                title: '提示',
                content: '你好，请重新登录',
                showCancel: true,
                cancelText: '取消',
                confirmText: '确定',
                success: (res) => {
                    if (res.confirm) {
                        Tape.showToast({ title: '点击确定' })
                    }
                    if (res.cancel) {
                        Tape.showToast({ title: '点击取消', icon: 'error' })
                    }
                }
            })
        });
        this.ui.btnLoading.on(Laya.Event.CLICK, this, () => {
            Tape.showLoading();
            setTimeout(function () {
                Tape.showLoading({ title: '正在获取用户信息' });
            }, 2000);
            setTimeout(function () {
                Tape.hideLoading();
            }, 4000);
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
        this.ui.btnVibrate.on(Laya.Event.CLICK, this, () => {
            Tape.vibrateShort();
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
            Tape.club.showClubButton('res/unpack/default_share_img.png', 450, 200, 50, 50)
        } else {
            Tape.club.hideClubButton();
        }
    }

}
