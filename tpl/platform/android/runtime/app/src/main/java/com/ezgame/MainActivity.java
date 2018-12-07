package com.ezgame;

import android.os.Bundle;

import com.ezgame.runtime.EZGameActivity;

public class MainActivity extends EZGameActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setGameUrl("http://stand.alone.version/index.html");
    }

}
