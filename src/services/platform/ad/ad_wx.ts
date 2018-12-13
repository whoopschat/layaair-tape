import env from "../../../utils/env";
import screen from "../../manager/screen";
import { IAd } from "../_inters";
import { fixWidthForWechat, fixHeightForWechat } from "../_size";

class Ad implements IAd {

    private _bannerAdId = '';
    private _bannerAd = null;
    private _rewardedAdId = '';
    private _rewardedVideoAd = null;
    private _rewardedVideoOnClose = null;
    private _rewardedVideoOnError = null;
    private _preloadRewardedVideo = false;
    private _emptyOnError = () => { };

    public isSupportedRewardedVideoAd() {
        return true;
    }

    public isPreloadRewardedVideoAd() {
        return this._preloadRewardedVideo;
    }

    public configRewardedVideoAd(platform: string, adId: string) {
        if (platform == env.getPlatform()) {
            this._rewardedAdId = adId;
            this._rewardedVideoAd = env.execWX('createRewardedVideoAd', {
                adUnitId: this._rewardedAdId
            });
            if (this._rewardedVideoAd) {
                try {
                    this._rewardedVideoAd.offError(this._emptyOnError);
                } catch (error) {
                }
                this._rewardedVideoAd.onError(this._emptyOnError);
                this._rewardedVideoAd.load().then(() => { this._preloadRewardedVideo = true; });
            }
        }
    }

    public watchRewardedVideoAd(onWatch?: () => void, onCancal?: () => void, onError?: (error: any) => void) {
        if (this._rewardedVideoAd) {
            try {
                this._rewardedVideoOnClose && this._rewardedVideoAd.offClose(this._rewardedVideoOnClose);
            } catch (error) {
            }
            try {
                this._rewardedVideoOnError && this._rewardedVideoAd.offError(this._rewardedVideoOnError);
            } catch (error) {
            }
            this._rewardedVideoOnClose = (res) => {
                if (res && res.isEnded || res === undefined) {
                    onWatch && onWatch();
                } else {
                    onCancal && onCancal();
                }
                this._rewardedVideoAd.load().then(() => { this._preloadRewardedVideo = true; });
            }
            this._rewardedVideoOnError = (err) => {
                onError && onError(err && err.errMsg || 'watchRewardedVideoAd:fail');
            }
            this._rewardedVideoAd.onClose(this._rewardedVideoOnClose);
            this._rewardedVideoAd.onError(this._rewardedVideoOnError);
            this._rewardedVideoAd.show().then(() => { this._preloadRewardedVideo = false; }).catch(() => {
                this._rewardedVideoAd.load().then(() => this._rewardedVideoAd.show()).catch(() => { });
            });
        } else {
            onError && onError('createRewardedVideoAd:fail')
        }
    }

    public isSupportedBannerAd() {
        return true;
    }

    public configBannerAd(platform: string, adId: string) {
        if (platform == env.getPlatform()) {
            this._bannerAdId = adId;
        }
    }

    public showBannerAd(x: number, y: number, width: number, height: number, onError?: (error: any) => void) {
        try {
            this.hideBannerAd();
            let realLeft = fixWidthForWechat(x + screen.getOffestX());
            let realTop = fixHeightForWechat(y + screen.getOffestY());
            let realWidth = fixWidthForWechat(width);
            let realHeight = fixHeightForWechat(height);
            if (realWidth < 300) {
                realWidth = 300;
            }
            this._bannerAd = env.execWX('createBannerAd', {
                adUnitId: this._bannerAdId,
                style: {
                    left: realLeft,
                    top: realTop,
                    width: realWidth,
                    height: realHeight
                }
            });
            if (this._bannerAd) {
                this._bannerAd.style.left = realLeft;
                this._bannerAd.style.top = realTop;
                this._bannerAd.style.width = realWidth;
                this._bannerAd.style.height = realHeight;
                this._bannerAd.onResize(res => {
                    if (this._bannerAd) {
                        let configZ = realWidth / realHeight;
                        let newZ = res.width / res.height;
                        let newL = realLeft;
                        let newT = realTop;
                        let newW = realWidth;
                        let newH = realHeight;
                        if (configZ < newZ) {
                            newH = realWidth / newZ;
                        } else {
                            newW = realHeight * newZ;
                        }
                        if (newW < 300) {
                            newW = 300;
                        }
                        newL = realLeft + ((realWidth - newW) / 2);
                        this._bannerAd.style.left = newL;
                        this._bannerAd.style.top = newT;
                        this._bannerAd.style.width = newW;
                        this._bannerAd.style.height = newH;
                    }
                });
                this._bannerAd.onError(err => {
                    onError && onError(err && err.errMsg || 'showBannerAd:fail');
                });
                this._bannerAd.show();
            } else {
                onError && onError('createBannerAd:fail')
            }
        } catch (error) {
            onError && onError('showBannerAd:fail')
        }
    }

    public hideBannerAd() {
        try {
            if (this._bannerAd && this._bannerAd.destroy) {
                this._bannerAd.destroy();
            }
            this._bannerAd = null;
        } catch (error) {
        }
    }

}

export default new Ad;
