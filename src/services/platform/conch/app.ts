import platform from "../../../utils/platform";
import { IApp } from "../interfaces";

class ConchApp implements IApp {

    constructor() {
        if (!platform.isConchApp()) {
            return;
        }
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