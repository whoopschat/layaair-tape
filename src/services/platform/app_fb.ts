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

    public getUserInfo(callback: (userinfo) => void) {
        callback && callback({
            platform: 'facebook',
            playerId: platform.execFB('player.getID'),
            nickname: platform.execFB('player.getName'),
            avatarUrl: platform.execFB('player.getPhoto'),
            city: '-',
            country: '-',
            province: '-',
            gender: 0,
            language: platform.execFB('getLocale'),
            raw: null,
        });
    }

    private _checkOnLaunch() {
        platform.execFB('getEntryPointAsync').then(entry => {
            let query = platform.execFB('getEntryPointData') || {};
            this._launchOptions = { entry, query, platform: 'facebook' };
            this._launchCallback && this._launchCallback(this._launchOptions);
        });
    }

    public onLaunch(callback: (data: object) => void) {
        this._launchCallback = callback;
        this._checkOnLaunch();
    }

    public onPause(callback: () => void) {
        this._pauseCallback = callback;
    }

}

export const fbApp = new FBApp;