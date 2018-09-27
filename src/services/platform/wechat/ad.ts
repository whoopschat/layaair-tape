import platform from "../../../utils/platform";
import { IAd } from "../interfaces";

class WXAd implements IAd {

    private _adId = '';
    private _rewardedVideoAd = null;
    private _rewardedVideoCallback = null;

    public isSupportedRewardedVideoAd() {
        return true;
    }

    public configRewardedVideoAd(platform: string, adId: string) {
        if (platform == 'wechat') {
            this._adId = adId;
        }
    }

    public watchRewardedVideoAd(onWatch?: () => void, onCancal?: () => void, onError?: (error: any) => void) {
        this._rewardedVideoAd = platform.execWX('createRewardedVideoAd', {
            adUnitId: this._adId
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

}

export const wxAd = new WXAd;
