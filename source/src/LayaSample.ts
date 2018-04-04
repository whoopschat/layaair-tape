// 程序入口
class GameMain {
    constructor() {
        Laya.init(600, 400);
        let routes = {
            "Main": App.Main.ROUTE({
                res: [
                    { url: 'res/sound/bg_sound.mp3', type: Laya.Loader.SOUND }
                ]
            }),
            "Page2": {
                activity: App.Page2
            }
        };
        let options = {
            uriProfix: "http://m.baidu.com/",
            fileVersion: "version.json",
            res: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
            ]
        };
        Tape.initApp(routes, "Page2", options);
    }
}
new GameMain();