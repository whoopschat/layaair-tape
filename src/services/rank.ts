import platform from "../utils/platform";
import { wxRank } from "./platform/rank_wx";
import { fbRank } from "./platform/rank_fb";

function createRankView(x?: number, y?: number, width?: number, height?: number) {
    if (platform.isFacebookApp()) {
        return fbRank.createRankView(x, y, width, height);
    } else if (platform.isWechatApp()) {
        return wxRank.createRankView(x, y, width, height);
    }
    return new Laya.Sprite;
}

function setRankKey(key: string, count?: number, offset?: number) {
    if (platform.isFacebookApp()) {
        return fbRank.setRankKey(key, count, offset);
    } else if (platform.isWechatApp()) {
        return wxRank.setRankKey(key, count, offset);
    }
}

function setRankScore(key: string, score: number, extraData?: string) {
    if (platform.isFacebookApp()) {
        return fbRank.setRankScore(key, score, extraData);
    } else if (platform.isWechatApp()) {
        return wxRank.setRankScore(key, score, extraData);
    }
}

function showRank(ui: object | object[]) {
    if (platform.isFacebookApp()) {
        return fbRank.showRank(ui);
    } else if (platform.isWechatApp()) {
        return wxRank.showRank(ui);
    }
}

function hideRank() {
    if (platform.isFacebookApp()) {
        return fbRank.hideRank();
    } else if (platform.isWechatApp()) {
        return wxRank.hideRank();
    }
}

export default {
    createRankView,
    setRankKey,
    setRankScore,
    showRank,
    hideRank
}
