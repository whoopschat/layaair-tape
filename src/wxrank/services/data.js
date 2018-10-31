import Open from "./open";

function tryParseJson(data) {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }
    return data;
}

const fetchSelfInfo = (callback) => {
    Open.getUserInfo({
        openIdList: ['selfOpenId'],
        success: function (res) {
            let info = res.data[0];
            let selfInfo = {
                playerId: info.openId,
                nickname: info.nickName,
                avatarUrl: info.avatarUrl,
            }
            callback && callback(selfInfo);
        }
    });
}

const fetchRankList = (selfInfo, key, count = 100, offset = 0, callback) => {
    Open.getFriendCloudStorage({
        keyList: [key],
        success: function (res) {
            let list = [];
            if (res && res.data && res.data.length > 0) {
                list = res.data;
            }
            let selfIndex = -1;
            let selfData = null;
            let rankSelf = null;
            let rankThree = [];
            let rankList = list.map(entry => {
                let data = {};
                entry.KVDataList.forEach(KVData => {
                    data[KVData.key] = KVData.value;
                });
                let playerId = entry.openid;
                let nickname = entry.nickname;
                let avatarUrl = entry.avatarUrl;
                let timestamp = 0;
                let score = 0;
                let extraData = '';
                let jsonData = tryParseJson(data[key]) || {};
                extraData = jsonData.extraData || '';
                if (jsonData.wxgame) {
                    score = jsonData.wxgame.score || 0;
                    timestamp = jsonData.wxgame.update_time || 0;
                }
                return {
                    playerId,
                    nickname,
                    avatarUrl,
                    score,
                    timestamp,
                    extraData,
                }
            }).sort(function (obj1, obj2) {
                return obj2.score - obj1.score;
            }).splice(offset, count).map((item, index) => {
                let self = item.nickname === selfInfo.nickname && item.avatarUrl === selfInfo.avatarUrl;
                if (self) {
                    rankSelf = item;
                    selfIndex = index;
                    selfData = {
                        score: item.score,
                        extraData: item.extraData
                    }
                }
                Object.assign(item, { self, rank: index + 1 });
                return item;
            });
            if (selfIndex <= 0) {
                rankThree = rankList.slice(0, 3);
            } else {
                rankThree = rankList.slice(selfIndex - 1, selfIndex + 1);
            }
            callback && callback({ selfInfo, rankList, rankSelf, selfData, rankThree });
        }
    });
}

export function fetchRankData(key, count, offset, cb) {
    let rankData = {};
    fetchSelfInfo((selfInfo) => {
        fetchRankList(selfInfo, key, count, offset, (data) => {
            Object.assign(rankData, data);
            cb && cb(rankData)
        });
    })
}