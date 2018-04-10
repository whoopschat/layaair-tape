// =========================== //
// tape navigator.js
// =========================== //
module Tape {

    ///////////////////////////////////
    //// NavigatorLoader
    ///////////////////////////////////

    class NavigatorLoader extends Tape.PropsComponent {

        public routeName = "";
        public routeKey = "";
        public routeActivity = null;

        constructor(activity, routeName, routeKey, props = {}, res = [], loaded: Function = null, onLoadProgress: Function = null) {
            super();
            this.routeName = routeName;
            this.routeKey = routeKey;
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

        public deeplink(url, action: Function = null): boolean {
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
            return this.navigate(path, params, action);
        }

        public navigate(name, params = {}, action: Function = null): boolean {
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
                let key = Tape.UUID.guid();
                new NavigatorLoader(activity, name, key, {
                    navigation: this,
                    routeName: name,
                    routeKey: key,
                    params: paramsObject
                }, resArray, (loader) => {
                    this.__loading__ = false;
                    this.__navigator__.addChild(loader);
                    this.putStack(loader);
                    action && action(true);
                    this.__loaded_handler__ && this.__loaded_handler__(loader);
                }, (loader, progress) => {
                    if (this.__loading__) {
                        var stack = this.lastStack();
                        stack && stack.nextProgress(progress);
                    }
                    this.__load_progress_handler__ && this.__load_progress_handler__(loader, progress);
                });
                return true;
            } else {
                action && action(false);
                return false;
            }
        }

        ///////////////////////////////////////////////////////////
        //// finish
        ///////////////////////////////////////////////////////////

        public finish(name, key = null) {
            this.finishStack(name, key);
        }

        public popToTop() {
            this.pop(this.__stacks__.length);
        }

        public pop(number: Number = 1) {
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
            if (this.lenStack() > 1 && count > 0) {
                this.hideStack();
                for (var i = 0; i < count; i++) {
                    if (this.lenStack() > 1) {
                        this.__stacks__.pop().exit();
                    }
                }
                this.showStack();
            }
        }

        private finishStack(name, key = null) {
            var len = this.lenStack();
            if (len > 1) {
                let targetIndexs = [];
                for (var i = 0; i < len; i++) {
                    var stack = this.__stacks__[i];
                    if (stack.routeName === name) {
                        var flag = true;
                        if (key) {
                            flag = stack.routeKey === key;
                        }
                        if (flag && targetIndexs.length < len - 1) {
                            targetIndexs.push(i);
                        }
                    }
                }
                if (targetIndexs.length > 0) {
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

    export const createApp = function (routes, initName, options = {}): any {
        let StackNavigator = class extends Tape.PropsComponent {
            private __navigator__: NavigatorStack = null;
            constructor(props) {
                super(props);
                this.__navigator__ = new NavigatorStack(this);
                this.__navigator__.init_page();
            }
        };
        return new StackNavigator({
            navigation: {
                routes: routes,
                initName: initName,
                staticRes: options['res'],
                fileVersion: options['fileVersion'],
                uriProfix: options['uriProfix'],
                onLoaded: options['onLoaded'],
                onLoadProgress: options['onLoadProgress']
            }
        });
    }

}