import { IRank } from "../interfaces";

class H5Rank implements IRank {

    public canSupportRank() {
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

export const h5Rank = new H5Rank;