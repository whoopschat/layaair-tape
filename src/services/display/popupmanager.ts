import UIMgr from "../manager/uimgr";

let _popups = {};

function _showAnimPopup(popupView, cb) {
    let from = popupView.fromProps || { alpha: 0 };
    let to = popupView.toProps || { alpha: 1 };
    let easeIn = popupView.easeIn || Laya.Ease.linearIn;
    let duration = popupView.duration || 500;
    Object.assign(popupView, from);
    Laya.Tween.to(popupView, to, duration, easeIn, Laya.Handler.create(this, () => {
        cb && cb(popupView);
    }));
}

function _hideAnimPopup(popupView, cb) {
    let from = popupView.fromProps || { alpha: 0 };
    let to = popupView.toProps || { alpha: 1 };
    let easeOut = popupView.easeOut || Laya.Ease.linearOut;
    let duration = popupView.duration || 500;
    Object.assign(popupView, to);
    Laya.Tween.to(popupView, from, duration, easeOut, Laya.Handler.create(this, () => {
        cb && cb(popupView);
    }));
}

function showPopup(popup, params = null, onHide = null) {
    let views = _popups[popup];
    let view = new popup();
    view.popup = popup;
    view.params = params || {};
    view._onHide = onHide;
    if (views) {
        views.push(view);
    } else {
        _popups[popup] = [view];
    }
    UIMgr.addMainLayer(view);
    view.onShow && view.onShow();
    _showAnimPopup(view, () => {
        view.isShow = true;
    });
}

function hidePopup(popup, view = null, result = null) {
    var views = _popups[popup];
    if (view) {
        let index = views ? views.indexOf(view) : -1;
        if (index < 0) {
            return;
        }
        views.splice(index, 1);
        view._onHide && view._onHide(view.popup, result);
        view.onHide && view.onHide(view.popup, result);
        view.removeSelf && view.removeSelf();
        view.destroy && view.destroy();
        UIMgr.checkFocus();
    } else {
        views && views.splice(0, views.length).forEach(v => {
            _hideAnimPopup(v, () => {
                v._onHide && v._onHide(v.popup, result);
                v.onHide && v.onHide(v.popup, result);
                v.removeSelf && v.removeSelf();
                v.destroy && v.destroy();
                UIMgr.checkFocus();
            })
        });
    }
}

export default {
    showPopup,
    hidePopup
}