import screen from "./screen";

let _bgSprite = null;
let _bgImage: Laya.Image = null;
let _bgColor = '#000000';
let _bgSkin = null;
let _bgSizeGrid = null;

function _drawSkin() {
    if (_bgImage && _bgSkin) {
        _bgImage.skin = _bgSkin;
    }
    if (_bgImage && _bgSizeGrid) {
        _bgImage.sizeGrid = _bgSizeGrid;
    }
}

function _drawColor() {
    if (_bgSprite) {
        _bgSprite.graphics.clear();
        _bgSprite.graphics.drawRect(0, 0, _bgSprite.width, _bgSprite.height, _bgColor);
    }
}

export function initBg() {
    _bgSprite = Laya.stage.getChildByName('_tape_bg_layer');
    if (!_bgSprite) {
        _bgSprite = new Laya.Sprite;
        _bgSprite.name = '_tape_bg_layer';
        _bgImage = new Laya.Image;
        _bgImage.name = '_bg_image';
        _bgSprite.addChild(_bgImage);
        Laya.stage.addChild(_bgSprite);
    }
    _bgImage.width = screen.getWidth();
    _bgImage.height = screen.getHeight();

    _bgSprite.width = screen.getWidth();
    _bgSprite.height = screen.getHeight();

    _drawSkin();
    _drawColor();
}

function setBgColor(color) {
    _bgColor = color;
    _drawColor();
}

function getBgColor() {
    return _bgColor;
}

function setBgSkin(skin) {
    _bgSkin = skin;
    _drawSkin();
}

function getBgSkin() {
    return _bgSkin;
}

function setBgSizeGrid(sizeGrid) {
    _bgSizeGrid = sizeGrid;
    _drawSkin();
}

function getBgSizeGrid() {
    return _bgSizeGrid;
}

export default {
    setBgColor,
    getBgColor,
    setBgSkin,
    getBgSkin,
    setBgSizeGrid,
    getBgSizeGrid,
}