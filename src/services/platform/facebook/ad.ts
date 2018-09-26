import platform from "../../../utils/platform";
import { IAd } from "../interfaces";

class FBAd implements IAd {

    private _adId = '';

    public configRewardedVideoAd(platform: string, adId: string) {
        if (platform == 'facebook') {
            this._adId = adId;
        }
    }

    public watchRewardedVideoAd(onRewarded?: () => void, onCancal?: () => void, onError?: (error: any) => void) {
        let rewardedVideoAd = null;
        platform.execFB('getRewardedVideoAsync', this._adId).then(function (rewardedVideo) {
            rewardedVideoAd = rewardedVideo;
            return rewardedVideoAd.loadAsync();
        }).catch(function (err) {
            onError && onError(err);
            throw err;
        }).then(function () {
            return rewardedVideoAd.showAsync()
                .then(() => {
                    onRewarded && onRewarded();
                }).catch(() => {
                    onCancal && onCancal();
                });
        });
    }

}

export const fbAd = new FBAd;