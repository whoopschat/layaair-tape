## Tape.ToastView
> toast component

#### Simple [view src](../examples/demo)
```js
class SimpleToast extends Tape.ToastView {

    // bind ui
    ui = new ui.toast.simpleUI;

    onShow() {
        // on toast show
    }

    onHide() {
        // on toast hide
    }

}

```

#### Show Toast 
```js
Tape.toast.showToast(SimpleToast, { key1: 'value1' })
// or
SimpleToast.show({ key1: 'value1' });
```

#### Hide Toast 
```js
this.hide();
```

#### [Documentation](./)
#### [API definition (Tape.d.ts)](../include/tape.d.ts)