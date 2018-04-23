// =========================== //
// tape market.js
// =========================== //
module Tape {

    export class MarketHandler {

        public static onAuthorize: Function = null;
        public static onSendMessage: Function = null;
        public static onEnterShare: Function = null;
        public static onGetMarketName: Function = null;
        public static onGetUserInfo: Function = null;
        public static onGetFriends: Function = null;
        public static onLogin: Function = null;
        public static onLogout: Function = null;
        public static onRecharge: Function = null;

        public static isConchApp(): boolean {
            return window.hasOwnProperty('conch');
        }

        public static showAlertOnJsException(show: boolean): void {
            if (window.hasOwnProperty("showAlertOnJsException")) {
                window["showAlertOnJsException"](show);
            }
        }

        public static setOnBackPressedFunction(onBackPressed: Function): void {
            if (this.isConchApp() && window["conch"].hasOwnProperty("setOnBackPressedFunction")) {
                window["conch"].setOnBackPressedFunction(() => {
                    onBackPressed && onBackPressed();
                });
            }
        }

    }

    export class Market {

        public static isConchApp(): boolean {
            return MarketHandler.isConchApp();
        }

        public static getDeviceInfo(): Object {
            if (this.isConchApp()) {
                try {
                    return JSON.parse(window["conch"].config.getDeviceInfo());
                } catch (error) {
                }
            }
            return {};
        }

        public static getMarketName(): string {
            if (this.isConchApp()) {
                return Laya.conchMarket.getMarketName();
            } else {
                return MarketHandler.onGetMarketName && MarketHandler.onGetMarketName();
            }
        }

        public static authorize(jsonParam: string, callback: Function = null): void {
            if (this.isConchApp()) {
                Laya.conchMarket.authorize(jsonParam, callback);
            } else {
                MarketHandler.onAuthorize && MarketHandler.onAuthorize(jsonParam, callback);
            }
        }

        public static login(jsonParam: string, callback: Function = null): void {
            if (this.isConchApp()) {
                Laya.conchMarket.login(jsonParam, callback);
            } else {
                MarketHandler.onLogin && MarketHandler.onLogin(jsonParam, callback);
            }
        }

        public static logout(jsonParam: string, callback: Function = null): void {
            if (this.isConchApp()) {
                Laya.conchMarket.logout(jsonParam, callback);
            } else {
                MarketHandler.onLogout && MarketHandler.onLogout(jsonParam, callback);
            }
        }

        public static recharge(jsonParam: string, callback: Function = null): void {
            if (this.isConchApp()) {
                Laya.conchMarket.recharge(jsonParam, callback);
            } else {
                MarketHandler.onRecharge && MarketHandler.onRecharge(jsonParam, callback);
            }
        }

        public static sendMessage(jsonParam: string, callback: Function = null): void {
            if (this.isConchApp()) {
                Laya.conchMarket.sendMessageToPlatform(jsonParam, callback);
            } else {
                MarketHandler.onSendMessage && MarketHandler.onSendMessage(jsonParam, callback);
            }
        }

        public static enterShare(jsonParam: string, callback: Function = null): void {
            if (this.isConchApp()) {
                Laya.conchMarket.enterShareAndFeed(jsonParam, callback);
            } else {
                MarketHandler.onEnterShare && MarketHandler.onEnterShare(jsonParam, callback);
            }
        }

        public static getUserInfo(jsonParam: string, callback: Function = null): void {
            if (this.isConchApp()) {
                Laya.conchMarket.getUserInfo(jsonParam, callback);
            } else {
                MarketHandler.onGetUserInfo && MarketHandler.onGetUserInfo(jsonParam, callback);
            }
        }

        public static getFriendList(jsonParam: string, callback: Function = null): void {
            if (this.isConchApp()) {
                Laya.conchMarket.getGameFriends(jsonParam, callback);
            } else {
                MarketHandler.onGetFriends && MarketHandler.onGetFriends(jsonParam, callback);
            }
        }

    }

}