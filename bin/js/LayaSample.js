// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Tape.init(600, 400);
        //调用DebugPanel调试面板
        Laya.DebugPanel.init();
        Tape.setBgColor('#3399ff');
        Tape.Navigator.init({
            mainPage: LoadingActivity,
            commonRes: []
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
