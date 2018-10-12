## Tape.init

#### Simple [Src](../examples/demo)
```js
Tape.init(750, 1334);
Tape.bg.setBgColor('#02021a');
Tape.start({
    mainPage: LoadingActivity,
    commonRes: [
        { url: 'res/atlas/res/loading.atlas', type: Laya.Loader.ATLAS },
    ]
});
```