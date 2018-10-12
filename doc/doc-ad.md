## Tape.ad
> Ad Module

#### Simple [view src](../examples/demo)
```js
Tape.ad.configRewardedVideoAd('facebook', 'xxxxxxxxxxxx_xxxxxxxxxxxxxx'); // facebook rewarded video ad id
Tape.ad.configRewardedVideoAd('wechat', 'adunit-xxxxxxxxxxxxxxxx'); // wechat rewarded video ad id
Tape.ad.watchRewardedVideoAd(() => {
    this.ui.output.text = `onRewarded --------------------`;
}, () => {
    this.ui.output.text = `onCancel --------------------`;
}, (err) => {
    this.ui.output.text = `onError --------------------\n${JSON.stringify(err)}`;
})
```

#### [Documentation](./)
#### [API definition (Tape.d.ts)](../include/tape.d.ts)