// =========================== //
// tape market.js
// =========================== //
module Tape {

    export class Market {

        public static onAuthorize: Function = null;
        public static onSendMessage: Function = null;
        public static onEnterShare: Function = null;
        public static onGetMarketName: Function = null;
        public static onGetUserInfo: Function = null;
        public static onGetFriends: Function = null;
        public static onLogin: Function = null;
        public static onLogout: Function = null;

        public static is_conch(): boolean {
            return window.hasOwnProperty('conch');
        }

        public static authorize(jsonParam: string, callback: Function) {
            if (this.is_conch()) {
                Laya.conchMarket.authorize(jsonParam, callback);
            } else {
                this.onAuthorize && this.onAuthorize(jsonParam, callback);
            }
        }

        public static sendMessage(jsonParam: string, callback: Function): void {
            if (this.is_conch()) {
                Laya.conchMarket.sendMessageToPlatform(jsonParam, callback);
            } else {
                this.onSendMessage && this.onSendMessage(jsonParam, callback);
            }
        }

        public static enterShare(jsonParam: string, callback: Function): void {
            if (this.is_conch()) {
                Laya.conchMarket.enterShareAndFeed(jsonParam, callback);
            } else {
                this.onEnterShare && this.onEnterShare(jsonParam, callback);
            }
        }

        public static getUserInfo(jsonParam: string, callback: Function): void {
            if (this.is_conch()) {
                Laya.conchMarket.getUserInfo(jsonParam, callback);
            } else {
                this.onGetUserInfo && this.onGetUserInfo(jsonParam, callback);
            }
        }

        public static getMarketName(): string {
            if (this.is_conch()) {
                return Laya.conchMarket.getMarketName();
            } else {
                return this.onGetMarketName && this.onGetMarketName();
            }
        }

        public static getFriends(jsonParam: string, callback: Function) {
            if (this.is_conch()) {
                Laya.conchMarket.getGameFriends(jsonParam, callback);
            } else {
                this.onGetFriends && this.onGetFriends(jsonParam, callback);
            }
        }

        public static login(jsonParam: string, callback: Function) {
            if (this.is_conch()) {
                Laya.conchMarket.login(jsonParam, callback);
            } else {
                this.onLogin && this.onLogin(jsonParam, callback);
            }
        }

        public static logout(jsonParam: string, callback: Function) {
            if (this.is_conch()) {
                Laya.conchMarket.logout(jsonParam, callback);
            } else {
                this.onLogout && this.onLogout(jsonParam, callback);
            }
        }
        
    }

}