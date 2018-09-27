import platform from "../../../utils/platform";
import { IApp } from "../interfaces";
import { convertImgToBase64Async } from "../../../utils/image";

class FBApp implements IApp {

    private _launchCallback = null;
    private _pauseCallback = null;

    constructor() {
        if (!platform.isFacebookApp()) {
            return;
        }
        this._init();
    }

    private _init() {
        platform.execFB('onPause', () => {
            this._pauseCallback && this._pauseCallback();
        });
        platform.execFB('player.canSubscribeBotAsync').then(can_subscribe => {
            if (can_subscribe) {
                platform.execFB('player.subscribeBotAsync');
                platform.printDebug('can subscribe bot');
            } else {
                platform.printDebug('not can subscribe bot');
            }
        });
    }

    public shareAsync(options) {
        return convertImgToBase64Async(options.image).then(image => {
            return platform.execFB('shareAsync', Object.assign({}, options, { image, intent: 'SHARE' }));
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
            this._launchCallback && this._launchCallback({ entry, query, platform: 'facebook' });
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