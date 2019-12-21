function stringReplaceAll(str, s1, s2) {
    if (s1 === s2) {
        return str;
    }
    return str.split(s1).join(s2);
}

function parserOpts(opts, prefix, filter) {
    let obj = {};
    let parser = (key, val) => {
        Object.keys(val).forEach(k => {
            if (typeof val[k] === 'string') {
                let ak = `${key}.${k}`;
                if (!filter || filter(ak, opts[key])) {
                    obj[ak] = val[key];
                }
            } else if (typeof val[k] === 'object') {
                parser(`${key}.${k}`, val[k])
            }
        });
    };
    Object.keys(opts).forEach(key => {
        if (key.indexOf(prefix) == 0) {
            let _key = key.replace(prefix, '');
            let _value = opts[key];
            if (typeof _value === 'string') {
                let ak = stringReplaceAll(_key, "_", ".");
                if (!filter || filter(ak, opts[key])) {
                    obj[ak] = opts[key];
                }
            } else if (typeof _value === 'object') {
                parser(_key, _value);
            }
        }
    });
    return obj;
}

module.exports = {
    stringReplaceAll,
    parserOpts,
}