// =========================== //
// tape navigator.js
// =========================== //
module Tape {

    ///////////////////////////////////
    //// NavigatorLoader
    ///////////////////////////////////

    class NavigatorLoader extends Tape.PropsComponent {

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
        }

        public nextProgress(progress) {
            this.routeActivity.onNextProgress(progress);
        }

        public exit() {
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

    ///////////////////////////////////
    //// NavigatorStack
    ///////////////////////////////////

    class NavigatorStack {

        private __navigator__ = null;
        private __init_name__ = "";
        private __routes__: Object = {};
        private __static_res__: Array<Object> = [];
        private __stacks__: Array<NavigatorLoader> = [];
        private __loaded_handler__: Function = null;
        private __load_progress_handler__: Function = null;
        private __uri_profix__ = "://";
        private __file_version__ = null;
        private __loading__ = false;

        constructor(navigator) {
            this.__navigator__ = navigator;
            this.__loaded_handler__ = navigator.props['navigation']['onLoaded'];
            this.__load_progress_handler__ = navigator.props['navigation']['onLoadProgress'];
            this.__routes__ = navigator.props['navigation']['routes'];
            this.__init_name__ = navigator.props['navigation']['initName'];
            this.__static_res__ = navigator.props['navigation']['staticRes'] || [];
            this.__uri_profix__ = navigator.props['navigation']['uriProfix'] || "://";
            this.__file_version__ = navigator.props['navigation']['fileVersion'];
        }

        public init_page() {
            if (this.__file_version__) {
                Tape.Box.ResourceVersion.type = Tape.Box.ResourceVersion.FILENAME_VERSION;
                Tape.Box.ResourceVersion.enable(this.__file_version__,
                    Tape.Box.Handler.create(this, () => {
                        this.navigate(this.__init_name__);
                    }))
            } else {
                this.navigate(this.__init_name__);
            }
        }


        ///////////////////////////////////////////////////////////
        //// Open
        ///////////////////////////////////////////////////////////

        public link(url, action: Function = null) {
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
            this.navigate(path, params, action);
        }

        public navigate(name, params = {}, action: Function = null) {
            if (this.__routes__
                && this.__routes__.hasOwnProperty(name)
                && this.__routes__[name].hasOwnProperty('activity')) {
                let route = this.__routes__[name];
                let activity = route['activity'];
                let resArray = [];
                if (this.__static_res__) {
                    this.__static_res__.forEach(res => {
                        resArray.push(res);
                    });
                }
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
                this.__loading__ = true;
                new NavigatorLoader(activity, name, {
                    navigation: this,
                    routeName: name,
                    params: paramsObject
                }, resArray, (loader) => {
                    this.__loading__ = false;
                    this.__navigator__.addChild(loader);
                    this.putStack(loader);
                    action && action();
                    this.__loaded_handler__ && this.__loaded_handler__(loader);
                }, (loader, progress) => {
                    if (this.__loading__) {
                        var stack = this.lastStack();
                        stack && stack.nextProgress(progress);
                    }
                    this.__load_progress_handler__ && this.__load_progress_handler__(loader, progress);
                });
            } else {
                return false;
            }
        }

        ///////////////////////////////////////////////////////////
        //// finish
        ///////////////////////////////////////////////////////////

        public finish(name) {
            this.finishStack(name);
        }

        public popToTop() {
            this.pop(this.__stacks__.length);
        }

        public pop(number: Number) {
            this.popStack(number);
        }

        /////////////////////////////////
        //// private
        /////////////////////////////////

        private lenStack() {
            return this.__stacks__.length;
        }

        private lastStack() {
            var len = this.lenStack();
            if (len > 0) {
                return this.__stacks__[len - 1];
            }
            return null;
        }

        private putStack(stack) {
            this.hideStack();
            this.__stacks__.push(stack);
            this.showStack();
        }

        private popStack(count) {
            if (this.lenStack() > 1) {
                this.hideStack();
                for (var i = 0; i < count + 1; i++) {
                    if (this.lenStack() > 1) {
                        this.__stacks__.pop().exit();
                    }
                }
                this.showStack();
            }
        }

        private finishStack(name) {
            var len = this.lenStack();
            if (len > 1) {
                let targetIndexs = [];
                for (var i = 0; i < len; i++) {
                    var stack = this.__stacks__[i];
                    if (stack.routeName === name) {
                        targetIndexs.push(i);
                    }
                }
                let first = targetIndexs.pop();
                let flag = first === len - 1;
                if (flag) {
                    this.hideStack();
                }
                let slice = this.__stacks__.splice(first, 1);
                slice.forEach(stack => {
                    stack.exit();
                });
                while (targetIndexs.length > 0) {
                    first = targetIndexs.pop();
                    let slice = this.__stacks__.splice(first, 1);
                    slice.forEach(stack => {
                        stack.exit();
                    });
                }
                if (flag) {
                    this.showStack();
                }
            }
        }

        private hideStack() {
            var len = this.lenStack();
            if (len > 0) {
                this.__stacks__[len - 1].hide();
            }
        }

        private showStack() {
            var len = this.lenStack();
            if (len > 0) {
                this.__stacks__[len - 1].show();
            }
        }

    }

    ///////////////////////////////////
    //// NavigatorOptions
    ///////////////////////////////////

    class NavigatorOptions {
        public static isInited = false;
    }

    export const initApp = function (routes, initName, options = {}) {
        // Check whether or not it is initialized multiple times
        if (NavigatorOptions.isInited) {
            return;
        }
        let StackNavigator = class extends Tape.PropsComponent {
            private __navigator__: NavigatorStack = null;
            constructor(props) {
                super(props);
                this.__navigator__ = new NavigatorStack(this);
                this.__navigator__.init_page();
            }
        };
        Tape.Box.drawView(new StackNavigator({
            navigation: {
                routes: routes,
                initName: initName,
                staticRes: options['res'],
                fileVersion: options['fileVersion'],
                uriProfix: options['uriProfix'],
                onLoaded: options['onLoaded'],
                onLoadProgress: options['onLoadProgress']
            }
        }));
        NavigatorOptions.isInited = true;
    }

}