import screen from "../manager/screen";

export default class ui extends Laya.Component {

    private _bgSprite = null;
    private _bgAlpha = 0.5;
    private _bgColor = '#000000';
    private _isTranslucent = true;
    private _isShow = false;
    private _handleOnTouchOutside = null;
    private _canceledOnTouchOutside = false;
    private _mask = false;
    private _onEvent = null;

    constructor(handleOnTouchOutside = null) {
        super();
        this._handleOnTouchOutside = handleOnTouchOutside;
        this._onEvent = (e) => {
            if (this.isShow && this.canceledOnTouchOutside) {
                this._handleOnTouchOutside && this._handleOnTouchOutside();
            }
            e.stopPropagation();
        }
        setTimeout(() => this.initBg(), 0);
    }

    public set ui(view: Laya.Sprite) {
        this.removeChildByName('_contentView');
        view.name = '_contentView';
        this.addChild(view);
    }

    public get ui(): Laya.Sprite {
        return this.getChildByName('_contentView') as Laya.Sprite;
    }

    public set isShow(isShow) {
        this._isShow = isShow;
    }

    public get isShow() {
        return this._isShow;
    }

    public set bgAlpha(bgAlpha) {
        this._bgAlpha = bgAlpha;
        this.refreshBg();
    }

    public get bgAlpha() {
        return this._bgAlpha;
    }

    public set bgColor(bgColor) {
        this._bgColor = bgColor;
        this.refreshBg();
    }

    public get bgColor() {
        return this._bgColor;
    }

    public set isTranslucent(isTranslucent) {
        this._isTranslucent = isTranslucent;
        this.refreshBg();
    }

    public get isTranslucent() {
        return this._isTranslucent;
    }

    public set canceledOnTouchOutside(canceledOnTouchOutside) {
        this._canceledOnTouchOutside = canceledOnTouchOutside;
        this.refreshCanceledOnTouchOutside();
    }

    public get canceledOnTouchOutside() {
        return this._canceledOnTouchOutside;
    }

    public set nonPenetrating(nonPenetrating) {
        this._mask = nonPenetrating;
        this.refreshCanceledOnTouchOutside();
    }

    public get nonPenetrating() {
        return this._mask;
    }

    private refreshBg() {
        if (!this._bgSprite) {
            return;
        }
        this._bgSprite.alpha = this.bgAlpha;
        this._bgSprite.graphics.clear();
        if (!this.isTranslucent) {
            this._bgSprite.graphics.drawRect(0, 0, this._bgSprite.width, this._bgSprite.height, this.bgColor);
        }
    }

    private refreshCanceledOnTouchOutside() {
        this._bgSprite && this._bgSprite.offAll();
        if ((this.canceledOnTouchOutside || this.nonPenetrating) && this.ui) {
            this.ui.mouseThrough = true;
            this._bgSprite && this._bgSprite.on(Laya.Event.CLICK, this, this._onEvent);
        }
    }

    private initBg() {
        if (this._bgSprite) {
            return;
        }
        this._bgSprite = new Laya.Sprite();
        this._bgSprite.x = -screen.getOffestX();
        this._bgSprite.y = -screen.getOffestY();
        this._bgSprite.width = screen.getWidth();
        this._bgSprite.height = screen.getHeight();
        this.addChildAt(this._bgSprite, 0);
        this.refreshBg();
        this.refreshCanceledOnTouchOutside();
    }

}