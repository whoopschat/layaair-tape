import { IInit } from "../interfaces";
import { setNavigatorReady } from "../../navigator/init";

class H5Init implements IInit {

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

export const h5Init = new H5Init;