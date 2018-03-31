// 程序入口
class GameMain {
    constructor() {
        Laya.init(600, 400);
        let routes = {
            "Main": {
                activity: App.Main
            },
            "Page2": {
                activity: App.Page2
            }
        };
        let staticRes = [
            { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
        ];
        let options = {
            uriProfix: "baidu://elm/"
        };
        Topspeed.initRouter(routes, "Page2", staticRes, options);
    }
}
new GameMain();