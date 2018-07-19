module Tape {

    /** Activity */
    export class Activity extends Laya.Component {

        /** res */
        public static res: ResourceOptions[] = [];

        /** page type */
        public page: any = null;
        /** params */
        public params: any = {};
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

        constructor(options: LoaderOptions) {
            super();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this.params = (<any>Object).assign({}, options.params || {});
            this.page = options.page;
        }

        protected set ui(view) {
            view.name = '_contentView';
            this.removeChildren();
            this.addChild(view);
        }

        protected get ui(): any {
            return this.getChildByName('_contentView');
        }

        //////////////////////////
        /// navigator function
        //////////////////////////

        protected redirectTo(page, params: any = {}) {
            this.navigate(page, params, () => {
                this.back();
            });
        }

        protected link(path) {
            NavigatorStack.link(path);
        }

        protected navigate(page, params: any = {}, action: Function = null) {
            NavigatorStack.navigate(page, params, action);
        }

        protected back() {
            NavigatorStack.finish(this.page, this);
        }

        protected finish(page, instance: any = null) {
            NavigatorStack.finish(page, instance);
        }

        protected pop(number?: number) {
            NavigatorStack.pop(number);
        }

        protected popToTop() {
            NavigatorStack.popToTop();
        }

    }

}