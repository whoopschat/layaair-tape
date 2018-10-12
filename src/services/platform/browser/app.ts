import { IApp } from "../interfaces";
import platform from "../../../utils/platform";


function _getQueryParams() {
    var queryStr = window.location.search.substring(1);
    let query = {};
    var vars = queryStr.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair.length > 1) {
            query[pair[0]] = pair[1];
        }
    }
    return query;
}

class BrowserApp implements IApp {

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

    public getUserInfo(callback: (userinfo) => void) {
        callback && callback(null);
    }

    public onLaunch(callback: (data: object) => void) {
        this._launchCallback = callback;
        this._checkOnLaunch();
    }

    private _checkOnLaunch() {
        this._launchCallback && this._launchCallback({ entry: 1000, query: _getQueryParams(), platform: 'browser' });
    }

    public onPause(callback: () => void) {
        this._pauseCallback = callback;
    }

}

export const browserApp = new BrowserApp;