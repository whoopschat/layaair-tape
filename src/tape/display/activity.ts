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

        public onLoad?(): void;
        public onCreate?(): void;
        public onResume?(): void;
        public onPause?(): void;
        public onDestroy?(): void;
        public onNextProgress?(progress): void;

        constructor(options: LoaderOptions) {
            super();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this.params = (<any>Object).assign({}, options.params || {});
            this.page = options.page;
            this.onLoad && this.onLoad();
            setTimeout(() => {
                let res = this.res || [];
                if (res.length > 0) {
                    Laya.loader.load(res, Laya.Handler.create(this, () => {
                        options.onLoaded && options.onLoaded(this);
                    }), Laya.Handler.create(this, (progress) => {
                        options.onLoadProgress && options.onLoadProgress(progress);
                    }, null, false));
                } else {
                    options.onLoaded && options.onLoaded();
                }
            }, 0);
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