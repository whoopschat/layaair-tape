// 程序入口
class GameMain {
    constructor() {
        Tape.init(600, 400);
        let routes = {
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