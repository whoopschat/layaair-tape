module App {

    export class Main extends Tape.Activity {

        private page1 = new ui.Page1UI();

        public onCreate() {
            this.addChild(this.page1);
            this.inEase = Laya.Ease.linearIn;
            this.inEaseDuration = 300;
            this.inEaseFromProps = {
                y: this.height
            }
            this.inEaseToProps = {
                y: 0
            }
            this.page1.btn.on(Laya.Event.CLICK, this, () => {
                this.navigate(Page2);
            });
            this.page1.btnBack.on(Laya.Event.CLICK, this, () => {
                this.back();
            });
        }

    }


    export class Page2 extends Tape.Activity {

        private page2 = new ui.Page2UI();

        public onCreate() {
            this.addChild(this.page2);
            this.page2.btn.on(Laya.Event.CLICK, this, () => {
                this.navigate(Main);
            })
            this.page2.btnBack.on(Laya.Event.CLICK, this, () => {
                Tape.PopManager.showPop(A);
            });
        }

    }

}