import platform from "../../../utils/platform";
import screen from "../../manager/screen";
import { IInit } from "../interfaces";
import { setNavigatorReady } from "../../navigator/init";

class WXInit implements IInit {

    start(callback: () => void) {
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            sharedCanvas.width = screen.getWidth();
            sharedCanvas.height = screen.getHeight();
        }
        callback && callback();
    }

    exit() {
        platform.execWX('exitMiniProgram');
    }

    onLoaded() {
        setNavigatorReady();
        platform.postMessageToWXOpenDataContext({
            action: "initRank",
            data: {
                width: screen.getWidth(),
                height: screen.getHeight(),
                offsetX: screen.getOffestX(),
                offsetY: screen.getOffestY(),
                designWidth: screen.getDesignWidth(),
                designHeight: screen.getDesignHeight(),
            }
        });
    }

    public onLoadProgress(progress) {
    }

}

export const wxInit = new WXInit;