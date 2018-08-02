module Tape {

    export class PopView extends Laya.Sprite {

        static show(params = null) {
            PopManager.showPop(this, params);
        }

        static hide() {
            PopManager.hidePop(this);
        }

        public pop: any;
        public params: any;
        public bgAlpha: number = 0.5;
        public bgColor: string = '#000000';
        public isTranslucent: boolean = false;
        public canceledOnTouchOutside: boolean = false;

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

        protected initBackground() {
            if (this.isTranslucent) {
                return;
            }
            let bgSprite = new Laya.Sprite();
            bgSprite.alpha = this.bgAlpha;
            bgSprite.graphics.clear();
            bgSprite.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, this.bgColor);
            bgSprite.x = -Screen.getOffestX();
            bgSprite.y = -Screen.getOffestY();
            bgSprite.width = Laya.stage.width;
            bgSprite.height = Laya.stage.height;
            bgSprite.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
                if (this.canceledOnTouchOutside) {
                    this.finish();
                }
                e.stopPropagation();
            });
            if (this.canceledOnTouchOutside && this.ui) {
                this.ui.mouseThrough = true;
            }
            this.addChildAt(bgSprite, 0);
        }

        protected finish() {
            PopManager.hidePop(this.pop);
        }

        constructor() {
            super();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            setTimeout(this.initBackground, 0);
        }

    }

}