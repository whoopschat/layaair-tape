import Open from "./open";
import { bindView } from "../utils/bind";
import { fetchRankData } from "./data";

let _rankData = {};
let _rankKey = null;
let _rankUi = null;
let _canDraw = true;
let _delayObj = null;
let _count = 100;
let _offset = 0;

function _drawRankView() {
    if (!_rankUi) {
        return;
    }
    Laya.stage.destroyChildren();
    if (_rankUi instanceof Array) {
        _rankUi.forEach((data) => {
            var view = Laya.View.createComp(data);
            if (view) {
                bindView(view, _rankData);
                Laya.stage.addChild(view);
            }
        });
    } else {
        var view = Laya.View.createComp(_rankUi);
        if (view) {
            view.x = Open.getOffestX();
            view.y = Open.getOffestY();
            bindView(view, _rankData);
            Laya.stage.addChild(view);
        }
    }
}

function _bindRankView() {
    if (!_rankUi) {
        return;
    }
    if (!_rankKey) {
        return;
    }
    if (!_canDraw) {
        return;
    }
    _canDraw = false;
    fetchRankData(_rankKey, _count, _offset, (data) => {
        Open.printDebug('rankData:', data);
        _rankData = data;
        _canDraw = true;
        for (let index = 0; index < Laya.stage.numChildren; index++) {
            bindView(Laya.stage.getChildAt(index), _rankData);
        }
    });
}

function _delayBindRankView() {
    if (_delayObj) {
        return;
    }
    _delayObj = setTimeout(() => {
        _delayObj = null;
        _bindRankView();
    }, 200)
}

export function setRankKey(key, count, offset) {
    _rankKey = key;
    _count = count;
    _offset = offset;
    _delayBindRankView();
}

export function setRankScore(key, score, extraData = '') {
    let KVDataList = [{
        key,
        value: JSON.stringify({
            wxgame: {
                score,
                update_time: Math.floor(Date.now() / 1000)
            },
            extraData
        })
    }];
    Open.setUserCloudStorage({
        KVDataList,
        success: () => {
            if (key == _rankKey) {
                _delayBindRankView();
            }
        }
    });
}

export function showRank(ui) {
    if (!_rankUi || JSON.stringify(ui) !== JSON.stringify(_rankUi)) {
        _rankUi = ui;
        _drawRankView();
    }
    _delayBindRankView();
}

export function hideRank() {
    _rankUi = null;
    Laya.stage.destroyChildren();
}