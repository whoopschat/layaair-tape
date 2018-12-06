import UIMgr from "../manager/uimgr";
import Activity from "../display/activity";
import { onNavigatorReady } from "./init";

export default class extends Laya.Component {

    private _options = null;
    private _activity: Activity = null;
    private _isShow = false;
    private _isFocus = false;

    constructor(options) {
        super();
        this.visible = false;
        this._options = options;
        let res = this._options.page.res;
        if (res && res.length > 0) {
            Laya.loader.load(res, Laya.Handler.create(this, () => {
                this._newActivity();
                this._onLoaded();
            }), Laya.Handler.create(this, (progress) => {
                this._onLoadProgress(progress);
            }, null, false));
        } else {
            this._newActivity();
            this._onLoaded();
        }
    }

    _newActivity() {
        if (this._activity) {
            return;
        }
        this._activity = new this._options.page({
            page: this._options.page,
            params: this._options.params
        });
        this._options.page.num++;
    }

    _onLoaded() {
        onNavigatorReady().then(() => {
            this._options.onLoaded && this._options.onLoaded(this);
            this.addChild(this._activity);
            this._activity.onCreate && this._activity.onCreate();
            this._options.onShow && this._options.onShow();
        });
    }

    _onLoadProgress(progress) {
        this._options.onLoadProgress && this._options.onLoadProgress(this, progress);
    }

    nextProgress(progress) {
        this._activity.onNextProgress && this._activity.onNextProgress(progress);
    }

    filter(page, activity) {
        if (page === this._options.page) {
            return !activity || activity === this._activity;
        }
        return false;
    }

    show(anim, callback) {
        if (this.visible) {
            return;
        }
        if (this._isShow) {
            return;
        }
        this._isShow = true;
        var easeIn = this._activity.easeIn || Laya.Ease.linearIn;
        var duration = this._activity.duration || 0;
        var fromProps = this._activity.fromProps || {};
        var toProps = this._activity.toProps || {};
        if (anim && easeIn && duration > 0) {
            Object.assign(this, fromProps);
            this._activity.onResume && this._activity.onResume();
            this.visible = true;
            Laya.Tween.to(this, toProps, duration, easeIn, Laya.Handler.create(this, () => {
                callback && callback();
            }));
        } else {
            this._activity.onResume && this._activity.onResume();
            this.visible = true;
            callback && callback();
        }
        UIMgr.checkFocus();
    }

    hide() {
        if (!this.visible) {
            return;
        }
        if (!this._isShow) {
            return;
        }
        this._isShow = false;
        this._activity.onPause && this._activity.onPause();
        this.visible = false;
        this.focus(false);
    }

    exit() {
        this._options.page.num--;
        this._activity.onDestroy && this._activity.onDestroy();
        this.destroy();
    }

    focus(focus) {
        if (this._isFocus === focus) {
            return;
        }
        this._isFocus = focus;
        this._activity.onFocus && this._activity.onFocus(focus);
    }

}