import platform from "../../utils/platform";
import screen from "../manager/screen";
import { IInitialize } from "./interfaces";

class WXPlatform implements IInitialize {

    start(onReady: () => void) {
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
        }
        onReady && onReady();
    }

    exit() {
        platform.execWX('exitMiniProgram');
    }

    onLoaded() {
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

    setLoadingProgress(percentage: number) {
        // do nothing
    }

}

export const wxPlatform = new WXPlatform;