module Tape {

    export class TiledMap {

        private mTiledMap: Laya.TiledMap;
        private mCanDrag = false;
        private mMapUrl: string = '';
        private mLastMouseX: number = 0;
        private mLastMouseY: number = 0;
        private mX: number = 0;
        private mY: number = 0;

        public onLoaded: Function = null;

        public setCanDrag(canDrag) {
            this.mCanDrag = canDrag;
        }

        public getMap(): Laya.TiledMap {
            return this.mTiledMap;
        }

        public destroy() {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.destroy();
            this.mTiledMap = null;
        }

        public show() {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.mapSprite().visible = true;
        }

        public hide() {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.mapSprite().visible = false;
        }

        constructor(url) {
            this.mMapUrl = url;
            this.mX = 0;
            this.mY = 0;
            this.mTiledMap = new Laya.TiledMap();
            this.loadMap();
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        }

        private loadMap() {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.createMap(this.mMapUrl,
                new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height),
                new Laya.Handler(this, this.completeHandler),
                new Laya.Rectangle(160, 160, 160, 160), null, true, true);
        }

        private completeHandler(): void {
            if (!this.mTiledMap) {
                return;
            }
            this.onLoaded && this.onLoaded();
            this.resize();
        }

        private mouseDown(): void {
            this.mLastMouseX = Laya.stage.mouseX;
            this.mLastMouseY = Laya.stage.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }

        private mouseMove(): void {
            if (!this.mCanDrag) {
                return;
            }
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.moveViewPort(this.mX - (Laya.stage.mouseX - this.mLastMouseX), this.mY - (Laya.stage.mouseY - this.mLastMouseY));
        }

        private mouseUp(): void {
            this.mX = this.mX - (Laya.stage.mouseX - this.mLastMouseX);
            this.mY = this.mY - (Laya.stage.mouseY - this.mLastMouseY);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
        }

        private resize(): void {
            if (!this.mTiledMap) {
                return;
            }
            this.mTiledMap.changeViewPort(this.mX, this.mY, Laya.Browser.width, Laya.Browser.height);
        }

    }

}