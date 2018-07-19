class MainActivity extends Tape.Activity {

    ui = new ui.main_actiUI();

    onCreate() {
        this.inEase = Laya.Ease.linearIn;
        this.inEaseDuration = 300;
        this.inEaseFromProps = {
            y: Laya.stage.height
        };
        this.inEaseToProps = {
            y: 0
        };
        console.log('MainActivity onCreate');
        this.ui.btn.on(Laya.Event.CLICK, this, () => {
            this.navigate(PageActivity);
        });
        this.ui.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
        console.log(this.params);
        let view = new Tape.MapView('res/tiledMap/map1.json');
        view.onMapTileMouse((event, tild, row, column) => {
            if (event.type === Laya.Event.MOUSE_DOWN) {
                tild.alpha = 0.5;
            }
            if (event.type === Laya.Event.MOUSE_UP) {
                tild.alpha = 1;
            }
        });
        view.onMapLoaded((data) => {
            data.showPoint = true;
            let v = view.getMapCustomLayer('layer_1');
            console.log('----------------', v);
        });
        this.addChild(view);
    }

}