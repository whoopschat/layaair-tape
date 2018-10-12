import { toAny, toStr } from "./any";

let _dataByKey = {};
let _keyPrefix = 'tape_';

function getDataFactory(presistent) {
    return (key, def) => {
        let realKey = `${_keyPrefix}${key}`;
        if (!_dataByKey.hasOwnProperty(realKey) && presistent) {
            _dataByKey[realKey] = !!localStorage ? localStorage.getItem(realKey) || def : def;
        }
        return toAny(_dataByKey[realKey], def);
    }
}

export const getStorageData = getDataFactory(true);
export const getSessionData = getDataFactory(false);

function setDataFactory(presistent) {
    return (key, data) => {
        let realKey = `${_keyPrefix}${key}`;
        _dataByKey[realKey] = data;
        if (!presistent) {
            return;
        }
        localStorage && localStorage.setItem(realKey, toStr(data));
    };
}

export const setStorageData = setDataFactory(true);
export const setSessionData = setDataFactory(false);

function removeDataFactory(presistent) {
    return (key) => {
        let realKey = `${_keyPrefix}${key}`;
        delete _dataByKey[realKey];
        if (!presistent) {
            return;
        }
        localStorage && localStorage.removeItem(realKey);
    };
}

export const removeStorageData = removeDataFactory(true);
export const removeSessionData = removeDataFactory(false);