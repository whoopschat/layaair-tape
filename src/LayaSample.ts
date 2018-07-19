// 程序入口
class GameMain {
    constructor() {
        Tape.init(600, 400);
        //调用DebugPanel调试面板
        Laya.Stat.show();
        Tape.setBgColor('#3399ff');
        Tape.Navigator.init({
            mainPage: LoadingActivity,
            commonRes: [
            ]
        });
        Tape.NavigatorRouter.configRoutes({
            'page/loading/:abc/:ccc/': MainActivity
        });
    }
}
window.onerror = (error) => {
    alert(error)
}
new GameMain();