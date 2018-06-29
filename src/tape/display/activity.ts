module Tape {


    /** Activity */
    export abstract class Activity extends Laya.Component {

        /** page type */
        public readonly page: any = null;
        /** params */
        public readonly params: Object = {};
        /** res */
        public res: ResourceOptions[] = [];
        /** turn on and off animation */
        public inEaseDuration: number = 0;
        public inEase: Function = null;
        public inEaseFromProps: Object = null;
        public inEaseToProps: Object = null;

        public onCreate?(): void;
        public onResume?(): void;
        public onPause?(): void;
        public onDestroy?(): void;
        public onNextProgress?(progress): void;

        constructor(options: ActivityOptions) {
            super();
            this.params = (<any>Object).assign({}, options.params || {});
            this.page = options.page;
        }

        public onLoadRes(onLoaded: Function, onLoadProgress: Function) {
            let res = this.res || [];
            if (res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(this, onLoaded), Laya.Handler.create(this, onLoadProgress, null, false));
            } else {
                onLoaded();
            }
        }

        //////////////////////////
        /// navigator function
        //////////////////////////

        protected redirectTo(page, params: Object = {}) {
            this.navigate(page, params, () => {
                this.back();
            });
        }

        protected navigate(page, params: Object = {}, action: Function = null) {
            NavigatorStack.navigate(page, params, action);
        }

        protected back() {
            NavigatorStack.finish(this.page, this);
        }

        protected finish(page) {
            NavigatorStack.finish(page);
        }

        protected pop(number?: number) {
            NavigatorStack.pop(number);
        }

        protected popToTop() {
            NavigatorStack.popToTop();
        }

    }

}