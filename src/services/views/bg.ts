export class BgView extends Laya.Sprite {

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
        } else {
            let realRadius = this.radius;
            if (realRadius * 4 > this.width || realRadius * 4 > this.height) {
                realRadius = Math.min(this.width / 4, this.height / 4);
            }
            this.graphics.drawPath(0, 0, [
                ["moveTo", realRadius, 0],
                ["lineTo", this.width - realRadius, 0],
                ["arcTo", this.width, 0, this.width, realRadius, realRadius],
                ["lineTo", this.width, this.height - realRadius],
                ["arcTo", this.width, this.height, this.width - realRadius, this.height, realRadius],
                ["lineTo", realRadius, this.height],
                ["arcTo", 0, this.height, 0, this.height - realRadius, realRadius],
                ["lineTo", 0, realRadius],
                ["arcTo", 0, 0, realRadius, 0, realRadius],
                ["closePath"]
            ], { fillStyle: this.color });
        }
    }
}