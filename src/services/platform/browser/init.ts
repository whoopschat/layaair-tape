import { IInit } from "../interfaces";
import { setNavigatorReady } from "../../navigator/init";

class BrowserInit implements IInit {

    public start(callback: () => void) {
        callback && callback();
    }

    public exit() {
    }

    public onLoaded() {
        setNavigatorReady();
    }

    public onLoadProgress(progress) {
    }

}

export const browserInit = new BrowserInit;