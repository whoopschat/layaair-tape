import platform from "../../../utils/platform";
import sharemanager from "../common/share";
import { IApp } from "../interfaces";

class ConchApp implements IApp {

    constructor() {
        if (!platform.isConchApp()) {
            return;
        }
    }

    public shareAsync(tag, options) {
        return new Promise((resolve, _reject) => {
            let share = Object.assign({}, sharemanager.getShareOptions(tag) || {}, options)
            Laya.conchMarket.enterShareAndFeed(JSON.stringify(share), resolve);
        });
    }

    public configShare(title: string, image: string, configs?: object[]) {
        sharemanager.configShare(title, image, configs);
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