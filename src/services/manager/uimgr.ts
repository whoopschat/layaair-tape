import { setFocus } from "../navigator/stack";
import NavLoader from "../navigator/loader";

let _inited = false;
let _uiManager: Laya.Sprite;
let _mainUILayer: Laya.Sprite;
let _topUILayer: Laya.Sprite;
let _offsetX = 0;
let _offsetY = 0;

export function initUI(offsetX, offsetY) {
    _offsetX = offsetX;
    _offsetY = offsetY;
    _checkInit();
}

function _checkInit() {
    if (!_inited) {
        _uiManager = new Laya.Sprite();
        _uiManager.name = '_tape_stage';
        _mainUILayer = new Laya.Sprite();
        _mainUILayer.name = '_tape_main_layer';
        _topUILayer = new Laya.Sprite();
        _topUILayer.name = '_tape_top_layer';
        _uiManager.addChild(_mainUILayer);
        _uiManager.addChild(_topUILayer);
        Laya.stage.addChild(_uiManager);
        _inited = true;
    }
    _mainUILayer.x = _offsetX;
    _mainUILayer.y = _offsetY;
    _topUILayer.x = _offsetX;
    _topUILayer.y = _offsetY;
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

function moveTopToMainLayer(view: NavLoader) {
    _checkInit();
    if (view && view.parent == _mainUILayer) {
        _mainUILayer.removeChild(view);
        _mainUILayer.addChild(view);
    }
    checkFocus();
}

function addViewToMainLayer(view) {
    _checkInit();
    view && _mainUILayer.addChild(view);
    checkFocus();
}

function addViewTopLayer(view) {
    _checkInit();
    view && _topUILayer.addChild(view);
    checkFocus();
}

export default {
    checkFocus,
    moveTopToMainLayer,
    addViewToMainLayer,
    addViewTopLayer,
}