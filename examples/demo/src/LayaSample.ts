// 程序入口
class GameMain {
    constructor() {
        Tape.init(600, 400);
        Tape.bg.setBgColor('#3399ff');
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
