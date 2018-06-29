// 程序入口
class GameMain {
    constructor() {
        Tape.init(600, 400);
        Tape.Navigator.init({
            mainPage: App.Main,
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