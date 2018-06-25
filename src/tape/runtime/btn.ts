module runtime {

    export class btn extends Laya.Image {

        private scaleTime: number = 100;

        constructor() {
            super();
            this.anchorX = this.anchorY = 0.5;
            this.on(Laya.Event.MOUSE_DOWN, this, this.scaleSmal);
            this.on(Laya.Event.MOUSE_UP, this, this.scaleBig);
            this.on(Laya.Event.MOUSE_OUT, this, this.scaleBig);
        }

        private scaleBig(): void {
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, this.scaleTime);
        }

        private scaleSmal(): void {
            // scale 0.8
            Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, this.scaleTime);
        }

    }

}