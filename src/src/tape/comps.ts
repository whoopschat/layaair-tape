// =========================== //
// tape comp.js
// =========================== //
module Tape {

    /**
     * Dialog
     */
    export class Dialog {

        private static __dialog_manager_instance__ = null;

        private static instance(): Laya.DialogManager {
            if (!this.__dialog_manager_instance__) {
                this.__dialog_manager_instance__ = new Laya.DialogManager();
            }
            return this.__dialog_manager_instance__;
        }

        public static showDialog(dialog: Laya.Dialog, onOpened: Function = null, onClosed: Function = null) {
            this.closeDialog();
            dialog.onClosed = (type) => {
                onClosed && onClosed(type);
            };
            dialog.onOpened = () => {
                onOpened && onOpened();
            };
            this.instance().open(new ui.DialogViewUI(), true, true);
        }

        public static closeDialog() {
            this.instance().closeAll();
        }

        public static showLockView(lockView) {
            this.instance().setLockView(lockView);
            this.instance().lock(true);
        }

        public static closeLockView() {
            this.instance().lock(false);
        }
    }

    /**
     * Toast
     */
    export class Toast {

        private static __toast_group__: Object = {};

        public static showToast(view, duration: number = 500, previousHnadler: Function = null) {
            if (view && !view.parent) {
                let type = view.name || '_default_toast';
                if (!this.__toast_group__.hasOwnProperty(type)) {
                    this.__toast_group__[type] = new Array();
                }
                const list = this.__toast_group__[type];
                view.alpha = 0;
                view.zOrder = 99999;
                Laya.Tween.to(view, { alpha: 1 }, duration, Laya.Ease.quintOut, null, 0);
                Laya.Tween.to(view, { alpha: 0 }, duration, Laya.Ease.quintOut, Laya.Handler.create(this, () => {
                    list.splice(list.indexOf(view), 1);
                    view.removeSelf();
                }), duration);
                Laya.stage.addChild(view);
                for (var i in list) {
                    if (list[i]) {
                        if (previousHnadler) {
                            previousHnadler(list[i]);
                        } else {
                            list[i].visible = false;
                        }
                    }
                }
                list.push(view);
            }
        }

    }

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

        public readonly routeName: string = "";
        public readonly routeKey: string = "";
        public readonly params: Object = {};
        protected inEase: Function = Laya.Ease.linearIn;
        protected inEaseDuration: number = 300;

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

        protected printLog(message: any, ...optionalParams: any[]) {
            Tape.Logger.log(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

        protected printError(message: any, ...optionalParams: any[]) {
            Tape.Logger.error(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

        protected printInfo(message: any, ...optionalParams: any[]) {
            Tape.Logger.info(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

        protected printWarn(message: any, ...optionalParams: any[]) {
            Tape.Logger.warn(" ------ " + this.routeName + "  ------ :", message, ...optionalParams);
        }

        protected printDebug(message: any, ...optionalParams: any[]) {
            Tape.Logger.debug(" ------ " + this.routeName + " ------ :", message, ...optionalParams);
        }

    }

}