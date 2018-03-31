// toast
module Topspeed {

    /**
     * Toast
     */
    export class Toast {

        private static __toast_object__: Object = {};

        public static show(type: string, view, duration: number = 500, widthRatio = 0.5, heightRatio = 0.618): void {
            if (view && view.parent == null) {
                if (!this.__toast_object__.hasOwnProperty(type)) {
                    this.__toast_object__[type] = new Array();
                }
                const list = this.__toast_object__[type];
                view.x = Topspeed.Box.width() * widthRatio;
                view.y = Topspeed.Box.height() * heightRatio;
                view.alpha = 0;
                view.pivot(view.width / 2, view.height / 2);
                Topspeed.Box.tweenTo(view, { alpha: 1 }, duration, Topspeed.Box.TweenEase().quintOut);
                Topspeed.Box.tweenTo(view, { alpha: 0 }, duration, Topspeed.Box.TweenEase().quintIn, () => {
                    list.splice(list.indexOf(view), 1);
                    view.removeSelf();
                }, duration);
                Topspeed.Box.drawView(view);
                for (var i in list) {
                    if (list[i]) {
                        list[i].y -= list[i].height - 5;
                    }
                }
                list.push(view);
            }
        }

    }

}