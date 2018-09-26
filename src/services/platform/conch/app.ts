import { IApp } from "../interfaces";

class ConchApp implements IApp {

    public shareAsync(options) {
        return new Promise((resolve, _reject) => {
            Laya.conchMarket.enterShareAndFeed(JSON.stringify(options), resolve);
        });
    }

    public onShare(callback: () => object) {
        // do nothing
    }

    public getUserInfo(callback: (userinfo) => void) {
        Laya.conchMarket.getUserInfo('{}', (userinfo) => {
            callback && callback(userinfo);
        });
    }

    public onLaunch(callback: (data: object) => void) {
    }

    public onPause(callback: () => void) {
    }

}

export const conchApp = new ConchApp;