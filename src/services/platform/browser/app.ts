import { IApp } from "../interfaces";
import platform, { BROWSER } from "../../../utils/platform";
import { getStorageData, setStorageData } from "../../../utils/storage";

function _getQueryParams() {
    var queryStr = window.location.search.substring(1);
    let query = {};
    var vars = queryStr.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair.length > 1) {
            query[pair[0]] = decodeURIComponent(pair[1]);
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

    private _checkOnLaunch() {
        this._launchCallback && this._launchCallback({ scene: '', query: _getQueryParams(), platform: 'browser' });
    }

    public onLaunch(callback: (data: object) => void) {
        this._launchCallback = callback;
        this._checkOnLaunch();
    }

    public onPause(callback: () => void) {
        this._pauseCallback = callback;
    }

    public getUserInfo(callback: (userinfo) => void) {
        let user = JSON.parse(_getQueryParams()['user'] || '{}');
        let id = user['id'] || getStorageData('id', '-');
        let nickname = user['nick'] || getStorageData('nick', '-');
        let avatarUrl = user['avatar'] || getStorageData('avatar', '-');
        let gender = user['gender'] || getStorageData('gender', 0);
        let language = user['language'] || getStorageData('language', '-');
        setStorageData('id', id);
        setStorageData('nick', nickname);
        setStorageData('avatar', avatarUrl);
        setStorageData('language', language);
        setStorageData('gender', gender);
        callback && callback({
            platform: BROWSER,
            playerId: id,
            nickname: nickname,
            avatarUrl: avatarUrl,
            city: '-',
            country: '-',
            province: '-',
            gender: Number(gender),
            language: language,
            raw: JSON.stringify(user),
        });
    }

}

export const browserApp = new BrowserApp;