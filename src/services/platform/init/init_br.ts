import env from "../../../utils/env";
import { IInit } from "../_inters";
import { setNavigatorReady } from "../../navigator/init";

class Init implements IInit {

    public start(callback: () => void) {
        callback && callback();
    }

    public exit() {
        env.execBR('conch.exit');
    }

    public onLoaded() {
        setNavigatorReady();
    }

    public onLoadProgress(progress) {
    }

}

export default new Init;