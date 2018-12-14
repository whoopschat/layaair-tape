import screen from "./screen";

let _bgSprite: Laya.Sprite = null;
let _bgImage: Laya.Image = null;
let _bgSkin = null;
let _bgSizeGrid = null;

function _drawSkin() {
    if (_bgImage && _bgSkin) {
        _bgImage.skin = _bgSkin;
    }
    if (_bgImage && _bgSizeGrid) {
        _bgImage.sizeGrid = _bgSizeGrid;
    } else {
        _bgImage.sizeGrid = '';
    }
}

export function initBg() {
    _bgSprite = Laya.stage.getChildByName('_tape_bg_layer') as Laya.Sprite;
    if (!_bgSprite) {
        _bgSprite = new Laya.Sprite;
        _bgSprite.name = '_tape_bg_layer';
        Laya.stage.addChild(_bgSprite);

        _bgImage = new Laya.Image;
        _bgImage.name = '_bg_image';
        _bgSprite.addChild(_bgImage);
    }

    _bgSprite.width = screen.getWidth();
    _bgSprite.height = screen.getHeight();

    _bgImage.width = screen.getWidth();
    _bgImage.height = screen.getHeight();

    _drawSkin();
}

function setBgColor(color) {
    if (!_bgSprite) {
        return;
    }
    _bgSprite.graphics.clear();
    _bgSprite.graphics.drawRect(0, 0, _bgSprite.width, _bgSprite.height, color);
}

function setBgSkin(url, sizeGrid = null) {
    _bgSkin = url;
    _bgSizeGrid = sizeGrid;
    _drawSkin();
}

function setBgTexture(url) {
    if (!_bgSprite) {
        return;
    }
    _bgSprite.graphics.clear();
    Laya.loader.load(url, Laya.Handler.create(this, (texture) => {
        try {
            _bgSprite.graphics.fillTexture(texture, 0, 0, _bgSprite.width, _bgSprite.height, 'repeat');
        } catch (error) {
        }
    }));
}

function getBgSprite() {
    return _bgSprite;
}

export default {
    setBgSkin,
    setBgColor,
    setBgTexture,
    getBgSprite,
}