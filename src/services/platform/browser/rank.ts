import { IRank } from "../interfaces";
import screen from "../../manager/screen";

class BrowserRank implements IRank {

    public isSupportedRank() {
        return false;
    }

    public createRankView(x = 0, y = 0, width = screen.getWidth(), height = screen.getHeight()) {
        var rankView = new Laya.Sprite();
        rankView.scrollRect = new Laya.Rectangle(x, y, width, height);
        return rankView;
    }

    public setRankKey(key: string, count: number = 100, offset: number = 0) {
    }

    public setRankScore(key: string, score: number, extraData?: string) {
    }

    public showRank(ui: object | object[]) {
    }

    public hideRank() {
    }

}

export const browserRank = new BrowserRank;