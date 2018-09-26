class RankActivity extends Tape.Activity {

    ui = new ui.page.rankUI;

    onCreate() {
        this.ui.rankBox.addChild(Tape.rank.createRankView())
        this.ui.btnBack.on(Laya.Event.CLICK, this, () => {
            this.back();
        });
        Tape.rank.showRank(ui.test_rankUI.uiView);
        Tape.rank.setRankKey('score');
        Tape.rank.setRankScore('score', 1024, '---------');
    }

}
