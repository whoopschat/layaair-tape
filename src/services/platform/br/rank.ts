import screen from "../../manager/screen";
import { IRank } from "../interfaces";
import { bindView } from "../../../utils/bind";
import { fetchRankDataForBR, setRankScoreForBR } from "./_rank";

class BRRank implements IRank {

    private _rankKey: string = null;
    private _rankUi: object | object[] = null;
    private _rankViews: Laya.Sprite[] = [];
    private _rankData = {};
    private _canDraw = true;
    private _count = 100;
    private _offset = 0;
    private _delayObj = null;

    private _drawRankView() {
        if (!this._rankUi) {
            return;
        }
        let isDestroyeds = [];
        this._rankViews.forEach((rankView, index) => {
            if (!rankView._destroyed) {
                rankView.destroyChildren();
                if (this._rankUi instanceof Array) {
                    this._rankUi.forEach((data) => {
                        var view = Laya.View.createComp(data);
                        if (view) {
                            bindView(view, this._rankData);
                            rankView.addChild(view);
                        }
                    });
                } else {
                    var view = Laya.View.createComp(this._rankUi);
                    if (view) {
                        bindView(view, this._rankData);
                        rankView.addChild(view);
                    }
                }
            } else {
                isDestroyeds.unshift(index);
            }
        });
        isDestroyeds.forEach(index => {
            this._rankViews.splice(index, 1);
        });
    }

    private _bindRankView() {
        if (!this._rankKey) {
            return;
        }
        if (!this._canDraw) {
            return;
        }
        this._canDraw = false;
        fetchRankDataForBR(this._rankKey, this._count, this._offset, (data) => {
            this._rankData = data;
            this._canDraw = true;
            this._rankViews.forEach((rankView) => {
                for (let index = 0; index < rankView.numChildren; index++) {
                    const element = rankView.getChildAt(index);
                    bindView(element, this._rankData);
                }
            });
        });
    }

    private _delayBindRankView() {
        if (this._delayObj) {
            return;
        }
        this._delayObj = setTimeout(() => {
            this._delayObj = null;
            this._bindRankView();
        }, 200);
    }

    public isSupportedRank() {
        return true;
    }

    public createRankView(x = 0, y = 0, width = screen.getWidth(), height = screen.getHeight()) {
        var rankView = new Laya.Sprite();
        rankView.scrollRect = new Laya.Rectangle(x, y, width, height);
        this._rankViews.push(rankView);
        this._drawRankView();
        this._delayBindRankView();
        return rankView;
    }

    public setRankKey(key: string, count: number = 100, offset: number = 0) {
        this._rankKey = key;
        this._count = count;
        this._offset = offset;
        this._delayBindRankView();
    }

    public setRankScore(key: string, score: number, extraData?: string) {
        setRankScoreForBR(key, score, extraData, () => {
            this._delayBindRankView();
        });
    }

    public showRank(ui: object | object[]) {
        if (!this._rankUi || JSON.stringify(ui) !== JSON.stringify(this._rankUi)) {
            this._rankUi = ui;
            this._drawRankView();
        }
        this._delayBindRankView();
    }

    public hideRank() {
        this._rankUi = null;
        this._rankViews.forEach(rankView => {
            rankView.destroyChildren();
        });
    }

}

export const brRank = new BRRank;