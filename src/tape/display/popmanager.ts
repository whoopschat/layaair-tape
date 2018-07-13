module Tape {

    export module PopManager {

        let pops: any = {};
        let onhides: any = {};

        function registerOnHide(pop, onHide) {
            if (!onHide || typeof onHide !== 'function') {
                return;
            }
            let arr = onhides[pop];
            if (arr) {
                arr.push(onHide);
            } else {
                onhides[pop] = [onHide];
            }
        }

        function callOnHide(pop) {
            let arr = onhides[pop];
            if (arr && arr.length > 0) {
                arr.forEach(element => {
                    element && element(pop);
                });
                arr.splice(0, arr.length);
            }
        }

        export function showPop(pop: any, params = null, onHide: Function = null): void {
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
            UIManager.addPopUI(view);
            registerOnHide(pop, onHide);
        }

        export function hidePop(pop: any): void {
            var view = pops[pop];
            if (view) {
                view.onHide && view.onHide();
                view.removeSelf && view.removeSelf();
                delete pops[pop];
            }
            callOnHide(pop);
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