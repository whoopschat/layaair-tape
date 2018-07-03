module Tape {

    export module PopManager {

        let pops: any = {};

        export function showPop(pop: any, data = null): void {
            var view = pops[pop];
            if (view) {
                view.pop = pop;
                view.data = data;
            } else {
                view = new pop();
                view.pop = pop;
                view.data = data;
                pops[pop] = view;
            }
            view.onShow && view.onShow();
            UIManager.addPopUI(view);
        }

        export function hidePop(pop: any): void {
            var view = pops[pop];
            if (view) {
                view.onHide && view.onHide();
                view.removeSelf && view.removeSelf();
                delete pops[pop];
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