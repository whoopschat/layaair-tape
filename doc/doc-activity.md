## Tape.Activity

#### Simple
```js
class LoadingActivity extends Tape.Activity {

    onFocus(focus) {
        // on focus changed
    }
    onCreate() {
        // on create
    }

    onResume(){
        // on resume
    }

    onPause(){
        // on pause
    }

    onDestroy(){
        // on destory
    }

    onNextProgress(progress){
        // on next load progress
    }

}

```

#### Open Activity 
```js
LoadingActivity.open({ key1: 'value1' });
```

#### Finish Activity 
```js
this.back();
```

#### Activity Navigator
* `this.redirectTo` Open new activity and close the current activity.
* `this.navigate`   Open new activity
* `this.back`       Close the current activity
* `this.pop`        Back multilevel activity
* `this.popToTop`   Back to the front activity


