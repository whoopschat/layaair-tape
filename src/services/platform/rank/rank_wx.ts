import env from "../../../utils/env";
import screen from "../../manager/screen";
import { IRank } from "../_inters";

class Rank implements IRank {

    public isSupportedRank() {
        return true;
    }

    public createRankView(x = 0, y = 0, width = screen.getDesignWidth(), height = screen.getDesignHeight()) {
        var sharedCanvasView = new Laya.Sprite();
        sharedCanvasView.scrollRect = new Laya.Rectangle(x, y, width, height);
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
            if (!sharedCanvas.hasOwnProperty('_addReference')) {
                sharedCanvas['_addReference'] = () => {
                };
            }
            var rankTexture = new Laya.Texture(sharedCanvas);
            rankTexture.bitmap.alwaysChange = true;
            var rankSprite = new Laya.Sprite();
            rankSprite.x -= screen.getOffestX();
            rankSprite.y -= screen.getOffestY();
            rankSprite.width = Laya.stage.width;
            rankSprite.height = Laya.stage.height;
            rankSprite.graphics.drawTexture(rankTexture, 0, 0, rankTexture.width, rankTexture.height);
            sharedCanvasView.addChild(rankSprite);
        }
        return sharedCanvasView;
    }

    public setRankKey(key: string, count: number = 100, offset: number = 0) {
        env.postMessageToWXOpenDataContext({
            action: "setRankKey",
            data: { key, count, offset }
        });
    }

    public setRankLocationSelf(enable: boolean, offset: number = 0) {
        env.postMessageToWXOpenDataContext({
            action: 'setRankLocationSelf',
            data: { enable, offset }
        });
    }

    public setRankScore(key: string, score: number, extraData: string = '') {
        env.postMessageToWXOpenDataContext({
            action: 'setRankScore',
            data: { key, score, extraData }
        });
    }

    public showRank(ui: object | object[]) {
        env.postMessageToWXOpenDataContext({
            action: "showRank",
            data: { ui }
        });
    }

    public hideRank() {
        env.postMessageToWXOpenDataContext({
            action: 'hideRank',
            data: {}
        });
    }

}

export default new Rank;