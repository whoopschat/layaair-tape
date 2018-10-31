import platform, { WECHAT } from "../../../utils/platform";
import { IApp } from "../interfaces";

class WXApp implements IApp {

    private _pauseCallback = null;
    private _launchCallback = null;
    private _userinfoButton = null;

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
            this._launchCallback && this._launchCallback({ scene: `${options.scene || ''}`, query: options.query || {}, platform: WECHAT });
        });
    }

    public onLaunch(callback: (data: object) => void) {
        this._launchCallback = callback;
        this._checkOnLaunch();
    }

    private _checkOnLaunch() {
        let options = platform.execWX('getLaunchOptionsSync') || {};
        this._launchCallback && this._launchCallback({ entry: options.scene || 1000, query: options.query || {}, platform: WECHAT });
    }

    public onPause(callback: () => void) {
        this._pauseCallback = callback;
    }

    public getUserInfo(callback: (userinfo) => void, image = null) {
        let onHandler = (res) => {
            if (res && res.userInfo) {
                callback && callback({
                    platform: WECHAT,
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
            if (this._userinfoButton) {
                this._userinfoButton.style.left = -this._userinfoButton.style.width;
                this._userinfoButton.style.top = -this._userinfoButton.style.height;
                this._userinfoButton.hide();
                this._userinfoButton.destroy();
                this._userinfoButton = null;
            }
        }
        let onFail = () => {
            let systemInfo = platform.execWX('getSystemInfoSync');
            if (!systemInfo) {
                onHandler(null);
                return;
            }
            onHide();
            if (!this._userinfoButton) {
                this._userinfoButton = platform.execWX('createUserInfoButton', {
                    withCredentials: true,
                    type: 'image',
                    image: image || 'res/unpack/get_user_info.png',
                    style: {
                        left: 0,
                        top: 0,
                        width: systemInfo.windowWidth,
                        height: systemInfo.windowHeight
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
        platform.execWX('getUserInfo', {
            withCredentials: true,
            success: onHandler,
            fail: onFail
        });
    }

}

export const wxApp = new WXApp;