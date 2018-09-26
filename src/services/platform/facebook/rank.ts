import platform from "../../../utils/platform";
import { IRank } from "../interfaces";
import { bindView } from "../../../utils/bind";

class FBRank implements IRank {

    private _rankKey: string = null;
    private _rankUi: object | object[] = null;
    private _rankViews: Laya.Sprite[] = [];
    private _rankData = {};
    private _canDraw = true;
    private _count = 100;
    private _offset = 0;
    private _delayObj = null;

    private _fetchRankData(key, cb) {
        let getLeaderboardAsync = platform.execFB('getLeaderboardAsync', key);
        if (getLeaderboardAsync && getLeaderboardAsync.then) {
            getLeaderboardAsync.then((leaderboard) => {
                return leaderboard.getConnectedPlayerEntriesAsync(this._count, this._offset);
            }).then(entries => {
                try {
                    let selfInfo = {
                        playerId: platform.execFB('player.getID'),
                        nickname: platform.execFB('player.getName'),
                        avatarUrl: platform.execFB('player.getPhoto'),
                    };
                    let selfIndex = -1;
                    let selfData = {};
                    let rankSelf = null;
                    let rankThree = [];
                    let rankList = entries.map((entry, index) => {
                        let item = {
                            rank: entry.getRank(),
                            score: entry.getScore(),
                            timestamp: entry.getTimestamp(),
                            extraData: entry.getExtraData(),
                            playerId: entry.getPlayer().getID(),
                            nickname: entry.getPlayer().getName(),
                            avatarUrl: entry.getPlayer().getPhoto(),
                        }
                        let self = item.playerId == selfInfo.playerId;
                        if (self) {
                            rankSelf = item;
                            selfIndex = index;
                            selfData = {
                                score: item.score,
                                extraData: item.extraData
                            }
                        }
                        Object.assign(item, { self });
                        return item;
                    });
                    if (selfIndex <= 0) {
                        rankThree = rankList.slice(0, 3);
                    } else {
                        rankThree = rankList.slice(selfIndex - 1, selfIndex + 1);
                    }
                    cb && cb({ selfInfo, selfData, rankList, rankSelf, rankThree });
                } catch (error) {
                    cb && cb({});
                }
            });
        }
    }

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
        this._fetchRankData(this._rankKey, (data) => {
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

    public createRankView(x = 0, y = 0, width = Laya.stage.width, height = Laya.stage.height) {
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
        let getLeaderboardAsync = platform.execFB('getLeaderboardAsync', key);
        if (getLeaderboardAsync && getLeaderboardAsync.then) {
            getLeaderboardAsync.then(function (leaderboard) {
                return leaderboard.setScoreAsync(score, extraData);
            }).then((res) => {
                if (key == this._rankKey && res.getScore() == score) {
                    this._delayBindRankView();
                }
            });
        }
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

export const fbRank = new FBRank;