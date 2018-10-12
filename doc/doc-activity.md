## Tape.Activity

#### Simple [Src](../examples/demo)
```js
class LoadingActivity extends Tape.Activity {
    
    // bind ui
    ui = new ui.page.loadingUI;

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
this.navigate(LoadingActivity, { key1: 'value1' })
// or
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


#### [API definition (Tape.d.ts)](../include/tape.d.ts)


