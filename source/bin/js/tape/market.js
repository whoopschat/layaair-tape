// =========================== //
// tape market.js
// =========================== //
var Tape;
(function (Tape) {
    var Market = /** @class */ (function () {
        function Market() {
        }
        Market.is_conch = function () {
            return window.hasOwnProperty('conch');
        };
        Market.authorize = function (jsonParam, callback) {
            if (this.is_conch()) {
                Laya.conchMarket.authorize(jsonParam, callback);
            }
            else {
                this.onAuthorize && this.onAuthorize(jsonParam, callback);
            }
        };
        Market.sendMessage = function (jsonParam, callback) {
            if (this.is_conch()) {
                Laya.conchMarket.sendMessageToPlatform(jsonParam, callback);
            }
            else {
                this.onSendMessage && this.onSendMessage(jsonParam, callback);
            }
        };
        Market.enterShare = function (jsonParam, callback) {
            if (this.is_conch()) {
                Laya.conchMarket.enterShareAndFeed(jsonParam, callback);
            }
            else {
                this.onEnterShare && this.onEnterShare(jsonParam, callback);
            }
        };
        Market.getUserInfo = function (jsonParam, callback) {
            if (this.is_conch()) {
                Laya.conchMarket.getUserInfo(jsonParam, callback);
            }
            else {
                this.onGetUserInfo && this.onGetUserInfo(jsonParam, callback);
            }
        };
        Market.getMarketName = function () {
            if (this.is_conch()) {
                return Laya.conchMarket.getMarketName();
            }
            else {
                return this.onGetMarketName && this.onGetMarketName();
            }
        };
        Market.getFriends = function (jsonParam, callback) {
            if (this.is_conch()) {
                Laya.conchMarket.getGameFriends(jsonParam, callback);
            }
            else {
                this.onGetFriends && this.onGetFriends(jsonParam, callback);
            }
        };
        Market.login = function (jsonParam, callback) {
            if (this.is_conch()) {
                Laya.conchMarket.login(jsonParam, callback);
            }
            else {
                this.onLogin && this.onLogin(jsonParam, callback);
            }
        };
        Market.logout = function (jsonParam, callback) {
            if (this.is_conch()) {
                Laya.conchMarket.logout(jsonParam, callback);
            }
            else {
                this.onLogout && this.onLogout(jsonParam, callback);
            }
        };
        Market.onAuthorize = null;
        Market.onSendMessage = null;
        Market.onEnterShare = null;
        Market.onGetMarketName = null;
        Market.onGetUserInfo = null;
        Market.onGetFriends = null;
        Market.onLogin = null;
        Market.onLogout = null;
        return Market;
    }());
    Tape.Market = Market;
})(Tape || (Tape = {}));
