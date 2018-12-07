import { IInit } from "../interfaces";
import { setNavigatorReady } from "../../navigator/init";

class BrInit implements IInit {

    public start(callback: () => void) {
        callback && callback();
    }

    public exit() {
        try {
            if (window && window['conch'] && typeof window['conch']['exit'] == 'function') {
                window['conch']['exit']();
            }
        } catch (error) {
        }
    }

    public onLoaded() {
        setNavigatorReady();
    }

    public onLoadProgress(progress) {
    }

}

export const brInit = new BrInit;