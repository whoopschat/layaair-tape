import platform from "../../../utils/platform";

export function fetchRankDataForFB(key, count, offset, cb) {
    let getLeaderboardAsync = platform.execFB('getLeaderboardAsync', key);
    if (getLeaderboardAsync && getLeaderboardAsync.then) {
        getLeaderboardAsync.then((leaderboard) => {
            return leaderboard.getConnectedPlayerEntriesAsync(count, offset);
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

export function setRankScoreForFB(key: string, score: number, extraData: string = null, callback = null) {
    let getLeaderboardAsync = platform.execFB('getLeaderboardAsync', key);
    if (getLeaderboardAsync && getLeaderboardAsync.then) {
        getLeaderboardAsync.then(function (leaderboard) {
            return leaderboard.setScoreAsync(score, extraData);
        }).then((res) => {
            if (key == this._rankKey && res.getScore() == score) {
                callback && callback();
            }
        });
    }
}