// 游戏入口
class GameMain {
    constructor() {
        // 初始化场景
        Tape.init(750, 1334);
        // 设置纯色背景
        // Tape.bg.setBgColor('#3399ff');
        // 设置贴纸背景
        Tape.bg.setBgTexture('res/unpack/bg.png');
        // 开始加载游戏
        Tape.start({
            mainPage: LoadingActivity,
            commonRes: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
            ]
        });
    }
}

new GameMain();
