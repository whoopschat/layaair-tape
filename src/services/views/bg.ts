export class BgView extends Laya.Sprite {

    public radius = 0;
    public color = '#ff0000';

    public callDraw() {
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