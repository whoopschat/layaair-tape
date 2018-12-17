import env from "../../../utils/env";
import { IInit } from "../_inters";
import { setNavigatorReady } from "../../navigator/init";

class Init implements IInit {

    public start(callback: () => void) {
        // if (window.hasOwnProperty('sharedCanvas')) {
        //     var sharedCanvas = window['sharedCanvas'];
        //     sharedCanvas.width = screen.getWidth();
        //     sharedCanvas.height = screen.getHeight();
        // }
        callback && callback();
    }

    public exit() {
        env.execBD('exit');
    }

    public onLoaded() {
        setNavigatorReady();
        // env.postMessageToBDOpenDataContext({
        //     action: "initRank",
        //     data: {
        //         width: screen.getWidth(),
        //         height: screen.getHeight(),
        //         offsetX: screen.getOffestX(),
        //         offsetY: screen.getOffestY(),
        //         designWidth: screen.getDesignWidth(),
        //         designHeight: screen.getDesignHeight(),
        //     }
        // });
    }

    public onLoadProgress(progress) {
    }

}

export default new Init