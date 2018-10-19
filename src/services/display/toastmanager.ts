import UIMgr from "../manager/uimgr";

let _toasts: { [key: string]: any[] } = {};

function _pushToast(toast, view) {
    if (_toasts[toast]) {
        _toasts[toast].push(view);
    } else {
        _toasts[toast] = [view];
    }
}

function _popToast(toast, view) {
    if (!_toasts[toast]) {
        return [];
    }
    if (view && _toasts[toast].length > 1) {
        _toasts[toast].splice(_toasts[toast].indexOf(view), 1);
        return [view];
    } else {
        let views = _toasts[toast] || [];
        delete _toasts[toast];
        return views;
    }
}

function showToast(toast, params = null, onHide = null) {
    var view = new toast;
    view._on_hide = onHide;
    view.toast = toast;
    view.params = params || {};
    let from = view.fromProps || { alpha: 0 };
    let to = view.toProps || { alpha: 1 };
    let easeIn = view.easeIn || Laya.Ease.linearIn;
    let easeOut = view.easeOut || Laya.Ease.linearOut;
    let duration = view.duration || 500;
    let displayDuration = view.displayDuration || 1000;
    Object.assign(view, from);
    Laya.Tween.to(view, to, duration, easeIn, Laya.Handler.create(this, () => {
        view.onShow && view.onShow();
    }), 0);
    Laya.Tween.to(view, from, duration, easeOut, Laya.Handler.create(this, () => {
        if (view) {
            _popToast(toast, view);
            view._on_hide && view._on_hide(view.toast);
            view.onHide && view.onHide();
            view.destroy();
        }
    }), displayDuration + duration);
    _pushToast(toast, view);
    UIMgr.addTopLayer(view);
}

function hideToast(toast, view = null) {
    let list = _popToast(toast, view);
    list.forEach(view => {
        view._on_hide && view._on_hide(view.toast);
        view.onHide && view.onHide();
        view.destroy();
    });
}

export default {
    showToast,
    hideToast,
}