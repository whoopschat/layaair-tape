class LoadingActivity extends Tape.Activity {

    ui = new ui.page.loadingUI

    onCreate() {
        console.log('----------');
        setTimeout(() => {
            this.redirectTo(MainActivity);
        }, 1000);
    }

}
