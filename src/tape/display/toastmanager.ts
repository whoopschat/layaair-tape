module Tape {

    export module ToastManager {

        let _toast_list_ = [];

        export function showToast(view, duration: number = 500, fromProps = null, toProps = null) {
            let from = fromProps || { alpha: 0 };
            let to = toProps || { alpha: 1 };
            (<any>Object).assign(view, from);
            Laya.Tween.to(view, to, duration, Laya.Ease.quintOut, null, 0);
            Laya.Tween.to(view, from, duration, Laya.Ease.quintOut, Laya.Handler.create(this, () => {
                _toast_list_.splice(_toast_list_.indexOf(view), 1);
                view.destroy();
            }), duration);
            UIManager.addTopUI(view);
            _toast_list_.push(view);
        }

        export function hideAll() {
            let list = _toast_list_.splice(0, _toast_list_.length);
            list.forEach(view => {
                view.destroy();
            });
        }


    }

}