module Tape {

    const __param = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    export class WeChat {

        private constructor() {
        }

        private static __wechatCode__ = null;

        private static is_weixn = function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) + '' == "micromessenger") {
                return true;
            } else {
                return false;
            }
        }

        private static is_import_sdk() {
            return window.hasOwnProperty("wx");
        }

        public static auth(appId, success: Function) {
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
        }

        public static configShare(configMap = {}, shareOptions = {}, onShareSuccess: Function = null, onShareCancel: Function = null, onError: Function = null) {
            if (this.is_import_sdk() && this.is_weixn()) {
                const configOptions = {
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
                    success: res => {
                        onShareSuccess && onShareSuccess(res);
                    },
                    cancel: res => {
                        onShareCancel && onShareCancel(res);
                    }
                });
                window['wx'].onMenuShareAppMessage({
                    title: shareOptions['title'] || '',
                    desc: shareOptions['link'] || location.origin + location.pathname,
                    link: shareOptions['desc'] || '',
                    imgUrl: shareOptions['imageUrl'],
                    success: res => {
                        onShareSuccess && onShareSuccess(res);
                    },
                    cancel: res => {
                        onShareCancel && onShareCancel(res);
                    }
                });
                window['wx'].error(res => {
                    onError && onError(res);
                });
            }
        }
    }
}