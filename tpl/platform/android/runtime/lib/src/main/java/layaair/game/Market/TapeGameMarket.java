package layaair.game.Market;


import android.content.Context;
import android.content.Intent;
import android.util.Log;

import layaair.game.PlatformInterface.LayaPlatformCallback;
import layaair.game.PlatformInterface.LayaPlatformInterface;

public class TapeGameMarket implements LayaPlatformInterface {

    private final String TAG = getClass().getSimpleName();
    private final String DEFAULT = "{}";

    private void printLog(String message) {
        Log.e(TAG, message);
    }

    @Override
    public void LP_Init(final Context activity) {
        printLog(">>>>>>>>LP_Init");
        LayaPlatformCallback.GetInstance().LP_InitCallback(0);
    }

    @Override
    public void LP_sendMessageToPlatform(final String jsonParam) {
        printLog(">>>>>>>>LP_sendMessageToPlatform jsonParam = " + jsonParam);
        for (ITapeGameMarket market : TapeGameEngine.MARKETS) {
            market.onGameMessage(jsonParam, new OnMarketCallback() {
                @Override
                public void callback(String json) {
                    printLog(">>>>>>>>LP_sendMessageToPlatform callback = " + json);
                    LayaPlatformCallback.GetInstance().LP_SendMessageToPlatformCallback(json != null ? json : DEFAULT);
                }
            });
        }
    }

    @Override
    public void LP_EnterPlatform(final String jsonParam) {
        printLog(">>>>>>>>LP_EnterPlatform jsonParam = " + jsonParam);
    }

    @Override
    public void LP_LeavePlatform(final String jsonParam) {
        printLog(">>>>>>>>LP_LeavePlatform jsonParam = " + jsonParam);
    }

    @Override
    public void LP_Login(final String jsonParam) {
        printLog(">>>>>>>>LP_Login jsonParam = " + jsonParam);
    }

    @Override
    public void LP_Logout(final String jsonParam) {
        printLog(">>>>>>>>LP_Logout jsonParam = " + jsonParam);
    }

    @Override
    public void LP_RefreshToken(final String jsonParam) {
        printLog(">>>>>>>>LP_RefreshToken jsonParam = " + jsonParam);
    }

    @Override
    public void LP_SwitchUser(final String jsonParam) {
        printLog(">>>>>>>>LP_SwitchUser jsonParam = " + jsonParam);
    }

    @Override
    public void LP_Recharge(final String jsonParam) {
        printLog(">>>>>>>>LP_Recharge jsonParam = " + jsonParam);
    }

    @Override
    public void LP_authorize(final String jsonParam) {
        printLog(">>>>>>>>LP_authorize jsonParam = " + jsonParam);
    }

    @Override
    public void LP_buyProps(final String jsonParam) {
        printLog(">>>>>>>>LP_buyProps jsonParam = " + jsonParam);
    }

    @Override
    public int LP_canSendToDesktop(final String jsonParam) {
        printLog(">>>>>>>>LP_canSendToDesktop jsonParam = " + jsonParam);
        return 0;
    }

    @Override
    public void LP_enterAccountMgr(final String jsonParam) {
        printLog(">>>>>>>>LP_enterAccountMgr jsonParam = " + jsonParam);
    }

    @Override
    public void LP_enterBBS(final String jsonParam) {
        printLog(">>>>>>>>LP_enterBBS jsonParam = " + jsonParam);
    }

    @Override
    public void LP_enterFeedback(final String jsonParam) {
        printLog(">>>>>>>>LP_enterFeedback jsonParam = " + jsonParam);
    }

    @Override
    public void LP_enterInvite(final String jsonParam) {
        printLog(">>>>>>>>LP_enterInvite jsonParam = " + jsonParam);
    }

    @Override
    public void LP_enterShareAndFeed(final String jsonParam) {
        printLog(">>>>>>>>LP_enterShareAndFeed jsonParam = " + jsonParam);
    }

    @Override
    public void LP_getGameFriends(final String jsonParam) {
        printLog(">>>>>>>>LP_getGameFriends jsonParam = " + jsonParam);
    }

    @Override
    public void LP_OnDestroy() {
        printLog(">>>>>>>>LP_OnDestroy");
    }

    @Override
    public void LP_onCreate(final Context activity) {
        printLog(">>>>>>>>LP_onCreate");
    }

    @Override
    public Boolean LP_onExit(final String jsonParam) {
        printLog(">>>>>>>>LP_onExit jsonParam = " + jsonParam);
        return null;
    }

    @Override
    public void LP_onGameEvent(final String jsonParam) {
        printLog(">>>>>>>>LP_onGameEvent jsonParam = " + jsonParam);
    }

    @Override
    public void LP_onPause(final String jsonParam) {
        printLog(">>>>>>>>LP_onPause jsonParam = " + jsonParam);
    }

    @Override
    public void LP_onResume(final Context context) {
        printLog(">>>>>>>>LP_onResume");
    }

    @Override
    public void LP_openTopicCircle(final String jsonParam) {
        printLog(">>>>>>>>LP_openTopicCircle jsonParam = " + jsonParam);
    }

    @Override
    public void LP_sendToDesktop(final String jsonParam) {
        printLog(">>>>>>>>LP_sendToDesktop jsonParam = " + jsonParam);
    }

    @Override
    public void LP_setRechargeInfo(final String jsonParam) {
        printLog(">>>>>>>>LP_setRechargeInfo jsonParam = " + jsonParam);
    }

    @Override
    public void LP_getAvailableLoginType(String jsonParam) {
        printLog(">>>>>>>>LP_getAvailableLoginType jsonParam = " + jsonParam);
    }

    @Override
    public String LP_getMarketValue(String jsonParam) {
        printLog(">>>>>>>>LP_getMarketValue jsonParam = " + jsonParam);
        return null;
    }

    @Override
    public void LP_getUserInfo(String jsonParam) {
        printLog(">>>>>>>>LP_getUserInfo jsonParam = " + jsonParam);
    }

    @Override
    public void LP_setMarketValue(String key, String value) {
        printLog(">>>>>>>>LP_setMarketValue key = " + key + ", value = " + value);
    }

    @Override
    public void LP_onStop(Context context) {
        printLog(">>>>>>>>LP_onStop");
    }

    @Override
    public void LP_onRestart(Context context) {
        printLog(">>>>>>>>LP_onRestart");
    }

    @Override
    public void onNewIntent(Intent intent) {
        printLog(">>>>>>>>onNewIntent");
    }

    @Override
    public void onActivityResult(int i, int i1, Intent intent) {
        printLog(">>>>>>>>onActivityResult");
    }

}
