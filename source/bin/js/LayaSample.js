// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 400, Laya.WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.Stat.show(0, 0);
        var routes = {
            "Main": App.Main.ROUTE({
                res: [
                // { url: 'res/sound/bg_sound.mp3', type: Laya.Loader.SOUND }
                ]
            }),
            "Page2": {
                activity: App.Page2
            }
        };
        var options = {
            res: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/config.json', type: Laya.Loader.JSON }
            ]
        };
        var app = Tape.createNavigator(routes, "Page2", options);
        Laya.stage.addChild(app);
    }
    return GameMain;
}());
window.onerror = function (error) {
    alert(error);
};
new GameMain();
