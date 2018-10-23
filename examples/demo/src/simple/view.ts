class BgView extends Laya.Sprite {

    private _drawlock = null;
    public radius = 0;
    public color = '#ff0000';

    constructor() {
        super();
        this.callDraw();
    }

    public callDraw() {
        if (this._drawlock) {
            return;
        }
        this._drawlock = setTimeout(() => {
            this.draw();
            this._drawlock = null;
        }, 0);
    }

    private draw() {
        this.graphics.clear();
        if (this.radius <= 0) {
            this.graphics.drawRect(0, 0, this.width, this.height, this.color);
        } else if (this.radius * 2 < this.width && this.radius * 2 < this.height) {
            this.graphics.drawPie(this.width - this.radius, this.radius, this.radius, -90, 0, this.color);
            this.graphics.drawPie(this.width - this.radius, this.height - this.radius, this.radius, 0, 90, this.color);
            this.graphics.drawPie(this.radius, this.radius, this.radius, 180, 270, this.color);
            this.graphics.drawPie(this.radius, this.height - this.radius, this.radius, 90, 180, this.color);
            this.graphics.drawRect(this.radius, 0, this.width - this.radius * 2, this.height, this.color);
            this.graphics.drawRect(0, this.radius, this.radius, this.height - this.radius * 2, this.color);
            this.graphics.drawRect(this.width - this.radius, this.radius, this.radius, this.height - this.radius * 2, this.color);
        } else {
            let realRadius = Math.min(this.width / 2, this.height / 2);
            this.graphics.drawPie(realRadius, realRadius, realRadius, 90, 270, this.color);
            this.graphics.drawPie(this.width - realRadius, realRadius, realRadius, -90, 90, this.color);
            this.graphics.drawRect(realRadius, 0, this.width - realRadius * 2, this.height, this.color);
        }
    }

}


class ToastTextView extends Laya.Sprite {

    private _maxW = 0;
    private _minW = 0;
    private _padding = 0;
    private _fontSize = 0;
    private _textView = null;
    private _bgView = null;
    private _text = '';

    constructor() {
        super();
        let size = Math.min(Tape.screen.getWidth(), Tape.screen.getHeight());
        this._maxW = size * 0.6;
        this._minW = size * 0.3;
        this._padding = size * 0.04;
        this._fontSize = size * 0.04;
        this._initBg();
        this._initText();
        this.text = '';
    }

    private _initBg() {
        this._bgView = new BgView();
        this._bgView.alpha = 0.6;
        this._bgView.color = '#333333';
        this._bgView.radius = 0;
        this.addChild(this._bgView);
    }

    private _initText() {
        this._textView = new Laya.Label()
        this._textView.align = Laya.Stage.ALIGN_CENTER;
        this._textView.valign = Laya.Stage.ALIGN_MIDDLE;
        this._textView.wordWrap = true;
        this._textView.name = 'text';
        this._textView.fontSize = this._fontSize;
        this._textView.color = '#ffffff';
        this._textView.x = this._padding;
        this._textView.y = this._padding;
        this.addChild(this._textView);
    }

    set text(text) {
        this._textView.width = undefined;
        this._textView.text = text;
        if (this._textView.width > this._maxW) {
            this._textView.width = this._maxW;
        } else if (this._textView.width < this._minW) {
            this._textView.width = this._minW;
        }
        this._bgView.height = this._textView.height + 2 * this._padding;
        this._bgView.width = this._textView.width + 2 * this._padding;
        this._bgView.callDraw();

        this.x = (Tape.screen.getWidth() - this._bgView.width) / 2 - Tape.screen.getOffestX();
        this.y = (Tape.screen.getHeight() - this._bgView.height) / 2 - Tape.screen.getOffestY();
        this._text = text;
    }

    get text() {
        return this._text;
    }

}


