class TiledHelper {
    private mapSprite: Laya.Sprite = null;
    private tiledMap: Laya.TiledMap;
    private mLastMouseX: number = 0;
    private mLastMouseY: number = 0;
    private mX: number = 0;
    private mY: number = 0;
    private mapSource: string = '';
    private canDrag = false;

    constructor(map) {
        this.mapSource = map;
        this.createMap();
        this.mX = this.mY = 0;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
    }

    //创建地图
    private createMap() {
        this.tiledMap = new Laya.TiledMap();
        this.tiledMap.mapSprite
        this.mapSprite = this.tiledMap.mapSprite();
        this.mapSprite.graphics.drawRect(0, 0, 200, 200, "#333333");
        this.mapSprite.x = 50;
        this.mapSprite.y = 100;
        this.mapSprite.width = 200;
        this.mapSprite.height = 200;
        //创建地图，适当的时候调用destory销毁地图
        this.tiledMap.createMap(this.mapSource, new Laya.Rectangle(0, 0, Laya.stage.width, Laya.stage.height),
            new Laya.Handler(this, this.completeHandler), new Laya.Rectangle(160, 160, 160, 160));
    }

    /**
     * 地图加载完成的回调
     */
    private completeHandler(): void {
        console.log("地图创建完成");
        this.tiledMap.changeViewPort(this.mX, this.mY, Laya.Browser.width, Laya.Browser.height);
        console.log(this.tiledMap);
    }

    private mouseDown(): void {
        if (!this.canDrag) {
            return;
        }
        this.mLastMouseX = Laya.stage.mouseX;
        this.mLastMouseY = Laya.stage.mouseY;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }

    private mouseUp(): void {
        if (!this.canDrag) {
            return;
        }
        this.mX = this.mX - (Laya.stage.mouseX - this.mLastMouseX);
        this.mY = this.mY - (Laya.stage.mouseY - this.mLastMouseY);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }

    private mouseMove(): void {
        if (!this.canDrag) {
            return;
        }
        this.tiledMap.moveViewPort(this.mX - (Laya.stage.mouseX - this.mLastMouseX), this.mY - (Laya.stage.mouseY - this.mLastMouseY));
    }

    public startDrag() {
        this.canDrag = true;
    }

    public stopDrag() {
        this.canDrag = false;
    }

    public destory() {
        if (this.tiledMap) {
            this.tiledMap.destroy();
            this.tiledMap = null;
            this.mapSprite = null;
        }
    }
}