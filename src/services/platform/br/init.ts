import { IInit } from "../interfaces";
import { setNavigatorReady } from "../../navigator/init";

class BrInit implements IInit {

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

export const brInit = new BrInit;