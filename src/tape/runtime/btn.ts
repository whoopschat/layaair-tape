module runtime {

    export let clickSound = null;

    let scaleTime: number = 100;

    function center(view) {
        view.x = view.x + view.width / 2 - view.pivotX;
        view.y = view.y + view.height / 2 - view.pivotY;
        view.pivot(view.width / 2, view.height / 2);
    }

    function scaleSmal(view) {
        center(view);
        Laya.Tween.to(view, { scaleX: 0.8, scaleY: 0.8 }, scaleTime);
    }

    function scaleBig(view) {
        Laya.Tween.to(view, { scaleX: 1, scaleY: 1 }, scaleTime);
    }

    function playSound(view, sound) {
        if (sound) {
            Laya.SoundManager.playSound(sound, 1);
        } else if (clickSound) {
            Laya.SoundManager.playSound(clickSound, 1);
        }
    }

    export class btn extends Laya.Button {

        public sound = null;

        constructor() {
            super();
            this.on(Laya.Event.MOUSE_DOWN, this, () => scaleSmal(this));
            this.on(Laya.Event.MOUSE_UP, this, () => scaleBig(this));
            this.on(Laya.Event.MOUSE_OUT, this, () => scaleBig(this));
            this.on(Laya.Event.CLICK, this, () => playSound(this, this.sound));
        }

    }

    export class btn_img extends Laya.Image {

        public sound = null;

        constructor() {
            super();
            this.on(Laya.Event.MOUSE_DOWN, this, () => scaleSmal(this));
            this.on(Laya.Event.MOUSE_UP, this, () => scaleBig(this));
            this.on(Laya.Event.MOUSE_OUT, this, () => scaleBig(this));
            this.on(Laya.Event.CLICK, this, () => playSound(this, this.sound));
        }

    }

    export class btn_label extends Laya.Label {

        public sound = null;

        constructor() {
            super();
            this.on(Laya.Event.MOUSE_DOWN, this, () => scaleSmal(this));
            this.on(Laya.Event.MOUSE_UP, this, () => scaleBig(this));
            this.on(Laya.Event.MOUSE_OUT, this, () => scaleBig(this));
            this.on(Laya.Event.CLICK, this, () => playSound(this, this.sound));
        }

    }

}