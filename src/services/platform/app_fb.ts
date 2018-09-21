import platform from "../../utils/platform";
import { IApp } from "./interfaces";
import { convertImgToBase64Async } from "../../utils/image";

class FBApp implements IApp {

    private _launchOptions = null;
    private _launchCallback = null;
    private _pauseCallback = null;

    constructor() {
        if (!platform.isFacebookApp()) {
            return;
        }
        platform.execFB('onPause', () => {
            this._pauseCallback && this._pauseCallback();
            setTimeout(() => {
                this._launchOptions && this._launchCallback && this._launchCallback(this._launchOptions);
            }, 1);
        });
    }

    public shareAsync(options) {

        return convertImgToBase64Async(options.image).then(image => {
            return platform.execFB('shareAsync', Object.assign({}, options, { image }));
        });

    }

    public onShare(callback: () => object) {
        // do nothing
    }

    public onLaunch(callback: (data: object) => void) {
        this._launchCallback = callback;
        platform.execFB('getEntryPointAsync').then((entry) => {
            const query = platform.execFB('getEntryPointData') || {};
            this._launchOptions = { entry, query, platform: 'fb' };
            this._launchCallback && this._launchCallback(this._launchOptions);
        });
    }

    public onPause(callback: () => void) {
        this._pauseCallback = callback;
    }

}

export const fbApp = new FBApp;