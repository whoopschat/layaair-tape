import { IApp } from "../interfaces";
import platform, { BROWSER } from "../../../utils/platform";
import { getEnterSceneForBR, getEnterDataForBR } from "./_data";

class BrApp implements IApp {

    private _pauseCallback = null;
    private _launchCallback = null;

    constructor() {
        if (!platform.isBrowserApp()) {
            return;
        }
        this._init();
    }

    private _init() {
        window.onblur = () => {
            this._pauseCallback && this._pauseCallback();
        }
    }

    private _checkOnLaunch() {
        this._launchCallback && this._launchCallback({ scene: getEnterSceneForBR(), query: getEnterDataForBR(), platform: BROWSER });
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
            platform: BROWSER,
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

export const brApp = new BrApp;