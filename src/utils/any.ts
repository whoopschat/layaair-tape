function _toNumber_(value) {
    try {
        return JSON.parse(value);
    } catch (ex) {
        return parseFloat(value);
    }
}

function _toBoolean_(value) {
    return !!value && value != 'false' && value != '0';
}

function _toString_(value, def) {
    try {
        let type = typeof value;
        if (type === 'string') {
            return value;
        } else if (type === 'boolean') {
            return value ? 'true' : 'false';
        } else if (type === 'number') {
            return `${value}`;
        } else if (type === 'object') {
            return JSON.stringify(value);
        }
    } catch (ex) {
    }
    return def;
}

function _toObject_(value, def) {
    if (typeof value === 'object') {
        return value;
    }
    try {
        return JSON.parse(value);
    } catch (ex) {
    }
    return def;
}

function _inferType(value) {
    if (typeof value !== 'string') {
        return typeof value;
    }
    try {
        const parsed = JSON.parse(value);
        return typeof parsed;
    } catch (ex) {
        // might be a pure number
        const number = parseFloat(value);
        if (!isNaN(number) && `${number}` === value) {
            return 'number';
        }
        return 'string';
    }
}

export function toAny(value, def) {
    if (value === undefined || value === null) {
        return def;
    }
    // try to infer type and return
    let type = _inferType(value);
    if (def !== undefined && def !== null) {
        type = typeof def;
    }
    switch (type) {
        case 'number':
            return _toNumber_(value);
        case 'boolean':
            return _toBoolean_(value);
        case 'object':
            return _toObject_(value, def);
        case 'string':
            return _toString_(value, def);
        default:
            break;
    }
    return def;
}