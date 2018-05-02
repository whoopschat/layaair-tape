// 程序入口
class GameMain {
    constructor() {
        Laya.init(600, 400, Laya.WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT
        // Laya.DebugPanel.init();
        let routes = {
            "Main": App.Main.ROUTE({
                res: [
                    // { url: 'res/sound/bg_sound.mp3', type: Laya.Loader.SOUND }
                ]
            }),
            "Page2": {
                activity: App.Page2
            }
        };
        let options = {
            res: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/config.json', type: Laya.Loader.JSON }
            ]
        };
        var app: any = Tape.createNavigator(routes, "Page2", options);
        Laya.stage.addChild(app);
    }
}
window.onerror = (error) => {
    alert(error)
}
new GameMain();