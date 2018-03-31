// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 400);
        var routes = {
            "Main": {
                activity: App.Main
            },
            "Page2": {
                activity: App.Page2
            }
        };
        var staticRes = [
            { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
        ];
        var options = {
            uriProfix: "baidu://elm/"
        };
        Topspeed.initRouter(routes, "Page2", staticRes, options);
    }
    return GameMain;
}());
new GameMain();
