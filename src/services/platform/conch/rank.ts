import { IRank } from "../interfaces";

class ConchRank implements IRank {

    public isSupportedRank() {
        return false;
    }

    public createRankView(x = 0, y = 0, width = Laya.stage.width, height = Laya.stage.height) {
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

export const conchRank = new ConchRank;