import platform from "../../../utils/platform";
import { IApp } from "../interfaces";

class WXApp implements IApp {

    private _shareCallback = null;
    private _pauseCallback = null;
    private _launchCallback = null;
    private _userButton = null;

    constructor() {
        if (!platform.isWechatApp()) {
            return;
        }
        this._init();
    }

    private _init() {
        platform.execWX('onHide', () => {
            this._pauseCallback && this._pauseCallback();
        });
        platform.execWX('onShow', (options) => {
            this._launchCallback && this._launchCallback({ entry: options.scene || 1000, query: options.query || {}, platform: 'wechat' });
        });
        platform.execWX('showShareMenu', {
            withShareTicket: true
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

    public getUserInfo(callback: (userinfo) => void) {
        let onHandler = (res) => {
            if (res && res.userInfo) {
                callback && callback({
                    platform: 'wechat',
                    playerId: '-',
                    avatarUrl: res.userInfo.avatarUrl,
                    nickname: res.userInfo.nickName,
                    city: res.userInfo.city,
                    country: res.userInfo.country,
                    province: res.userInfo.province,
                    gender: res.userInfo.gender,
                    language: res.userInfo.language,
                    raw: res
                });
            } else {
                callback && callback(null);
            }
        }
        let onHide = () => {
            if (this._userButton) {
                this._userButton.style.left = -this._userButton.style.width;
                this._userButton.style.top = -this._userButton.style.height;
                this._userButton.hide();
                this._userButton.destroy();
                this._userButton = null;
            }
        }
        let onFail = () => {
            let systemInfo = platform.execWX('getSystemInfoSync');
            if (!systemInfo) {
                onHandler(null);
                return;
            }
            onHide();
            if (!this._userButton) {
                this._userButton = platform.execWX('createUserInfoButton', {
                    withCredentials: true,
                    type: 'image',
                    image: 'res/unpack/get_user_info.png',
                    style: {
                        left: 0,
                        top: 0,
                        width: systemInfo.windowWidth,
                        height: systemInfo.windowHeight
                    }
                });
            }
            if (this._userButton) {
                this._userButton.onTap((res) => {
                    if (res.errMsg.indexOf(':ok') >= 0) {
                        onHide();
                        onHandler(res);
                    }
                });
                this._userButton.show();
            }
        }
        platform.execWX('getUserInfo', {
            withCredentials: true,
            success: onHandler,
            fail: onFail
        });
    }

    public onLaunch(callback: (data: object) => void) {
        this._launchCallback = callback;
        this._checkOnLaunch();
    }

    private _checkOnLaunch() {
        let options = platform.execWX('getLaunchOptionsSync') || {};
        this._launchCallback && this._launchCallback({ entry: options.scene || 1000, query: options.query || {}, platform: 'wechat' });
    }

    public onPause(callback: () => void) {
        this._pauseCallback = callback;
    }

}

export const wxApp = new WXApp;