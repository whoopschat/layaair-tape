## Tape.PopupView
> popup component

#### Simple [view src](../examples/demo)
```js
class SimplePupup extends Tape.PopupView {

    // bind ui
    ui = new ui.popup.simpleUI;

    onShow() {
        // on popup show
    }

    onHide() {
        // on popup hide
    }

}

```

#### Show Popup 
```js
Tape.popup.showPopup(SimplePupup, { key1: 'value1' })
// or
SimplePupup.show({ key1: 'value1' });
```

#### Hide Popup 
```js
this.hide();
```

#### [Documentation](./)
#### [API definition (Tape.d.ts)](../include/tape.d.ts)
