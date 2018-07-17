class TiledMapActivity extends Tape.Activity {

    tiled: TiledHelper;

    constructor(options) {
        super(options);
    }

    onResume() {
        this.tiled = new TiledHelper('res/tiledMap/map1.json');
        this.tiled.startDrag();
    }

    onPause() {
        this.tiled.destory();
    }
}