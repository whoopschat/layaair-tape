// =========================== //
// tape market.js
// =========================== //
var Tape;
(function (Tape) {
    /**
     * MarketHandler
     */
    var MarketHandler = /** @class */ (function () {
        function MarketHandler() {
        }
        MarketHandler.isConchApp = function () {
            return window.hasOwnProperty('conch');
        };
        MarketHandler.conchShowAlertOnJsException = function (show) {
            if (this.isConchApp() && window.hasOwnProperty("showAlertOnJsException")) {
                window["showAlertOnJsException"](show);
            }
        };
        MarketHandler.conchSetOnBackPressedFunction = function (onBackPressed) {
            if (this.isConchApp() && window["conch"].hasOwnProperty("setOnBackPressedFunction")) {
                window["conch"].setOnBackPressedFunction(function () {
                    onBackPressed && onBackPressed();
                });
            }
        };
        MarketHandler.conchExit = function () {
            if (this.isConchApp() && window["conch"].hasOwnProperty("exit")) {
                window["conch"].exit();
            }
        };
        MarketHandler.conchDeviceInfo = function () {
            if (this.isConchApp()) {
                try {
                    return JSON.parse(window["conch"].config.getDeviceInfo());
                }
                catch (error) {
                }
            }
            return {};
        };
        MarketHandler.onAuthorize = null;
        MarketHandler.onSendMessage = null;
        MarketHandler.onEnterShare = null;
        MarketHandler.onGetMarketName = null;
        MarketHandler.onGetUserInfo = null;
        MarketHandler.onGetFriends = null;
        MarketHandler.onLogin = null;
        MarketHandler.onLogout = null;
        MarketHandler.onRecharge = null;
        return MarketHandler;
    }());
    Tape.MarketHandler = MarketHandler;
    /**
     * Market
     */
    var Market = /** @class */ (function () {
        function Market() {
        }
        Market.getMarketName = function () {
            if (MarketHandler.isConchApp()) {
                return Laya.conchMarket.getMarketName();
            }
            else {
                return MarketHandler.onGetMarketName && MarketHandler.onGetMarketName();
            }
        };
        Market.authorize = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.authorize(jsonParam, callback);
            }
            else {
                MarketHandler.onAuthorize && MarketHandler.onAuthorize(jsonParam, callback);
            }
        };
        Market.login = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.login(jsonParam, callback);
            }
            else {
                MarketHandler.onLogin && MarketHandler.onLogin(jsonParam, callback);
            }
        };
        Market.logout = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.logout(jsonParam, callback);
            }
            else {
                MarketHandler.onLogout && MarketHandler.onLogout(jsonParam, callback);
            }
        };
        Market.recharge = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.recharge(jsonParam, callback);
            }
            else {
                MarketHandler.onRecharge && MarketHandler.onRecharge(jsonParam, callback);
            }
        };
        Market.sendMessage = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.sendMessageToPlatform(jsonParam, callback);
            }
            else {
                MarketHandler.onSendMessage && MarketHandler.onSendMessage(jsonParam, callback);
            }
        };
        Market.enterShare = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.enterShareAndFeed(jsonParam, callback);
            }
            else {
                MarketHandler.onEnterShare && MarketHandler.onEnterShare(jsonParam, callback);
            }
        };
        Market.getUserInfo = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.getUserInfo(jsonParam, callback);
            }
            else {
                MarketHandler.onGetUserInfo && MarketHandler.onGetUserInfo(jsonParam, callback);
            }
        };
        Market.getFriendList = function (jsonParam, callback) {
            if (callback === void 0) { callback = null; }
            if (MarketHandler.isConchApp()) {
                Laya.conchMarket.getGameFriends(jsonParam, callback);
            }
            else {
                MarketHandler.onGetFriends && MarketHandler.onGetFriends(jsonParam, callback);
            }
        };
        return Market;
    }());
    Tape.Market = Market;
})(Tape || (Tape = {}));
