// 程序入口
class GameMain {
    constructor() {
        Tape.init(600, 400);
        Tape.bg.setBgColor('#3399ff');
        Tape.start({
            mainPage: null,
        },() => {
            console.log(' ------------------------- start');
        });
    }
}

new GameMain();
