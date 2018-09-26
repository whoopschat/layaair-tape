import platform from "../../../utils/platform";
import { IInitialize } from "../interfaces";
import { setNavigatorReady } from "../../navigator/init";

let _isLoaded = false;
let _percentage = 0;

function runMockLoading() {
    if (_isLoaded) {
        return;
    }
    _percentage += 1;
    if (_percentage > 99) {
        _percentage = 99;
    } else {
        setTimeout(runMockLoading, 50);
    }
    platform.execFB('setLoadingProgress', _percentage);
}

class FBPlatform implements IInitialize {

    public start(callback: () => void) {
        runMockLoading();
        platform.execFB('initializeAsync').then(() => {
            callback && callback();
        });
    }

    public exit() {
        platform.execFB('quit');
    }

    public onLoaded() {
        _isLoaded = true;
        platform.execFB('setLoadingProgress', 100);
        platform.execFB('startGameAsync').then(() => {
            setNavigatorReady();
        });
    }

}

export const fbPlatform = new FBPlatform;