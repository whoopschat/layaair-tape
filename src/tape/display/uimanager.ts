module Tape {

    export module UIManager {

        let inited = false;
        let mainUILayer: Laya.Sprite;
        let topUILayer: Laya.Sprite;

        function checkInit() {
            if (inited) {
                return;
            }
            let uiManager = new Laya.Sprite();
            mainUILayer = new Laya.Sprite();
            mainUILayer.name = 'tape_main_ui_layer';
            topUILayer = new Laya.Sprite();
            mainUILayer.name = 'tape_top_ui_layer';
            uiManager.addChild(mainUILayer);
            uiManager.addChild(topUILayer);
            Laya.stage.addChild(uiManager);
            inited = true;
        }

        export function refreshFocus() {
            if (mainUILayer.numChildren > 0) {
                let last = mainUILayer.getChildAt(mainUILayer.numChildren - 1);
                if (last instanceof NavigatorLoader) {
                    NavigatorStack.focus(true);
                    return;
                }
            }
            NavigatorStack.focus(false);
        }

        export function addUI(view) {
            checkInit();
            view && mainUILayer.addChild(view);
            refreshFocus();
        }

        export function addTopUI(view) {
            checkInit();
            view && topUILayer.addChild(view);
            refreshFocus();
        }

    }

}