// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Tape.init(600, 400);
        Tape.setBgColor('#3399ff');
        Tape.Navigator.init({
            mainPage: LoadingActivity,
            commonRes: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/config.json', type: Laya.Loader.JSON }
            ]
        });
        Tape.NavigatorRouter.configRoutes({
            'page/loading/:abc/:ccc/': MainActivity
        });
    }
    return GameMain;
}());
window.onerror = function (error) {
    alert(error);
};
new GameMain();
