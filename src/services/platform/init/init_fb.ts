import env from "../../../utils/env";
import { IInit } from "../_inters";
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
    env.execFB('setLoadingProgress', _percentage);
}

class Init implements IInit {

    public start(callback: () => void) {
        runMockLoading();
        env.execFB('initializeAsync').then(() => {
            callback && callback();
        });
    }

    public exit() {
        env.execFB('setSessionData', { message: 'quit game' })
        env.execFB('quit');
    }

    public onLoaded() {
        _isLoaded = true;
        env.execFB('setLoadingProgress', 100);
        env.execFB('startGameAsync').then(() => {
            setNavigatorReady();
        });
    }

    public onLoadProgress(progress) {
    }

}

export default new Init;