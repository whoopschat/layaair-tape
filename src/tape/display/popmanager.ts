module Tape {

    export module PopManager {

        let pops: any = {};

        export function showPop(pop: any, params = null, onHide = null): void {
            var view = pops[pop];
            if (view) {
                view.pop = pop;
                view.params = params || {};
                view._on_hide = onHide;
            } else {
                view = new pop();
                view.pop = pop;
                view.params = params || {};
                view._on_hide = onHide;
                pops[pop] = view;
            }
            view.onShow && view.onShow();
            UIManager.addPopUI(view);
        }

        export function hidePop(pop: any): void {
            var view = pops[pop];
            if (view) {
                view._on_hide && view._on_hide(view.pop);
                view.onHide && view.onHide();
                view.removeSelf && view.removeSelf();
            }
            UIManager.refreshFocus();
        }

        export function refreshPos(): void {
            for (var str in pops) {
                var view = pops[str];
                if (view) {
                    view.resize && view.resize();
                }
            }
        }

    }

}