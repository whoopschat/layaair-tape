// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Tape.init(600, 400);
        Tape.Navigator.init({
            mainPage: App.Main,
            commonRes: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/config.json', type: Laya.Loader.JSON }
            ]
        });
    }
    return GameMain;
}());
window.onerror = function (error) {
    alert(error);
};
new GameMain();
