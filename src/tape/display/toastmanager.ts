module Tape {

    export module ToastManager {

        let _toasts = [];

        export function showToast(toast, params = null, onHide = null) {
            var toastView = new toast;
            toastView._on_hide = onHide;
            toastView.toast = toast;
            toastView.params = params || {};
            let from = toastView.fromProps || { alpha: 0 };
            let to = toastView.toProps || { alpha: 1 };
            let duration = toastView.duration || 800;
            (<any>Object).assign(toastView, from);
            toastView.onShow && toastView.onShow();
            Laya.Tween.to(toastView, to, duration, Laya.Ease.quintOut, null, 0);
            Laya.Tween.to(toastView, from, duration, Laya.Ease.quintOut, Laya.Handler.create(this, () => {
                if (toastView) {
                    _toasts.splice(_toasts.indexOf(toastView), 1);
                    toastView._on_hide && toastView._on_hide(toastView.toast);
                    toastView.onHide && toastView.onHide();
                    toastView.destroy();
                }
            }), duration);
            _toasts.push(toastView);
            UIManager.addTopUI(toastView);
        }

        export function clearAll() {
            let list = _toasts.splice(0, _toasts.length);
            list.forEach(view => {
                view._on_hide && view._on_hide(view.toast);
                view.onHide && view.onHide();
                view.destroy();
            });
        }

    }

}