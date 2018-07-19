module Tape {

    export class PopView extends Laya.Sprite {

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

        public constructor() {
            super();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            setTimeout(() => {
                if (!this.isTranslucent) {
                    var bg: Laya.Sprite = new Laya.Sprite();
                    bg.graphics.save();
                    bg.alpha = this.bgAlpha;
                    bg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, this.bgColor);
                    bg.graphics.restore();
                    bg.width = Laya.stage.width;
                    bg.height = Laya.stage.height;
                    bg.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
                        if (this.canceledOnTouchOutside) {
                            this.finish();
                        }
                        e.stopPropagation();
                    });
                    if (this.canceledOnTouchOutside && this.ui) {
                        this.ui.mouseThrough = true;
                    }
                    this.addChildAt(bg, 0);
                }
            }, 0);
        }

        protected finish() {
            PopManager.hidePop(this.pop);
        }

    }

}