class LoadingActivity extends Tape.Activity {

    onCreate() {
        Tape.app.getUserInfo((userInfo) => {
            console.log('----------------------userinfo--------------------', userInfo);
            this.redirectTo(SimpleActivity);
        });
    }

}
