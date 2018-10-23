function randomUUID() {
    let _s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (_s4() + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + _s4() + _s4());
}

function randomNumber(minNum: number, maxNum: number) {
    switch (arguments.length) {
        case 1:
            return Math.random() * minNum + 1;
        case 2:
            return Math.random() * (maxNum - minNum + 1) + minNum;
        default:
            return 0;
    }
}

function randomInteger(minNum: number, maxNum: number) {
    switch (arguments.length) {
        case 1:
            return Math.floor(Math.random() * minNum + 1);
        case 2:
            return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
        default:
            return 0;
    }
}

function randomArray(source: any[], length: number = -1): Array<any> {
    let randomLength = length == -1 ? source.length : length;
    randomLength = Math.min(randomLength, source.length);
    var copy: Array<any> = source.concat([]);
    var result: Array<any> = [];
    while (result.length < randomLength) {
        let randomObj = randomArrayItem(copy);
        result.push(randomObj);
        copy.splice(copy.indexOf(randomLength), 1);
    }
    return result;
}

function randomArrayItem(source: any[]): any {
    if (source.length > 0) {
        return source[Math.floor(Math.random() * source.length)];
    }
    return undefined;
}

function tryToObject(source) {
    if (typeof source === 'object') {
        return source;
    }
    try {
        return JSON.parse(source);
    } catch (error) {
        return source;
    }
}

function anyToArray(source: any) {
    if (source === null || source === '' || source === undefined) {
        return [];
    }
    let value = tryToObject(source);
    if (typeof value === 'string') {
        return value.split(',');
    }
    if (value instanceof Array) {
        return value;
    } else {
        return [value]
    }
}

export default {
    randomUUID,
    randomInteger,
    randomNumber,
    randomArray,
    randomArrayItem,
    anyToArray,
    tryToObject,
}