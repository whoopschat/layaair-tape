import Open from './services/open';
import { showRank, hideRank, setRankKey, setRankScore } from './services/rank';

Open.init((msg) => {
    if (msg.action === 'showRank' && msg.data) {
        showRank(msg.data.ui);
    } else if (msg.action === 'hideRank' && msg.data) {
        hideRank();
    } else if (msg.action === 'setRankKey' && msg.data) {
        setRankKey(msg.data.key, msg.data.count, msg.data.offset);
    } else if (msg.action === 'setRankScore' && msg.data) {
        setRankScore(msg.data.key, msg.data.score, msg.data.extraData);
    }
});
