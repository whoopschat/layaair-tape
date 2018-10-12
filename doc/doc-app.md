## Tape.app
> App Module

#### Simple [view src](../examples/demo) 
```js
// get user info
Tape.app.getUserInfo((userinfo) => {
    console.log(' -------- get user info success -------', userinfo);
});
// handle onLaunch
Tape.app.onLaunch((options) => {
    // on launch
})
// handle onPause
Tape.app.onPause(() => {
    // on pause
})
```

#### [Documentation](./)
#### [API definition (Tape.d.ts)](../include/tape.d.ts)


