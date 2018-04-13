var Tape;
(function (Tape) {
    var __param = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    };
    var WeChat = /** @class */ (function () {
        function WeChat() {
        }
        WeChat.is_import_sdk = function () {
            return window.hasOwnProperty("wx");
        };
        WeChat.init = function (appId, success) {
            this.__wechatCode__ = __param("code");
            if (!this.__wechatCode__ && this.is_weixn()) {
                var url = encodeURIComponent(location.origin + location.pathname);
                location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
                    + appId
                    + '&redirect_uri='
                    + url
                    + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            }
            if (this.__wechatCode__) {
                success && success(this.__wechatCode__);
            }
        };
        WeChat.configTicket = function (configMap, shareOptions, onShareSuccess, onShareCancel, onError) {
            if (configMap === void 0) { configMap = {}; }
            if (shareOptions === void 0) { shareOptions = {}; }
            if (onShareSuccess === void 0) { onShareSuccess = null; }
            if (onShareCancel === void 0) { onShareCancel = null; }
            if (onError === void 0) { onError = null; }
            if (this.is_import_sdk() && this.is_weixn()) {
                var configOptions = {
                    appId: configMap['appId'] || '',
                    timestamp: configMap['timestamp'] || '',
                    nonceStr: configMap['nonceStr'] || '',
                    signature: configMap['signature'] || '',
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                };
                window['wx'].config(configOptions);
                window['wx'].onMenuShareTimeline({
                    title: shareOptions['title'] || '',
                    link: shareOptions['link'] || location.origin + location.pathname,
                    imgUrl: shareOptions['imageUrl'] || '',
                    success: function (res) {
                        onShareSuccess && onShareSuccess(res);
                    },
                    cancel: function (res) {
                        onShareCancel && onShareCancel(res);
                    }
                });
                window['wx'].onMenuShareAppMessage({
                    title: shareOptions['title'] || '',
                    desc: shareOptions['link'] || location.origin + location.pathname,
                    link: shareOptions['desc'] || '',
                    imgUrl: shareOptions['imageUrl'],
                    success: function (res) {
                        onShareSuccess && onShareSuccess(res);
                    },
                    cancel: function (res) {
                        onShareCancel && onShareCancel(res);
                    }
                });
                window['wx'].error(function (res) {
                    onError && onError(res);
                });
            }
        };
        WeChat.__wechatCode__ = null;
        WeChat.is_weixn = function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) + '' == "micromessenger") {
                return true;
            }
            else {
                return false;
            }
        };
        return WeChat;
    }());
    Tape.WeChat = WeChat;
})(Tape || (Tape = {}));
