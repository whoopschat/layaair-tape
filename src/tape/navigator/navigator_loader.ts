module Tape {

    export class NavigatorLoader extends Laya.Component {

        public __options__: LoaderOptions = null;
        public __activity__: Activity = null;

        constructor(options: LoaderOptions) {
            super();
            this.__options__ = options;
            let res = this.__options__.page.res;
            if (res && res.length > 0) {
                Laya.loader.load(res, Laya.Handler.create(this, () => {
                    this.__new_activity__();
                    this.__on_loaded__();
                }), Laya.Handler.create(this, (progress) => {
                    this.__on_load_progress__(progress);
                }, null, false));
            } else {
                this.__new_activity__();
                this.__on_loaded__();
            }
        }

        private __new_activity__() {
            if (this.__activity__) {
                return;
            }
            this.__activity__ = new this.__options__.page({
                page: this.__options__.page,
                params: this.__options__.params
            });
        }

        private __on_loaded__() {
            this.__options__.onLoaded && this.__options__.onLoaded(this);
            this.addChild(this.__activity__);
            this.__activity__.onCreate && this.__activity__.onCreate();
            this.__options__.onShow && this.__options__.onShow();
        }

        private __on_load_progress__(progress) {
            this.__options__.onLoadProgress && this.__options__.onLoadProgress(this, progress);
        }

        public nextProgress(progress) {
            this.__activity__.onNextProgress && this.__activity__.onNextProgress(progress);
        }

        public canFinish(page: any, activity: any) {
            if (page === this.__options__.page) {
                return !activity || activity === this.__activity__;
            }
            return false;
        }

        public show(anim: boolean, callback: Function) {
            var ease = this.__activity__.inEase || Laya.Ease.linearIn;
            var duration = this.__activity__.inEaseDuration || 0;
            var fromProps = this.__activity__.inEaseFromProps || {};
            var toProps = this.__activity__.inEaseToProps || {};
            if (anim && ease && duration > 0) {
                (<any>Object).assign(this, fromProps);
                this.__activity__.onResume && this.__activity__.onResume();
                this.visible = true;
                Laya.Tween.to(this, toProps, duration, ease, Laya.Handler.create(this, () => {
                    callback && callback();
                }));
            } else {
                this.__activity__.onResume && this.__activity__.onResume();
                this.visible = true;
                callback && callback();
            }
        }

        public hide() {
            if (!this.visible) {
                return;
            }
            this.__activity__.onPause && this.__activity__.onPause();
            this.visible = false;
        }

        public exit() {
            this.__activity__.onDestroy && this.__activity__.onDestroy();
            this.destroy();
        }

    }

}