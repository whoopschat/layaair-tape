const _execWX = (func, ...options) => {
    if (window.hasOwnProperty("wx")) {
        if (window['wx'].hasOwnProperty(func)) {
            return window['wx'][func](...options);
        }
    }
};

const _onMessage = (messageCallback) => {
    _execWX('onMessage', (message) => {
        messageCallback && messageCallback(message);
    });
};

let _env = '${env}';
let _offsetX = 0;
let _offsetY = 0;
let _designWidth = 0;
let _designHeight = 0;

const init = (onMessage) => {
    printLog('init...');
    printLog('wxrank version:${version}');
    Laya.MiniAdpter.init(true, true);
    Laya.init(750, 1334);
    _onMessage((msg) => {
        try {
            if (msg.isLoad === 'filedata') {
                Laya['MiniFileMgr']['ziyuFileData'][msg.url] = msg.data;
                Laya.loader.load(msg.url);
            } else if (msg.isLoad == "filenative") {
                if (msg.isAdd) {
                    Laya['MiniFileMgr']['filesListObj'][msg.url] = msg.data;
                } else {
                    delete Laya['MiniFileMgr']['filesListObj'][msg.url];
                }
            } else {
                printDebug("message:", msg);
                if (msg.action && msg.action === 'initRank' && msg.data) {
                    Laya.stage.width = msg.data.width;
                    Laya.stage.height = msg.data.height;
                    _offsetX = msg.data.offsetX;
                    _offsetY = msg.data.offsetY;
                    _designWidth = msg.data.designWidth;
                    _designHeight = msg.data.designHeight;
                    Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;
                    Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
                } else {
                    onMessage && onMessage(msg);
                }
            }
        } catch (error) {
            printDebug("Error", error)
        }
    });
};

function setUserCloudStorage(options = {}) {
    _execWX('setUserCloudStorage', options);
};

function removeUserCloudStorage(options = {}) {
    _execWX('removeUserCloudStorage', options);
}

function getUserCloudStorage(options = {}) {
    _execWX('getUserCloudStorage', options);
}

function getFriendCloudStorage(options = {}) {
    _execWX('getFriendCloudStorage', options);
}

function getGroupCloudStorage(options = {}) {
    _execWX('getGroupCloudStorage', options);
}

function getUserInfo(options = {}) {
    _execWX('getUserInfo', options);
}

function printLog(message, ...options) {
    console.log("WXRank:", message, ...options);
}

function printDebug(message, ...options) {
    if (_env != 'production') {
        console.log("WXRank:", message, ...options);
    }
}

function getOffestX() {
    return _offsetX;
}

function getOffestY() {
    return _offsetY;
}

function getDesignWidth() {
    return _designWidth;
}

function getDesignHeight() {
    return _designHeight;
}

export default {
    getOffestX,
    getOffestY,
    getDesignWidth,
    getDesignHeight,
    init,
    setUserCloudStorage,
    getUserCloudStorage,
    removeUserCloudStorage,
    getFriendCloudStorage,
    getGroupCloudStorage,
    getUserInfo,
    printDebug,
    printLog,
}