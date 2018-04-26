// =========================== //
// tape comp.js
// =========================== //
module Tape {

    /**
     * PropsComponent
     */
    export class PropsComponent extends Laya.Component {
        public readonly props: Object = {};
        constructor(props: Object = {}) {
            super();
            this.props = (<any>Object).assign({}, props);
        }
    }

    /**
     * Activity
     */
    export class Activity extends PropsComponent {

        static ROUTE(options: Object = {}): Object {
            return (<any>Object).assign({}, options, {
                activity: this
            });
        };

        private readonly __dialog_manager__ = new Laya.DialogManager();
        public readonly routeName: string = "";
        public readonly routeKey: string = "";
        public readonly params: Object = {};

        constructor(props: Object = {}) {
            super(props);
            this.params = (<any>Object).assign({}, props['params']);
            this.routeName = props['routeName'] || "";
            this.routeKey = props['routeKey'] || "";
        }

        ///////////////////////
        /// LifeCycle
        ///////////////////////

        protected onCreate() {
        }

        protected onResume() {
        }

        protected onPause() {
        }

        protected onDestroy() {
        }

        protected onNextProgress(progress) {
        }

        ///////////////////////
        /// Dialog
        ///////////////////////

        protected showDialog(dialog: Laya.Dialog) {
            this.__dialog_manager__.open(new ui.DialogViewUI(), true, true);
        }

        protected closeAllDialog() {
            this.__dialog_manager__.closeAll();
        }

        ///////////////////////
        /// Navigator
        ///////////////////////

        protected navigate(name, params: Object = {}, action: Function = null): boolean {
            if (this.props.hasOwnProperty('navigation')) {
                return this.props['navigation'].navigate(name, params, action);
            }
            return false;
        }

        protected deeplink(url, action: Function = null): boolean {
            if (this.props.hasOwnProperty('navigation')) {
                return this.props['navigation'].deeplink(url, action);
            }
            return false;
        }

        protected back() {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finish(this.routeName, this.routeKey);
            }
        }

        protected finish(name) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].finish(name);
            }
        }

        protected pop(number?: Number) {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].pop(number);
            }
        }

        protected popToTop() {
            if (this.props.hasOwnProperty('navigation')) {
                this.props['navigation'].popToTop();
            }
        }

        protected printLog(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.log(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

        protected printError(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.error(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

        protected printInfo(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.info(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

        protected printWarn(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.warn(" ------ " + this.routeName + "  ------ :", message, ...optionalParams);
        }

        protected printDebug(message?: any, ...optionalParams: any[]): void {
            Tape.Logger.debug(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

    }

    /**
     * Toast
     */
    export class Toast {

        private static __toast_object__: Object = {};

        public static show(type: string, view, x: number, y: number, duration: number = 500, pivotX: number = 0.5, pivoxY: number = 0.5): void {
            if (view && view.parent == null) {
                if (!this.__toast_object__.hasOwnProperty(type)) {
                    this.__toast_object__[type] = new Array();
                }
                const list = this.__toast_object__[type];
                view.x = x;
                view.y = y;
                view.alpha = 0;
                view.pivot(view.width * pivotX, view.height * pivoxY);
                this.fadeIn(view, duration, 0);
                this.fadeOut(view, duration, duration, () => {
                    list.splice(list.indexOf(view), 1);
                    view.removeSelf();
                });
                Laya.stage.addChild(view);
                for (var i in list) {
                    if (list[i]) {
                        list[i].y -= list[i].height - 5;
                    }
                }
                list.push(view);
            }
        }

        private static fadeIn(view, duration, delay, complete: Function = null) {
            Laya.Tween.to(view, { alpha: 1 }, duration, Laya.Ease.quintOut, null, delay);
        }

        private static fadeOut(view, duration, delay, complete: Function = null) {
            Laya.Tween.to(view, { alpha: 0 }, duration, Laya.Ease.quintOut, Laya.Handler.create(this, () => {
                complete && complete();
            }), delay);
        }

    }

}