// 程序入口
class GameMain {
    constructor() {
        Tape.init(600, 400);
        Tape.setBgColor('#3399ff');
        Tape.Navigator.init({
            mainPage: LoadingActivity,
            commonRes: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/config.json', type: Laya.Loader.JSON }
            ]
        });
    }
}
window.onerror = (error) => {
    alert(error)
}
new GameMain();