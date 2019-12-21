package layaair.game.Market;

import android.app.Activity;

/**
 * Created by liangmayong on 2018-12-7.
 */

public class TapeBridgeManager {

    private static ITapeGameBridge bridge = null;

    public static void setBridge(ITapeGameBridge bridge) {
        TapeBridgeManager.bridge = bridge;
    }

    public static void handleOnMessage(Activity activity, String message, OnMarketCallback callback) {
        if (bridge != null) {
            bridge.handleOnMessage(activity, message, callback);
        }
    }

    public static void handleOnResume(Activity activity) {
        if (bridge != null) {
            bridge.handleOnResume(activity);
        }
    }

    public static void handleOnPause(Activity activity) {
        if (bridge != null) {
            bridge.handleOnPause(activity);
        }
    }

}
