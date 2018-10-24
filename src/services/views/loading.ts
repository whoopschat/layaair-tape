import screen from "../manager/screen";
import { BgView } from "./bg";
import { PNG_LOADING } from "../../utils/pngres";

class LoadingView extends Laya.Image {

    private _angle = 0;

    constructor() {
        super();
        this.skin = PNG_LOADING;
        this.timer.frameLoop(1, this, this.update);
    }

    public setSize(size) {
        this.width = size;
        this.height = size;
        this.pivot(size / 2, size / 2);
    }

    private update() {
        this._angle += 3;
        if (this._angle >= 360) {
            this._angle = 0;
        }
        this.rotation = this._angle;
    }

}

export class LoadingContentView extends Laya.Sprite {

    private _maxW = 0;
    private _minW = 0;
    private _loadingSize = 0;
    private _padding = 0;
    private _fontSize = 0;
    private _radius = 0;
    private _loadingView: LoadingView = null;
    private _titleView = null;
    private _bgView = null;

    constructor() {
        super();
        let size = Math.min(screen.getDesignWidth(), screen.getDesignHeight());
        this._maxW = size * 0.6;
        this._minW = size * 0.4;
        this._loadingSize = size * 0.15;
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
        this._loadingView = new LoadingView;
        this._loadingView.setSize(this._loadingSize);
        this.addChild(this._loadingView);
    }

    public setContent(title) {
        if (title) {
            this._loadingView.y = this._padding / 2 + this._loadingView.height / 2;
            this._titleView.width = undefined;
            this._titleView.visible = true;
            this._titleView.text = title;
            if (this._titleView.width > this._maxW) {
                this._titleView.width = this._maxW;
            } else if (this._titleView.width < this._minW) {
                this._titleView.width = this._minW;
            }
            this._titleView.y = this._loadingView.y + this._loadingView.height / 2 + this._padding / 4;

            this._bgView.height = this._titleView.height + this._titleView.y + this._padding / 2;
            this._bgView.width = this._titleView.width + 2 * this._padding;
        } else {
            this._loadingView.y = this._padding + this._loadingView.height / 2;
            this._titleView.visible = false;
            this._bgView.height = this._loadingView.height + 2 * this._padding;
            this._bgView.width = this._loadingView.width + 2 * this._padding;
        }

        this._bgView.callDraw();
        this._loadingView.x = this._bgView.width / 2;
        this.x = (screen.getDesignWidth() - this._bgView.width) / 2;
        this.y = (screen.getDesignHeight() - this._bgView.height) / 2;
    }

}


