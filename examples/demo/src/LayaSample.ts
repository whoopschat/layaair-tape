// 程序入口
class GameMain {
    constructor() {
        Tape.init(600, 400);
        Tape.bg.setBgColor('#3399ff');
        Laya.Stat.show();

        // config ad for wechat
        Tape.ad.configBannerAd('wechat', 'adunit-5cf669a77cf5a440');
        Tape.ad.configRewardedVideoAd('wechat', 'adunit-5cf669a77cf5a440');
        // config ad for facebook
        Tape.ad.configBannerAd('facebook', '456456456456_456456456456');
        Tape.ad.configRewardedVideoAd('facebook', '456456456456_456456456456');

        Tape.start({
            mainPage: LoadingActivity,
            commonRes: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/1.jpg', type: Laya.Loader.IMAGE },
                { url: 'res/2.jpg', type: Laya.Loader.IMAGE },
                { url: 'res/3.jpg', type: Laya.Loader.IMAGE },
            ]
        });
    }
}

new GameMain();
