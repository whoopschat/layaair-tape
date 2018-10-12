function _toBoolean_(value) {
    return value === 'true' || value === '1';
}

function _toNumber_(value) {
    try {
        return JSON.parse(value);
    } catch (ex) {
        return parseFloat(value);
    }
}

function _toObject_(value) {
    try {
        return JSON.parse(value);
    } catch (ex) {
        return null;
    }
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


function _toString_(value) {
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
        return null;
    } catch (ex) {
        return null;
    }
}

export function toAny(value, defaultValue) {

    if (value === undefined || value === null) {
        return defaultValue;
    }

    // try to infer type and return
    let type = _inferType(value);

    if (defaultValue !== undefined && defaultValue !== null) {
        type = typeof defaultValue;
    }

    switch (type) {
        case 'boolean':
            return _toBoolean_(value);
        case 'number':
            return _toNumber_(value);
        case 'object':
            return _toObject_(value);
        case 'string':
            return _toString_(value);
        default:
            break;
    }
    return value;
}

export function toStr(value) {
    return toAny(value, '')
}