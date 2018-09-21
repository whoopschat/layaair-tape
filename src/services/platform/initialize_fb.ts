import Platform from "../../utils/platform";
import { IInitialize } from "./interfaces";

class FBPlatform implements IInitialize {

    start(onReady: () => void) {
        Platform.execFB('initializeAsync').then(() => {
            onReady && onReady();
        });
    }

    exit() {
        Platform.execFB('quit');
    }

    onLoaded() {
        Platform.execFB('startGameAsync');
    }

    setLoadingProgress(percentage: number) {
        Platform.execFB('setLoadingProgress', percentage);
    }

}

export const fbPlatform = new FBPlatform;