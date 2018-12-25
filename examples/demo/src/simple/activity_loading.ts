class LoadingActivity extends Tape.Activity {

    onCreate() {
        let options = {
            imageUrl: 'res/unpack/default_share_img.png',
            x: 100,
            y: 100,
            width: 100,
            height: 100
        }
        Tape.app.getUserInfo((userInfo) => {
            console.log('----------------------userinfo--------------------', userInfo);
            this.redirectTo(SimpleActivity);
        }, options);
    }

}
