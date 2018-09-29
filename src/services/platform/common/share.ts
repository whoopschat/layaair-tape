let _defaultTitle = '这么好玩的游戏，大家快来围观！';
let _defaultImage = 'res/unpack/default_share_img.png';
let _configs = [];

function _randomArray(source) {
    if (source.length > 0) {
        return source[Math.floor(Math.random() * source.length)];
    }
    return undefined;
}

function configShare(title: string, image: string, configs?: object[]) {
    _defaultTitle = title;
    _defaultImage = image;
    _configs = configs || [];
}

function getShareOptions(tag = null) {
    let filter = _configs.filter((item) => {
        if (tag && tag != '' && tag != 'default') {
            return tag == item.tag;
        } else {
            return !(item.tag && item.tag != '' && item.tag != 'default');
        }
    });
    let config = _randomArray(filter.length > 0 ? filter : _configs) || {};
    return {
        text: config.title || _defaultTitle,
        image: _randomArray(config.images || []) || _defaultImage
    }
}

export default {
    configShare,
    getShareOptions,
}