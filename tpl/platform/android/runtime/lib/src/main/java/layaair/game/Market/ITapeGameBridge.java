package layaair.game.Market;

import android.app.Activity;

public interface ITapeGameBridge {

    void handleOnMessage(Activity activity, String message, OnMarketCallback callback);

    void handleOnResume(Activity activity);

    void handleOnPause(Activity activity);

}
