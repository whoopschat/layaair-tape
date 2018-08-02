module Tape {

    export module UILayerManager {

        let inited = false;
        let mainUILayer: Laya.Sprite;
        let popUILayer: Laya.Sprite;
        let topUILayer: Laya.Sprite;

        function checkInit() {
            if (inited) {
                return;
            }
            let uiManager = new Laya.Sprite();
            mainUILayer = new Laya.Sprite();
            mainUILayer.name = 'tape_main_ui_layer';
            popUILayer = new Laya.Sprite();
            mainUILayer.name = 'tape_pop_ui_layer';
            topUILayer = new Laya.Sprite();
            mainUILayer.name = 'tape_top_ui_layer';
            uiManager.addChild(mainUILayer);
            uiManager.addChild(popUILayer);
            uiManager.addChild(topUILayer);
            Laya.stage.addChild(uiManager);
            inited = true;
        }

        function checkFocus() {
            if (popUILayer.numChildren > 0) {
                NavigatorStack.focus(false);
            } else {
                NavigatorStack.focus(true);
            }
        }

        export function addMainUI(view) {
            checkInit();
            view && mainUILayer.addChild(view);
            checkFocus();
        }

        export function clearMainUI() {
            checkInit();
            mainUILayer.removeChildren();
            checkFocus();
        }

        export function addPopUI(view) {
            checkInit();
            view && popUILayer.addChild(view);
            checkFocus();
        }

        export function clearPopUI() {
            checkInit();
            popUILayer.removeChildren();
            checkFocus();
        }

        export function addTopUI(view) {
            checkInit();
            view && topUILayer.addChild(view);
            checkFocus();
        }

        export function clearTopUI() {
            checkInit();
            topUILayer.removeChildren();
            checkFocus();
        }

    }

}