import platform, { WECHAT } from "../../../utils/platform";
import screen from "../../manager/screen";
import { IAd } from "../interfaces";
import { fixWidth, fixHeight } from "./_size";

class WXAd implements IAd {

    private _rewardedAdId = '';
    private _bannerAdId = '';
    private _bannerAd = null;
    private _rewardedVideoAd = null;
    private _rewardedVideoCallback = null;

    public isSupportedRewardedVideoAd() {
        return true;
    }

    public configRewardedVideoAd(platform: string, adId: string) {
        if (platform == WECHAT) {
            this._rewardedAdId = adId;
        }
    }

    public watchRewardedVideoAd(onWatch?: () => void, onCancal?: () => void, onError?: (error: any) => void) {
        this._rewardedVideoAd = platform.execWX('createRewardedVideoAd', {
            adUnitId: this._rewardedAdId
        });
        if (this._rewardedVideoAd) {
            this._rewardedVideoCallback && this._rewardedVideoAd.offClose(this._rewardedVideoCallback);
            this._rewardedVideoCallback = (res) => {
                if (res && res.isEnded || res === undefined) {
                    onWatch && onWatch();
                } else {
                    onCancal && onCancal();
                }
            };
            this._rewardedVideoAd.onClose(this._rewardedVideoCallback);
            this._rewardedVideoAd.show().catch(err => {
                this._rewardedVideoAd.load().then(() => this._rewardedVideoAd.show()).catch(err => {
                    onError && onError(err.errMsg);
                });
            });
        } else {
            onError && onError('createRewardedVideoAd:fail')
        }
    }

    public isSupportedBannerAd() {
        return true;
    }

    public configBannerAd(platform: string, adId: string) {
        if (platform == WECHAT) {
            this._bannerAdId = adId;
        }
    }

    public showBannerAd(x: number, y: number, width: number, height: number, onError?: (error: any) => void) {
        this.hideBannerAd();
        let realLeft = fixWidth(x + screen.getOffestX());
        let realTop = fixHeight(y + screen.getOffestY());
        let realWidth = fixWidth(width);
        let realHeight = fixHeight(height);
        if (realWidth < 300) {
            realWidth = 300;
        }
        this._bannerAd = platform.execWX('createBannerAd', {
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
            });
            this._bannerAd.onError(err => {
                onError && onError(err && err.errMsg || 'showBannerAd:fail');
            });
            this._bannerAd.show();
        } else {
            onError && onError('createBannerAd:fail')
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

export const wxAd = new WXAd;
