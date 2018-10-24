import screen from "../manager/screen";
import { BgView } from "./bg";
import { PNG_LOADING } from "../../utils/pngres";

class IconView extends Laya.Image {

    private _angle = 0;

    constructor() {
        super();
    }

    public runLoop() {
        this.timer.clear(this, this.update);
        this.timer.frameLoop(1, this, this.update);
    }

    public stopLoop() {
        this.timer.clear(this, this.update);
    }

    private update() {
        this._angle += 3;
        if (this._angle >= 360) {
            this._angle = 0;
        }
        this.rotation = this._angle;
    }

}

export class ToastContentView extends Laya.Sprite {

    private _maxW = 0;
    private _minW = 0;
    private _iconSize = 0;
    private _padding = 0;
    private _fontSize = 0;
    private _radius = 0;
    private _imageView = null;
    private _titleView = null;
    private _bgView = null;

    constructor() {
        super();
        let size = Math.min(screen.getDesignWidth(), screen.getDesignHeight());
        this._maxW = size * 0.6;
        this._minW = size * 0.3;
        this._iconSize = size * 0.15;
        this._padding = size * 0.08;
        this._fontSize = size * 0.06;
        this._radius = 0;
        this._initBg();
        this._initImage();
        this._initTitle();
    }

    private _initBg() {
        this._bgView = new BgView();
        this._bgView.name = 'bg';
        this._bgView.alpha = 0.6;
        this._bgView.color = '#333333';
        this._bgView.radius = this._radius;
        this.addChild(this._bgView);
    }

    private _initTitle() {
        this._titleView = new Laya.Label()
        this._titleView.align = Laya.Stage.ALIGN_CENTER;
        this._titleView.valign = Laya.Stage.ALIGN_MIDDLE;
        this._titleView.wordWrap = true;
        this._titleView.name = 'title';
        this._titleView.fontSize = this._fontSize;
        this._titleView.color = '#ffffff';
        this._titleView.x = this._padding;
        this._titleView.y = this._padding;
        this.addChild(this._titleView);
    }

    private _initImage() {
        this._imageView = new IconView();
        this.addChild(this._imageView);
    }

    public setContent(title, image, anim = false) {

        this._titleView.width = undefined;
        this._titleView.visible = false;
        this._titleView.text = title;
        if (this._titleView.width > this._maxW) {
            this._titleView.width = this._maxW;
        } else if (this._titleView.width < this._minW) {
            this._titleView.width = this._minW;
        }

        let _draw = () => {
            if (this._imageView.visible) {
                this._titleView.y = this._imageView.y + this._imageView.height / 2 + this._padding / 2;
            }
            this._titleView.visible = true;
            this._bgView.height = this._titleView.height + this._titleView.y + this._padding;
            this._bgView.width = this._titleView.width + 2 * this._padding;
            this._bgView.callDraw();

            this._imageView.x = this._bgView.width / 2;

            this.x = (screen.getDesignWidth() - this._bgView.width) / 2;
            this.y = (screen.getDesignHeight() - this._bgView.height) / 2;
        }

        if (image) {
            this._imageView.visible = false;
            Laya.loader.load(image, Laya.Handler.create(this, (res) => {
                if (res) {
                    this._imageView.width = undefined;
                    this._imageView.height = undefined;
                    this._imageView.skin = image;
                    if (anim) {
                        this._imageView.runLoop();
                    } else {
                        this._imageView.stopLoop();
                    }
                    if (this._imageView.width && this._imageView.height) {
                        if (this._imageView.width > this._imageView.height) {
                            this._imageView.width = this._iconSize * this._imageView.width / this._imageView.height;
                            this._imageView.height = this._iconSize;
                        } else {
                            this._imageView.height = this._iconSize * this._imageView.height / this._imageView.width;
                            this._imageView.width = this._iconSize;
                        }
                    }
                    this._imageView.pivot(this._imageView.width / 2, this._imageView.height / 2);
                    this._imageView.y = this._padding + this._imageView.height / 2;
                    this._imageView.visible = true;
                } else {
                    this._imageView.visible = false;
                }
                _draw();
            }))
        } else {
            this._imageView.visible = false;
            _draw();
        }
    }

}


