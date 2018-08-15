module Tape {

    export module PopManager {

        let pops: any = {};

        export function showPop(pop: any, params = null, onHide = null): void {
            let views = pops[pop];
            let view = new pop();
            view.pop = pop;
            view.params = params || {};
            view._onHide = onHide;
            if (views) {
                views.push(view);
            } else {
                pops[pop] = [view];
            }
            UIManager.addUI(view);
            view.onShow && view.onShow();
        }

        export function hidePop(pop, view?: any, result?: any): void {
            var views = pops[pop] as Array<any>;
            if (view) {
                let index = views ? views.indexOf(view) : -1;
                if (index < 0) {
                    return;
                }
                views.splice(index, 1);
                view._onHide && view._onHide(view.pop, result);
                view.onHide && view.onHide(view.pop, result);
                view.removeSelf && view.removeSelf();
                view.destroy() && view.destroy();
            } else {
                views && views.splice(0, views.length).forEach(v => {
                    v._onHide && v._onHide(v.pop, result);
                    v.onHide && v.onHide(v.pop, result);
                    v.removeSelf && v.removeSelf();
                    v.destroy() && v.destroy();
                });
            }
            UIManager.refreshFocus();
        }

        export function refreshPos(): void {
            for (var pop in pops) {
                var views = pops[pop];
                views && views.forEach(view => {
                    view.resize && view.resize();
                });
            }
        }

    }

}