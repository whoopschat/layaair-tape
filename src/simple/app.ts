module App {

    export class Main extends Tape.Activity {

        private page1 = new ui.Page1UI();

        protected onCreate() {
            this.addChild(this.page1);
            this.inEase = Laya.Ease.linearIn;
            this.inEaseDuration = 300;
            this.inEaseFromProps = {
                y: this.height
            }
            this.inEaseToProps = {
                y: 0
            }
            this.outEase = Laya.Ease.linearIn;
            this.outEaseDuration = 300;
            this.outEaseFromProps = {
                y: 0
            }
            this.outEaseToProps = {
                y: this.height
            }
            this.page1.btn.on(Laya.Event.CLICK, this, () => {
                this.navigate("Page2");
            });
            this.page1.btnBack.on(Laya.Event.CLICK, this, () => {
                this.back();
            });
        }

        protected onPause() {
        }

        protected onResume() {
        }

        protected onDestroy() {
        }
    }


    export class Page2 extends Tape.Activity {

        private page2 = new ui.Page2UI();

        protected onCreate() {
            console.log('Page2.onCreate');
            this.addChild(this.page2);
            this.page2.btn.on(Laya.Event.CLICK, this, () => {
                this.navigate("Main", {}, () => {
                    this.back();
                });
            })
        }

        protected onPause() {
        }

        protected onResume() {
        }

        protected onDestroy() {
        }

        protected onNextProgress(progress) {
        }

    }

}