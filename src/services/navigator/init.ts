import NavStack from "./stack";

let _options = null;
let _inited = false;

function _enableResourceVersion() {
    if (_options && _options.fileVersion) {
        Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
        Laya.ResourceVersion.enable(_options.fileVersion, Laya.Handler.create(null, () => {
            _beginLoadStaticRes();
        }))
    } else {
        _beginLoadStaticRes();
    }
}

function _beginLoadStaticRes() {
    let res = _options.commonRes || [];
    if (res.length > 0) {
        Laya.loader.load(res, Laya.Handler.create(null, () => {
            _onStaticResLoaded();
            _options.onLoaded && _options.onLoaded();
        }), Laya.Handler.create(this, (progress) => {
            _options.onLoadProgress && _options.onLoadProgress(progress);
        }, null, false));
    } else {
        _options.onLoadProgress && _options.onLoadProgress(100);
        _options.onLoaded && _options.onLoaded();
        _onStaticResLoaded();
    }
}

function _onStaticResLoaded() {
    NavStack.navigate(_options.mainPage);
}

export function initNavigator(options) {
    if (!options || _inited) {
        return;
    }
    _options = options;
    _enableResourceVersion();
    _inited = true;
}