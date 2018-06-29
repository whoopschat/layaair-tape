module Tape {

    export module UIManager {

        let inited = false;
        let mainUILayer: Laya.Sprite;
        let popUILayer: Laya.Sprite;
        let topUILayer: Laya.Sprite;

        function init() {
            if (inited) {
                return;
            }
            let uiManager = new Laya.Sprite();
            mainUILayer = new Laya.Sprite();
            popUILayer = new Laya.Sprite();
            topUILayer = new Laya.Sprite();
            uiManager.addChild(mainUILayer);
            uiManager.addChild(popUILayer);
            uiManager.addChild(topUILayer);
            Laya.stage.addChild(uiManager);
            inited = true;
        }

        export function addMainUI(view) {
            init();
            view && mainUILayer.addChild(view);
        }

        export function clearMainUI() {
            init();
            mainUILayer.removeChildren();
        }

        export function addPopUI(view) {
            init();
            view && popUILayer.addChild(view);
        }

        export function clearPopUI() {
            init();
            popUILayer.removeChildren();
        }

        export function addTopUI(view) {
            init();
            view && topUILayer.addChild(view);
        }

        export function clearTopUI() {
            init();
            topUILayer.removeChildren();
        }

    }

}