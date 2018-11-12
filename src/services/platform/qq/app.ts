import { IApp } from "../interfaces";
import platform, { QQ } from "../../../utils/platform";
import { getEnterSceneForQQ, getEnterDataForQQ } from "./_data";

class QQApp implements IApp {

    private _pauseCallback = null;
    private _launchCallback = null;

    constructor() {
        if (!platform.isQQApp()) {
            return;
        }
        this._init();
    }

    private _init() {
        platform.execQQ('onEnterForeground', () => {
            this._launchCallback && this._launchCallback({ scene: getEnterSceneForQQ(), query: getEnterDataForQQ(), platform: QQ });
        });
        platform.execQQ('onEnterBackground', () => {
            this._pauseCallback && this._pauseCallback();
        });
    }

    private _checkOnLaunch() {
        this._launchCallback && this._launchCallback({ scene: getEnterSceneForQQ(), query: getEnterDataForQQ(), platform: QQ });
    }

    public onLaunch(callback: (data: object) => void) {
        this._launchCallback = callback;
        this._checkOnLaunch();
    }

    public onPause(callback: () => void) {
        this._pauseCallback = callback;
    }

    public getUserInfo(callback: (userinfo) => void) {
        callback && callback({
            platform: QQ,
            playerId: '-',
            nickname: '-',
            avatarUrl: '-',
            city: '-',
            country: '-',
            province: '-',
            gender: 0,
            language: '-',
            raw: null,
        });
    }

}

export const qqApp = new QQApp;