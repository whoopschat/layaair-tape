import platform from "../../../utils/platform";
import screen from "../../manager/screen";
import { IRank } from "../interfaces";

class WXRank implements IRank {

    private _rank_texture = null;

    private _createRankTexture() {
        if (window.hasOwnProperty('sharedCanvas')) {
            var sharedCanvas = window['sharedCanvas'];
            if (!sharedCanvas.hasOwnProperty('_addReference')) {
                sharedCanvas['_addReference'] = () => { }
            }
            if (!this._rank_texture) {
                this._rank_texture = new Laya.Texture(sharedCanvas, null);
                this._rank_texture.bitmap.alwaysChange = false;
            }
        }
        return this._rank_texture;
    }

    public createRankView(x = 0, y = 0, width = screen.getDesignWidth(), height = screen.getDesignHeight()) {
        var rankView = new Laya.Sprite();
        var rankTexture = this._createRankTexture();
        if (rankTexture) {
            var newTexture = Laya.Texture.createFromTexture(rankTexture, x + screen.getOffestX(), y + screen.getOffestY(), width, height);
            newTexture.bitmap.alwaysChange = false;
            rankView.width = width;
            rankView.height = height;
            rankView.graphics.drawTexture(newTexture, 0, 0, newTexture.width, newTexture.height);
        }
        return rankView;
    }

    public setRankKey(key: string, count: number = 100, offset: number = 0) {
        platform.postMessageToWXOpenDataContext({
            action: "setRankKey",
            data: { key, count, offset }
        });
    }

    public setRankScore(key: string, score: number, extraData: string = '') {
        platform.postMessageToWXOpenDataContext({
            action: 'setRankScore',
            data: { key, score, extraData }
        });
    }

    public showRank(ui: object | object[]) {
        platform.postMessageToWXOpenDataContext({
            action: "showRank",
            data: { ui }
        });
    }

    public hideRank() {
        platform.postMessageToWXOpenDataContext({
            action: 'hideRank',
            data: {}
        });
    }

}

export const wxRank = new WXRank;