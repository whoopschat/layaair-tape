module Tape {

    export interface MapTileset {
        id: number,
        image: string
    }

    export interface MapLayer {
        name: string;
        alpha: number;
        data: number[];
        visible: boolean;
        clickable?: boolean;
    }

    export interface MapData {
        rows: number;
        columns: number;
        tilewidth: number;
        tileheight: number;
        padding: number;
        oblique: boolean;
        layers?: MapLayer[];
        tilesets?: MapTileset[];
        showPoint?: boolean;
        pointAlpha?: number;
        pointColor?: string;
        showGrid?: boolean;
        gridAlpha?: number;
        gridColor?: string;
    }

    export class MapTile extends Laya.Image {

    }

    export class MapView extends Laya.Sprite {

        private _mapUrl_: string = '';
        private _mapData_: MapData = null;
        private _mapSprite_: Laya.Sprite = new Laya.Sprite;
        private _mapTileMouse_: (event: { type: string, event: any }, tile: MapTile, row: number, column: number, id: number) => void = null;
        private _mapLoaded_: (mapData: MapData) => void = null;

        // public props

        public onMapTileMouse(callback: (event: { type: string, event: any }, tile: MapTile, row: number, column: number, id: number) => void) {
            this._mapTileMouse_ = callback;
        }

        public onMapLoaded(callback: (mapData: MapData) => void) {
            this._mapLoaded_ = callback;
        }

        public getMapData() {
            return this._mapData_;
        }

        public getMapUrl() {
            return this._mapUrl_;
        }

        public getMapPath() {
            return this._mapUrl_.substr(0, this._mapUrl_.lastIndexOf('\/'));
        }

        public getMapTileSets() {
            return this._mapData_.tilesets || [];
        }

        public getMapTileField(id, field) {
            let tilesets = this._mapData_.tilesets || [];
            if (tilesets.length > 0) {
                let filter = tilesets.filter(res => {
                    return res.id == id;
                });
                if (filter.length > 0) {
                    return filter[0][field];
                }
            }
            return null;
        }

        public getMapCustomLayer(name) {
            return this._mapSprite_.getChildByName(`layer_custom_${name}`) as Laya.Sprite;
        }

        public getMapBgLayer() {
            return this._mapSprite_.getChildByName(`layer_bg`) as Laya.Sprite;
        }

        public getMapLayer(name) {
            return this._mapSprite_.getChildByName(`layer_${name}`) as Laya.Sprite;
        }

        constructor(url) {
            super();
            this.width = Laya.stage.width;
            this.height = Laya.stage.height;
            this._mapUrl_ = url;
            this.addChild(this._mapSprite_);
            this.loadMapData();
            this._mapSprite_.on(Laya.Event.MOUSE_DOWN, this, () => {
                this._mapSprite_.startDrag();
            });
            this._mapSprite_.on(Laya.Event.MOUSE_UP, this, () => {
                this._mapSprite_.stopDrag();
            });
        }

        private loadMapData() {
            Laya.loader.load(this._mapUrl_, Laya.Handler.create(this, (res) => {
                this._mapData_ = res || {};
                this.loadMapRes();
            }), null, Laya.Loader.JSON);
        }

        private loadMapRes() {
            let tilesets = this._mapData_.tilesets || [];
            if (tilesets.length > 0) {
                Laya.loader.load(tilesets.map((val) => {
                    return { url: `${this.getMapPath()}/${val.image}`, type: Laya.Loader.IMAGE }
                }), Laya.Handler.create(this, () => {
                    this.loadComplete();
                }));
            } else {
                this.loadComplete();
            }
        }

        private loadComplete() {
            let rows = this._mapData_.rows || 0;
            let columns = this._mapData_.columns || 0;
            let tilewidth = this._mapData_.tilewidth || 0;
            let tileheight = this._mapData_.tileheight || 0;
            let padding = this._mapData_.padding || 0;
            let layers = this._mapData_.layers || [];

            let width = columns * tilewidth;
            let height = rows * tileheight;

            let bgSp = new Laya.Sprite;
            bgSp.name = `layer_bg`;
            this._mapSprite_.addChild(bgSp);

            let gridSp = new Laya.Sprite;
            gridSp.name = `layer_grid`;
            this._mapSprite_.addChild(gridSp);

            layers.forEach(layer => {
                let layerSp = new Laya.Sprite;
                layerSp.name = `layer_${layer.name}`;
                this._mapSprite_.addChild(layerSp);
                let customSp = new Laya.Sprite;
                customSp.name = `layer_custom_${layer.name}`;
                this._mapSprite_.addChild(customSp);
            });

            let pointSp = new Laya.Sprite;
            pointSp.name = `layer_point`;
            this._mapSprite_.addChild(pointSp);
            this._mapLoaded_ && this._mapLoaded_(this._mapData_);
            this.frameLoop(1, this, this.drawMapLayer);
        }

        private refreshSize() {
            let rows = this._mapData_.rows || 0;
            let columns = this._mapData_.columns || 0;
            let tilewidth = this._mapData_.tilewidth || 0;
            let tileheight = this._mapData_.tileheight || 0;
            let padding = this._mapData_.padding || 0;
            let layers = this._mapData_.layers || [];

            let width = columns * tilewidth;
            let height = rows * tileheight;

            this._mapSprite_.width = width + 2 * padding;
            this._mapSprite_.height = height + 2 * padding;

            let num = this._mapSprite_.numChildren;
            for (var index = 0; index < num; index++) {
                let layer = this._mapSprite_.getChildAt(index) as Laya.Sprite;
                layer.x = padding;
                layer.y = padding;
                layer.width = width;
                layer.height = height;
            }
        }

        private checkVisible(r, c) {
            let rows = this._mapData_.rows || 0;
            let columns = this._mapData_.columns || 0;
            let tilewidth = this._mapData_.tilewidth || 0;
            let tileheight = this._mapData_.tileheight || 0;
            let oblique = this._mapData_.oblique === true;

            let mapX = -this._mapSprite_.x;
            let mapY = -this._mapSprite_.y;
            let offsetR = Math.floor(mapY / tileheight) - 2;
            let offsetC = Math.floor(mapX / tilewidth) - 2;
            let countR = Math.floor(this.height / tileheight) + 4;
            let countC = Math.floor(this.width / tilewidth) + 4;
            if (r >= offsetR && c >= offsetC && r < offsetR + countR && c < offsetC + countC) {
                return true
            }
            return false;
        }

        private drawPoint() {
            let rows = this._mapData_.rows || 0;
            let columns = this._mapData_.columns || 0;
            let tilewidth = this._mapData_.tilewidth || 0;
            let tileheight = this._mapData_.tileheight || 0;

            let pointSp = this._mapSprite_.getChildByName(`layer_point`) as Laya.Sprite;
            if (pointSp) {
                pointSp.visible = this._mapData_.showPoint === true;
                pointSp.alpha = this._mapData_.pointAlpha || 1;
                let color = this._mapData_.pointColor || '#3399ff';
                for (var r = 0; r < rows; r++) {
                    for (var c = 0; c < columns; c++) {
                        let checkVisible = this.checkVisible(r, c);
                        let tile = pointSp.getChildByName(`${r}_${c}`) as Laya.Label;
                        if (!checkVisible) {
                            if (tile) {
                                tile.removeSelf();
                                Laya.Pool.recover('layer_point_tile', tile);
                            }
                        } else {
                            if (!tile) {
                                tile = Laya.Pool.getItemByCreateFun('layer_point_tile', () => {
                                    return new Laya.Label;
                                });
                                tile.name = `${r}_${c}`;
                                pointSp.addChild(tile);
                            }
                            tile.text = `(${r},${c})`;
                            tile.fontSize = 20;
                            tile.color = color;

                            tile.x = c * tilewidth + tilewidth / 2;
                            tile.y = r * tileheight + tileheight / 2;
                            tile.width = tilewidth;
                            tile.height = tileheight;
                            tile.anchorX = 0.5;
                            tile.anchorY = 0.5;

                        }
                    }
                }
            }
        }

        private drawGrid() {
            let rows = this._mapData_.rows || 0;
            let columns = this._mapData_.columns || 0;
            let tilewidth = this._mapData_.tilewidth || 0;
            let tileheight = this._mapData_.tileheight || 0;

            let gridSp = this._mapSprite_.getChildByName(`layer_grid`) as Laya.Sprite;
            if (gridSp) {
                gridSp.visible = this._mapData_.showGrid === true;
                gridSp.alpha = this._mapData_.gridAlpha || 1;
                let bgColor = this._mapData_.gridColor || '#000000';
                for (var r = 0; r < rows; r++) {
                    for (var c = 0; c < columns; c++) {
                        let checkVisible = this.checkVisible(r, c);
                        let tile = gridSp.getChildByName(`${r}_${c}`) as Laya.Label;
                        if (!checkVisible) {
                            if (tile) {
                                tile.removeSelf();
                                Laya.Pool.recover('layer_grid_tile', tile);
                            }
                        } else {
                            if (!tile) {
                                tile = Laya.Pool.getItemByCreateFun('layer_grid_tile', () => {
                                    return new Laya.Label;
                                });
                                tile.name = `${r}_${c}`;
                                gridSp.addChild(tile);
                            }
                            tile.fontSize = 20;
                            if ((c + r) % 2 == 1) {
                                tile.bgColor = bgColor;
                            } else {
                                tile.bgColor = '#ffffff';
                            }

                            tile.x = c * tilewidth + tilewidth / 2;
                            tile.y = r * tileheight + tileheight / 2;
                            tile.width = tilewidth;
                            tile.height = tileheight;
                            tile.anchorX = 0.5;
                            tile.anchorY = 0.5;
                        }
                    }
                }
            }
        }

        private drawMapLayer() {

            this.refreshSize();
            this.drawGrid();
            this.drawPoint();

            let rows = this._mapData_.rows || 0;
            let columns = this._mapData_.columns || 0;
            let tilewidth = this._mapData_.tilewidth || 0;
            let tileheight = this._mapData_.tileheight || 0;
            let oblique = this._mapData_.oblique === true;

            let layers = this._mapData_.layers || [];
            layers.forEach(layer => {
                let alpha = layer.alpha || 1;
                let datas = layer.data || [];
                let layerSp = this._mapSprite_.getChildByName(`layer_${layer.name}`) as Laya.Sprite;
                if (layerSp) {
                    layerSp.visible = layer.visible !== false;
                    layerSp.alpha = alpha;
                    for (var r = 0; r < rows; r++) {
                        for (var c = 0; c < columns; c++) {
                            let index = r * columns + c;
                            let id = datas[index];
                            if (id > 0) {
                                let tile = layerSp.getChildByName(`${r}_${c}_${id}`) as MapTile;
                                let checkVisible = this.checkVisible(r, c);
                                if (!checkVisible) {
                                    if (tile) {
                                        tile.removeSelf();
                                        Laya.Pool.recover(`layer_tild`, tile);
                                    }
                                } else {
                                    if (!tile) {
                                        tile = Laya.Pool.getItemByCreateFun(`layer_tild`, () => {
                                            return new MapTile();
                                        });
                                        (<any>Object).assign(tile, {
                                            alpha: 1,
                                            rotation: 0,
                                            scaleX: 1,
                                            scaleY: 1,
                                            visible: true
                                        });
                                        tile.zOrder = index;
                                        tile.name = `${r}_${c}_${id}`;
                                        tile.tag = layer;
                                        tile.on(Laya.Event.CLICK, this, (event) => {
                                            if (layer.clickable) {
                                                this._mapTileMouse_ && this._mapTileMouse_({
                                                    type: Laya.Event.CLICK,
                                                    event
                                                }, tile, r, c, id);
                                            }
                                        });
                                        tile.on(Laya.Event.MOUSE_DOWN, this, (event) => {
                                            if (layer.clickable) {
                                                this._mapTileMouse_ && this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_DOWN,
                                                    event
                                                }, tile, r, c, id);
                                            }
                                        });
                                        tile.on(Laya.Event.MOUSE_MOVE, this, (event) => {
                                            if (layer.clickable) {
                                                this._mapTileMouse_ && this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_MOVE,
                                                    event
                                                }, tile, r, c, id);
                                            }
                                        });
                                        tile.on(Laya.Event.MOUSE_OUT, this, (event) => {
                                            if (layer.clickable) {
                                                this._mapTileMouse_ && this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_OUT,
                                                    event
                                                }, tile, r, c, id);
                                            }
                                        });
                                        tile.on(Laya.Event.MOUSE_OVER, this, (event) => {
                                            if (layer.clickable) {
                                                this._mapTileMouse_ && this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_OVER,
                                                    event
                                                }, tile, r, c, id);
                                            }
                                        });
                                        tile.on(Laya.Event.MOUSE_UP, this, (event) => {
                                            if (layer.clickable) {
                                                this._mapTileMouse_ && this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_UP,
                                                    event
                                                }, tile, r, c, id);
                                            }
                                        });
                                        tile.on(Laya.Event.MOUSE_WHEEL, this, (event) => {
                                            if (layer.clickable) {
                                                this._mapTileMouse_ && this._mapTileMouse_({
                                                    type: Laya.Event.MOUSE_WHEEL,
                                                    event
                                                }, tile, r, c, id);
                                            }
                                        });
                                        layerSp.addChild(tile);
                                    }
                                    tile.width = undefined;
                                    tile.height = undefined;
                                    tile.skin = `${this.getMapPath()}/${this.getMapTileField(id, 'image')}`;
                                    let b = tile.height / tile.width;

                                    tile.x = c * tilewidth + tilewidth / 2;
                                    tile.y = r * tileheight + tileheight / 2;
                                    tile.width = tilewidth;
                                    tile.height = tile.width * b;
                                    tile.anchorX = 0.5;
                                    tile.anchorY = 0.5;
                                    tile.y = tile.y - (tile.height - tileheight) / 2;
                                }
                            }
                        }
                    }
                }
            });
        }

    }


}