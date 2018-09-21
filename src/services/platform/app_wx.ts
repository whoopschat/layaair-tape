import platform from "../../utils/platform";
import { IApp } from "./interfaces";

class WXApp implements IApp {

    private _launchOptions = null;
    private _shareCallback = null;
    private _pauseCallback = null;
    private _launchCallback = null;

    constructor() {
        if (!platform.isWechatApp()) {
            return;
        }
        let options = platform.execWX('getLaunchOptionsSync') || {};
        this._launchOptions = { entry: options.scene || 1000, query: options.query || {}, platform: 'wx' };
        platform.execWX('onHide', () => {
            this._pauseCallback && this._pauseCallback();
        });
        platform.execWX('onShow', (options) => {
            this._launchOptions = { entry: options.scene || 1000, query: options.query || {}, platform: 'wx' };
            this._launchCallback && this._launchCallback(this._launchOptions);
        });
        platform.execWX('onShareAppMessage', () => {
            return this._shareCallback ? this._shareCallback() : {};
        });
    }

    public shareAsync(options) {
        return new Promise((resolve, reject) => {
            let query = '';
            if (options.data) {
                query += Object.keys(options.data).map(key => {
                    return `${key}=${options.data[key]}`
                }).join('&');
            }
            platform.execWX('shareAppMessage', {
                title: options.text,
                imageUrl: options.image,
                query: query,
                success: resolve,
                fail: reject,
            });
        });
    }

    public onShare(callback: () => object) {
        this._shareCallback = callback;
    }

    public onLaunch(callback: (data: object) => void) {
        this._launchCallback = callback;
        this._launchOptions && this._launchCallback && this._launchCallback(this._launchOptions);
    }

    public onPause(callback: () => void) {
        this._pauseCallback = callback;
    }

}

export const wxApp = new WXApp;