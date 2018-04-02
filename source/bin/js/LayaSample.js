// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 400);
        var routes = {
            "Main": App.Main.ROUTE(),
            "Page2": {
                activity: App.Page2
            }
        };
        var options = {
            uriProfix: "baidu://elm/",
            fileVersion: "version.json",
            res: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
            ]
        };
        Tape.initApp(routes, "Page2", options);
    }
    return GameMain;
}());
new GameMain();
