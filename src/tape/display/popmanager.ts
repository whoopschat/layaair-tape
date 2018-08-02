module Tape {

    export module PopManager {

        let pops: any = {};

        export function showPop(pop: any, params = null): void {
            var view = pops[pop];
            if (view) {
                view.pop = pop;
                view.params = params || {};
            } else {
                view = new pop();
                view.pop = pop;
                view.params = params || {};
                pops[pop] = view;
            }
            view.onShow && view.onShow();
            UILayerManager.addPopUI(view);
        }

        export function hidePop(pop: any): void {
            var view = pops[pop];
            if (view) {
                view.onHide && view.onHide();
                view.removeSelf && view.removeSelf();
            }
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