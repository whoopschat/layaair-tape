module runtime {

    function center(view) {
        view.x = view.x + view.width / 2 - view.pivotX;
        view.y = view.y + view.height / 2 - view.pivotY;
        view.pivot(view.width / 2, view.height / 2);
    }

    export class btn extends Laya.Button {

        private scaleTime: number = 100;

        constructor() {
            super();
            this.on(Laya.Event.MOUSE_DOWN, this, this.scaleSmal);
            this.on(Laya.Event.MOUSE_UP, this, this.scaleBig);
            this.on(Laya.Event.MOUSE_OUT, this, this.scaleBig);
        }

        private scaleBig(): void {
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, this.scaleTime);
        }

        private scaleSmal(): void {
            center(this);
            // scale 0.8
            Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, this.scaleTime);
        }

    }

    export class img_btn extends Laya.Image {

        private scaleTime: number = 100;

        constructor() {
            super();
            this.on(Laya.Event.MOUSE_DOWN, this, this.scaleSmal);
            this.on(Laya.Event.MOUSE_UP, this, this.scaleBig);
            this.on(Laya.Event.MOUSE_OUT, this, this.scaleBig);
        }

        private scaleBig(): void {
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, this.scaleTime);
        }

        private scaleSmal(): void {
            center(this);
            // scale 0.8
            Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, this.scaleTime);
        }

    }

}