import platform from "../../../utils/platform";
import { IInit } from "../interfaces";
import { setNavigatorReady } from "../../navigator/init";

class ConchInit implements IInit {

    public start(callback: () => void) {
        callback && callback();
    }

    public exit() {
        platform.execConch('exit');
    }

    public onLoaded() {
        setNavigatorReady();
    }

    public onLoadProgress(progress) {

    }

}

export const conchInit = new ConchInit;