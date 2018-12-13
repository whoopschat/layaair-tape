import env from "../../../utils/env";
import { IApp } from "../_inters";

class App implements IApp {

    private _pauseCallback = null;
    private _launchCallback = null;

    constructor() {
        if (!env.isBrowserApp()) {
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
        this._launchCallback && this._launchCallback({
            platform: env.getPlatform(),
            scene: 'other',
            query: {},
        });
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
            platform: env.getPlatform(),
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

export default new App;