## Getting Started
> getting started

#### Simple [view src](../examples/demo)
```js
Tape.init(750, 1334); // Tape.init3D(750, 1334);
Tape.bg.setBgColor('#02021a');
Tape.start({
    mainPage: LoadingActivity,
    commonRes: [
        { url: 'res/atlas/res/loading.atlas', type: Laya.Loader.ATLAS },
    ]
});
```

#### view runtime
* `runtime.btn`
* `runtime.btn_img`
* `runtime.btn_label`
* `runtime.btn_sprite`
* `runtime.btn_box`

#### [Documentation](./)
#### [API definition (Tape.d.ts)](../include/tape.d.ts)

