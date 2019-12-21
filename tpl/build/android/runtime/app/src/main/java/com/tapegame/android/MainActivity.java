package com.tapegame.android;

import android.os.Bundle;

import com.tapegame.runtime.TapeGameActivity;

public class MainActivity extends TapeGameActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setGameUrl("http://stand.alone.version/index.html");
    }

}
