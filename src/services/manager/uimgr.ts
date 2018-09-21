import { setFocus } from "../navigator/stack";
import NavLoader from "../navigator/loader";

let _inited = false;
let _mainUILayer;
let _topUILayer;

function _checkInit() {
    if (_inited) {
        return;
    }
    let uiManager = new Laya.Sprite();
    _mainUILayer = new Laya.Sprite();
    _mainUILayer.name = 'tape_main_ui_layer';
    _topUILayer = new Laya.Sprite();
    _mainUILayer.name = 'tape_top_ui_layer';
    uiManager.addChild(_mainUILayer);
    uiManager.addChild(_topUILayer);
    Laya.stage.addChild(uiManager);
    _inited = true;
}

function checkFocus() {
    if (_mainUILayer.numChildren > 0) {
        let last = _mainUILayer.getChildAt(_mainUILayer.numChildren - 1);
        if (last instanceof NavLoader) {
            setFocus(true);
            return;
        }
    }
    setFocus(false);
}

function addUI(view) {
    _checkInit();
    view && _mainUILayer.addChild(view);
    checkFocus();
}

function addTopUI(view) {
    _checkInit();
    view && _topUILayer.addChild(view);
    checkFocus();
}

export default {
    checkFocus,
    addUI,
    addTopUI
}