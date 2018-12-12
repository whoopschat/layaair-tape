import env, { BAIDU } from "../../../utils/env";
import { IApp } from "../interfaces";

class App implements IApp {

    private _pauseCallback = null;
    private _launchCallback = null;
    private _userinfoButton = null;

    constructor() {
        if (!env.isWechatApp()) {
            return;
        }
        this._init();
    }

    private _init() {
        env.execBD('onHide', () => {
            this._pauseCallback && this._pauseCallback();
        });
        env.execBD('onShow', (options) => {
            this._launchCallback && this._launchCallback({ scene: `${options.scene || ''}`, query: options.query || {}, platform: BAIDU });
        });
    }

    public onLaunch(callback: (data: object) => void) {
        this._launchCallback = callback;
        this._checkOnLaunch();
    }

    private _checkOnLaunch() {
        let options = env.execBD('getLaunchOptionsSync') || {};
        this._launchCallback && this._launchCallback({ entry: options.scene || 1000, query: options.query || {}, platform: BAIDU });
    }

    public onPause(callback: () => void) {
        this._pauseCallback = callback;
    }

    public getUserInfo(callback: (userinfo) => void, imageUrl = null) {
        let onHandler = (res) => {
            if (res && res.userInfo) {
                callback && callback({
                    platform: BAIDU,
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
            if (this._userinfoButton) {
                this._userinfoButton.style.left = -this._userinfoButton.style.width;
                this._userinfoButton.style.top = -this._userinfoButton.style.height;
                this._userinfoButton.hide();
                this._userinfoButton.destroy();
                this._userinfoButton = null;
            }
        }
        let onFail = () => {
            let systemInfo = env.execBD('getSystemInfoSync');
            if (!systemInfo) {
                onHandler(null);
                return;
            }
            onHide();
            if (!this._userinfoButton) {
                this._userinfoButton = env.execBD('createUserInfoButton', {
                    withCredentials: true,
                    type: 'image',
                    image: imageUrl || 'default_login.png',
                    style: {
                        left: 0,
                        top: 0,
                        width: systemInfo.windowWidth,
                        height: systemInfo.windowHeight,
                    }
                });
            }
            if (this._userinfoButton) {
                this._userinfoButton.onTap((res) => {
                    if (res.errMsg.indexOf(':ok') >= 0) {
                        onHide();
                        onHandler(res);
                    }
                });
                this._userinfoButton.show();
            }
        }
        env.execBD('getUserInfo', {
            withCredentials: true,
            success: onHandler,
            fail: onFail
        });
    }

}

export default new App;