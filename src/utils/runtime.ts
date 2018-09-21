module runtime {

    export let clickSound = null;
    export let scaleTime: number = 100;
    export let scaleSmalValue: number = 0.8;
    export let scaleBigValue: number = 1;

    function pivotCenter(view) {
        view.x = view.x + view.width / 2 - view.pivotX;
        view.y = view.y + view.height / 2 - view.pivotY;
        view.pivot(view.width / 2, view.height / 2);
    }

    function viewScale(view, scale) {
        pivotCenter(view);
        Laya.Tween.to(view, { scaleX: scale, scaleY: scale }, scaleTime);
    }

    function playClickSound(sound) {
        if (sound) {
            Laya.SoundManager.playSound(sound, 1);
        } else if (clickSound) {
            Laya.SoundManager.playSound(clickSound, 1);
        }
    }

    export function bindClick(view) {
        view.offAll();
        view.on(Laya.Event.MOUSE_DOWN, view, () => viewScale(view, scaleSmalValue));
        view.on(Laya.Event.MOUSE_UP, view, () => viewScale(view, scaleBigValue));
        view.on(Laya.Event.MOUSE_OUT, view, () => viewScale(view, scaleBigValue));
        view.on(Laya.Event.CLICK, view, () => playClickSound(view.sound));
    }

    export class btn extends Laya.Button {

        public sound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_img extends Laya.Image {

        public sound = null;

        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_label extends Laya.Label {

        public sound = null;
        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_sprite extends Laya.Sprite {

        public sound = null;
        constructor() {
            super();
            bindClick(this);
        }

    }

    export class btn_box extends Laya.Box {

        public sound = null;
        constructor() {
            super();
            bindClick(this);
        }

    }

}

export default runtime;