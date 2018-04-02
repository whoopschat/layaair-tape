module Tape {

    ///////////////////////////////////
    //// Stack
    ///////////////////////////////////

    class StackLoader extends Tape.PropsComponent {

        public routeName = "";
        public routeActivity = null;

        constructor(activity, routeName, props = {}, res = [], loaded: Function = null, onLoadProgress: Function = null) {
            super();
            this.routeName = routeName;
            if (res != null && res.length > 0) {
                Tape.Box.load(res, this, () => {
                    let act = new activity(props);
                    this.create(act);
                    if (loaded) {
                        loaded(this);
                    }
                }, (progress) => {
                    if (onLoadProgress) {
                        onLoadProgress(this, progress);
                    }
                })
            } else {
                let act = new activity(props);
                this.create(act);
                if (loaded) {
                    loaded(this);
                }
            }
        }

        public create(routeActivity) {
            this.routeActivity = routeActivity;
            this.addChild(this.routeActivity);
            this.routeActivity.onCreate();
            this.show();
        }

        public exit() {
            this.routeActivity.onPause();
            this.removeSelf();
            this.routeActivity.onDestroy();
        }

        public show() {
            this.visible = true;
            this.routeActivity.onResume();
        }

        public hide() {
            this.visible = false;
            this.routeActivity.onPause();
        }
    }

    class Stack {

        private __navigator__ = null;
        private __init_name__ = "";
        private __routes__: Object = {};
        private __static_res__: Array<Object> = [];
        private __stacks__: Array<StackLoader> = [];
        private __loaded_handler__: Function = null;
        private __load_progress_handler__: Function = null;
        private __uri_profix__ = "://";

        constructor(navigator) {
            this.__navigator__ = navigator;
            this.__loaded_handler__ = navigator.props['navigation']['onLoaded'];
            this.__load_progress_handler__ = navigator.props['navigation']['onLoadProgress'];
            this.__routes__ = navigator.props['navigation']['routes'];
            this.__init_name__ = navigator.props['navigation']['initName'];
            this.__static_res__ = navigator.props['navigation']['staticRes'];
            this.__uri_profix__ = navigator.props['navigation']['uriProfix'] || "://";
        }

        public init_page() {
            return this.navigate(this.__init_name__);
        }

        public navigate(name, params = {}) {
            if (this.__routes__
                && this.__routes__.hasOwnProperty(name)
                && this.__routes__[name].hasOwnProperty('activity')) {
                let route = this.__routes__[name];
                let activity = route['activity'];
                let resArray = [];
                this.__static_res__.forEach(res => {
                    resArray.push(res);
                });
                if (route.hasOwnProperty('res')
                    && typeof route['res'] === 'object'
                    && route['res'].length > 0) {
                    route['res'].forEach(res => {
                        resArray.push(res);
                    });
                }
                let paramsObject = {};
                if (route.hasOwnProperty('res')
                    && route['res'].length > 0) {
                    route['res'].forEach(res => {
                        resArray.push(res);
                    });
                }
                if (route.hasOwnProperty('params')) {
                    (<any>Object).assign(paramsObject, route['params']);
                }
                (<any>Object).assign(paramsObject, params);
                new StackLoader(activity, name, {
                    navigation: this,
                    routeName: name,
                    params: paramsObject
                }, resArray, (stack) => {
                    this.__navigator__.addChild(stack);
                    this.pushStack(stack);
                    if (this.__loaded_handler__) {
                        this.__loaded_handler__(stack);
                    }
                }, this.__load_progress_handler__);
            } else {
                return false;
            }
        }

        public link(url) {
            const params = {};
            const delimiter = this.__uri_profix__ || '://';
            const urlSplit = url.split(delimiter);
            let path = '/';
            if (urlSplit.length > 1) {
                const pathSplit = urlSplit[1].split('?');
                path = pathSplit[0];
                if (pathSplit.length > 1) {
                    const paramsSplit = pathSplit[1].split('&');
                    paramsSplit.forEach(value => {
                        const param = value.split('=');
                        if (param.length === 2) {
                            (<any>Object).assign(params, {
                                [param[0]]: param[1]
                            })
                        }
                    })
                }
            } else {
                path = url
            }
            this.navigate(path, params);
        }

        public back() {
            this.popStack();
        }

        public finish(reverseIndex) {
            this.finishStack(reverseIndex);
        }

        public finishByName(name) {
            let targetIndexs = [];
            let count = this.__stacks__.length;
            for (let i = 0; i < count; i++) {
                const stack = this.__stacks__[count - 1 - i];
                if (stack.routeName === name) {
                    targetIndexs.push(i);
                }
            }
            if (targetIndexs.length > 0) {
                targetIndexs.forEach(i => {
                    this.finish(i);
                });
            }
        }

        public pop(n = 1) {
            for (let i = 0; i < n; i++) {
                this.popStack();
            }
        }

        public popByName(name) {
            let targetIndex = -1;
            try {
                for (let i = 0; i < this.__stacks__.length; i++) {
                    const stack = this.__stacks__[i];
                    if (stack.routeName === name) {
                        targetIndex = i;
                        throw new Error("finded route");
                    }
                }
            } catch (e) {
            }
            if (targetIndex >= 0) {
                const n = this.__stacks__.length - 1 - targetIndex;
                this.pop(n);
            }
        }

        public popToTop() {
            this.pop(this.__stacks__.length);
        }

        /////////////////////////////////
        //// private
        /////////////////////////////////

        private hasStack(minCount = 1) {
            if (this.__stacks__.length >= minCount) {
                return true;
            }
            return false;
        }

        private lastStack() {
            if (this.hasStack()) {
                return this.__stacks__[this.__stacks__.length - 1];
            }
        }

        private pushStack(stack) {
            if (this.hasStack()) {
                this.__stacks__[this.__stacks__.length - 1].hide();
            }
            this.__stacks__.push(stack);
        }

        private popStack() {
            if (this.hasStack(2)) {
                this.__stacks__[this.__stacks__.length - 1].exit();
                this.__stacks__.splice(this.__stacks__.length - 1, 1);
                this.__stacks__[this.__stacks__.length - 1].show();
            }
        }

        private finishStack(reverseIndex) {
            if (this.hasStack(2)) {
                this.__stacks__[this.__stacks__.length - 1 - reverseIndex].exit();
                this.__stacks__.splice(this.__stacks__.length - 1 - reverseIndex, 1);
                if (reverseIndex == 0) {
                    this.__stacks__[this.__stacks__.length - 1].show();
                }
            }
        }
    }

    class Static {
        public static isInited = false;
    }

    export const initApp = function (routes, initName, options = {}) {
        // Check whether or not it is initialized multiple times
        if (Static.isInited) {
            return;
        }
        let StackNavigator = class extends Tape.PropsComponent {
            private __stack__: Stack = null;
            constructor(props) {
                super(props);
                this.__stack__ = new Stack(this);
                this.__stack__.init_page();
            }
        };
        Tape.Box.drawView(new StackNavigator({
            navigation: {
                routes: routes,
                initName: initName,
                staticRes: options['res'],
                uriProfix: options['uriProfix'],
                onLoaded: options['onLoaded'],
                onLoadProgress: options['onLoadProgress']
            }
        }));
        Static.isInited = true;
    }

}