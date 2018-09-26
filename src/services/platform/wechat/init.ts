import platform from "../../../utils/platform";
import screen from "../../manager/screen";
import { IInitialize } from "../interfaces";
import { setNavigatorReady } from "../../navigator/init";

class WXPlatform implements IInitialize {

    start(callback: () => void) {
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
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
                width: Laya.stage.width,
                height: Laya.stage.height,
                offsetX: screen.getOffestX(),
                offsetY: screen.getOffestY(),
                designWidth: screen.getDesignWidth(),
                designHeight: screen.getDesignHeight(),
            }
        });
    }

}

export const wxPlatform = new WXPlatform;