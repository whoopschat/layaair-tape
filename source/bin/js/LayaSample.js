// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(600, 400, Laya.WebGL);
        var routes = {
            "Main": App.Main.ROUTE({
                res: [
                    { url: 'res/sound/bg_sound.mp3', type: Laya.Loader.SOUND }
                ]
            }),
            "Page2": {
                activity: App.Page2
            }
        };
        var options = {
            uriProfix: "http://m.baidu.com/",
            fileVersion: "version.json",
            res: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
            ]
        };
        var app = Tape.createApp(routes, "Page2", options);
        Tape.WeChat.init('wxaf6906f92799e750', function (wechatCode) {
            alert(wechatCode);
        });
        Laya.stage.addChild(app);
    }
    return GameMain;
}());
new GameMain();
