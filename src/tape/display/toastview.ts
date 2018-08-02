module Tape {

    export class ToastView extends Laya.Sprite {

        static show(params?: any) {
            ToastManager.showToast(this, params);
        }

        public toast: any;
        public params: any;
        public duration: number = 800;
        public fromProps: Object = null;
        public toProps: Object = null;

        public onShow?(): void;
        public onHide?(): void;

        protected set ui(view) {
            this.removeChildren();
            view.name = '_contentView';
            this.addChild(view);
        }

        protected get ui(): any {
            return this.getChildByName('_contentView');
        }

        constructor() {
            super();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
        }

    }

}