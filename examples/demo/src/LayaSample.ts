// 程序入口
class GameMain {
    constructor() {
        Tape.init(600, 400);
        Tape.bg.setBgColor('#3399ff');
        Tape.start({
            mainPage: LoadingActivity,
            commonRes: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
            ]
        });
    }
}
window.onerror = (error) => {
    alert(error)
}
new GameMain();
