import platform from "../../../utils/platform";
import { IAd } from "../interfaces";

class WXAd implements IAd {

    private _adId = '';
    private _rewardedVideoAd = null;
    private _rewardedVideoCallback = null;

    public configRewardedVideoAd(platform: string, adId: string) {
        if (platform == 'wechat') {
            this._adId = adId;
        }
    }

    public watchRewardedVideoAd(onRewarded?: () => void, onCancal?: () => void, onError?: (error: any) => void) {
        this._rewardedVideoAd = platform.execWX('createRewardedVideoAd', {
            adUnitId: this._adId
        });
        if (this._rewardedVideoAd) {
            this._rewardedVideoCallback && this._rewardedVideoAd.offClose(this._rewardedVideoCallback);
            this._rewardedVideoCallback = (res) => {
                if (res && res.isEnded || res === undefined) {
                    onRewarded && onRewarded();
                } else {
                    onCancal && onCancal();
                }
            };
            this._rewardedVideoAd.onClose(this._rewardedVideoCallback);
            this._rewardedVideoAd.show().catch(err => {
                this._rewardedVideoAd.load().then(() => this._rewardedVideoAd.show()).catch(err => {
                    onError && onError(err);
                });
            });
        } else {
            onError && onError({
                errMsg: 'createRewardedVideoAd:fail',
                err_code: -1
            });
        }
    }

}

export const wxAd = new WXAd;
