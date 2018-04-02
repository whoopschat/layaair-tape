var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tape;
(function (Tape) {
    ///////////////////////////////////
    //// Stack
    ///////////////////////////////////
    var StackLoader = /** @class */ (function (_super) {
        __extends(StackLoader, _super);
        function StackLoader(activity, routeName, props, res, loaded, onLoadProgress) {
            if (props === void 0) { props = {}; }
            if (res === void 0) { res = []; }
            if (loaded === void 0) { loaded = null; }
            if (onLoadProgress === void 0) { onLoadProgress = null; }
            var _this = _super.call(this) || this;
            _this.routeName = "";
            _this.routeActivity = null;
            _this.routeName = routeName;
            if (res != null && res.length > 0) {
                Tape.Box.load(res, _this, function () {
                    var act = new activity(props);
                    _this.create(act);
                    if (loaded) {
                        loaded(_this);
                    }
                }, function (progress) {
                    if (onLoadProgress) {
                        onLoadProgress(_this, progress);
                    }
                });
            }
            else {
                var act = new activity(props);
                _this.create(act);
                if (loaded) {
                    loaded(_this);
                }
            }
            return _this;
        }
        StackLoader.prototype.create = function (routeActivity) {
            this.routeActivity = routeActivity;
            this.addChild(this.routeActivity);
            this.routeActivity.onCreate();
            this.show();
        };
        StackLoader.prototype.exit = function () {
            this.routeActivity.onPause();
            this.removeSelf();
            this.routeActivity.onDestroy();
        };
        StackLoader.prototype.show = function () {
            this.visible = true;
            this.routeActivity.onResume();
        };
        StackLoader.prototype.hide = function () {
            this.visible = false;
            this.routeActivity.onPause();
        };
        return StackLoader;
    }(Tape.PropsComponent));
    var Stack = /** @class */ (function () {
        function Stack(navigator) {
            this.__navigator__ = null;
            this.__init_name__ = "";
            this.__routes__ = {};
            this.__static_res__ = [];
            this.__stacks__ = [];
            this.__loaded_handler__ = null;
            this.__load_progress_handler__ = null;
            this.__uri_profix__ = "://";
            this.__navigator__ = navigator;
            this.__loaded_handler__ = navigator.props['navigation']['onLoaded'];
            this.__load_progress_handler__ = navigator.props['navigation']['onLoadProgress'];
            this.__routes__ = navigator.props['navigation']['routes'];
            this.__init_name__ = navigator.props['navigation']['initName'];
            this.__static_res__ = navigator.props['navigation']['staticRes'];
            this.__uri_profix__ = navigator.props['navigation']['uriProfix'] || "://";
        }
        Stack.prototype.init_page = function () {
            return this.navigate(this.__init_name__);
        };
        Stack.prototype.navigate = function (name, params) {
            var _this = this;
            if (params === void 0) { params = {}; }
            if (this.__routes__
                && this.__routes__.hasOwnProperty(name)
                && this.__routes__[name].hasOwnProperty('activity')) {
                var route = this.__routes__[name];
                var activity = route['activity'];
                var resArray_1 = [];
                this.__static_res__.forEach(function (res) {
                    resArray_1.push(res);
                });
                if (route.hasOwnProperty('res')
                    && typeof route['res'] === 'object'
                    && route['res'].length > 0) {
                    route['res'].forEach(function (res) {
                        resArray_1.push(res);
                    });
                }
                var paramsObject = {};
                if (route.hasOwnProperty('res')
                    && route['res'].length > 0) {
                    route['res'].forEach(function (res) {
                        resArray_1.push(res);
                    });
                }
                if (route.hasOwnProperty('params')) {
                    Object.assign(paramsObject, route['params']);
                }
                Object.assign(paramsObject, params);
                new StackLoader(activity, name, {
                    navigation: this,
                    routeName: name,
                    params: paramsObject
                }, resArray_1, function (stack) {
                    _this.__navigator__.addChild(stack);
                    _this.pushStack(stack);
                    if (_this.__loaded_handler__) {
                        _this.__loaded_handler__(stack);
                    }
                }, this.__load_progress_handler__);
            }
            else {
                return false;
            }
        };
        Stack.prototype.link = function (url) {
            var params = {};
            var delimiter = this.__uri_profix__ || '://';
            var urlSplit = url.split(delimiter);
            var path = '/';
            if (urlSplit.length > 1) {
                var pathSplit = urlSplit[1].split('?');
                path = pathSplit[0];
                if (pathSplit.length > 1) {
                    var paramsSplit = pathSplit[1].split('&');
                    paramsSplit.forEach(function (value) {
                        var param = value.split('=');
                        if (param.length === 2) {
                            Object.assign(params, (_a = {},
                                _a[param[0]] = param[1],
                                _a));
                        }
                        var _a;
                    });
                }
            }
            else {
                path = url;
            }
            this.navigate(path, params);
        };
        Stack.prototype.back = function () {
            this.popStack();
        };
        Stack.prototype.finish = function (reverseIndex) {
            this.finishStack(reverseIndex);
        };
        Stack.prototype.finishByName = function (name) {
            var _this = this;
            var targetIndexs = [];
            var count = this.__stacks__.length;
            for (var i = 0; i < count; i++) {
                var stack = this.__stacks__[count - 1 - i];
                if (stack.routeName === name) {
                    targetIndexs.push(i);
                }
            }
            if (targetIndexs.length > 0) {
                targetIndexs.forEach(function (i) {
                    _this.finish(i);
                });
            }
        };
        Stack.prototype.pop = function (n) {
            if (n === void 0) { n = 1; }
            for (var i = 0; i < n; i++) {
                this.popStack();
            }
        };
        Stack.prototype.popByName = function (name) {
            var targetIndex = -1;
            try {
                for (var i = 0; i < this.__stacks__.length; i++) {
                    var stack = this.__stacks__[i];
                    if (stack.routeName === name) {
                        targetIndex = i;
                        throw new Error("finded route");
                    }
                }
            }
            catch (e) {
            }
            if (targetIndex >= 0) {
                var n = this.__stacks__.length - 1 - targetIndex;
                this.pop(n);
            }
        };
        Stack.prototype.popToTop = function () {
            this.pop(this.__stacks__.length);
        };
        /////////////////////////////////
        //// private
        /////////////////////////////////
        Stack.prototype.hasStack = function (minCount) {
            if (minCount === void 0) { minCount = 1; }
            if (this.__stacks__.length >= minCount) {
                return true;
            }
            return false;
        };
        Stack.prototype.lastStack = function () {
            if (this.hasStack()) {
                return this.__stacks__[this.__stacks__.length - 1];
            }
        };
        Stack.prototype.pushStack = function (stack) {
            if (this.hasStack()) {
                this.__stacks__[this.__stacks__.length - 1].hide();
            }
            this.__stacks__.push(stack);
        };
        Stack.prototype.popStack = function () {
            if (this.hasStack(2)) {
                this.__stacks__[this.__stacks__.length - 1].exit();
                this.__stacks__.splice(this.__stacks__.length - 1, 1);
                this.__stacks__[this.__stacks__.length - 1].show();
            }
        };
        Stack.prototype.finishStack = function (reverseIndex) {
            if (this.hasStack(2)) {
                this.__stacks__[this.__stacks__.length - 1 - reverseIndex].exit();
                this.__stacks__.splice(this.__stacks__.length - 1 - reverseIndex, 1);
                if (reverseIndex == 0) {
                    this.__stacks__[this.__stacks__.length - 1].show();
                }
            }
        };
        return Stack;
    }());
    var Static = /** @class */ (function () {
        function Static() {
        }
        Static.isInited = false;
        return Static;
    }());
    Tape.initApp = function (routes, initName, options) {
        if (options === void 0) { options = {}; }
        // Check whether or not it is initialized multiple times
        if (Static.isInited) {
            return;
        }
        var StackNavigator = /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1(props) {
                var _this = _super.call(this, props) || this;
                _this.__stack__ = null;
                _this.__stack__ = new Stack(_this);
                _this.__stack__.init_page();
                return _this;
            }
            return class_1;
        }(Tape.PropsComponent));
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
    };
})(Tape || (Tape = {}));
