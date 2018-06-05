// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Tape.init(600, 400);
        Tape.MiniFunc.showShareMenu({});
        var routes = {
            "Main": App.Main.ROUTE({
                res: [
                    { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
                    { url: 'res/config.json', type: Laya.Loader.JSON }
                ]
            }),
            "Page2": App.Page2.ROUTE({
                res: [
                    { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
                    { url: 'res/config.json', type: Laya.Loader.JSON }
                ]
            }),
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
