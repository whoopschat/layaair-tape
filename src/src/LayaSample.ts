// 程序入口
class GameMain {
    constructor() {
        Tape.init(600, 400);
        Tape.MiniShare.showShareMenu({
            title: '这一关太难了，求助',
            query: 'a=1'
        });
        let routes = {
            "Main": App.Main.ROUTE({
                res: [
                    // { url: 'res/sound/bg_sound.mp3', type: Laya.Loader.SOUND }
                ]
            }),
            "Page2": {
                activity: App.Page2
            }
        };
        let options = {
            res: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS },
                { url: 'res/config.json', type: Laya.Loader.JSON }
            ]
        };
        var app: any = Tape.createNavigator(routes, "Page2", options);
        Laya.stage.addChild(app);
    }
}
window.onerror = (error) => {
    alert(error)
}
new GameMain();