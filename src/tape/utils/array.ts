module Tape {

    export module ArrayUtil {

        export function random(source: any[]): Object {
            if (source.length > 0) {
                return source[Math.floor(Math.random() * source.length)];
            }
            return undefined;
        }

        export function randomArr(source: any[], length: number = -1): Array<any> {
            let randomLength = length == -1 ? source.length : length;
            randomLength = Math.min(randomLength, source.length);
            var copy: Array<any> = source.concat([]);
            var result: Array<any> = [];
            while (result.length < randomLength) {
                let randomObj = random(copy);
                result.push(randomObj);
                copy.splice(copy.indexOf(randomLength), 1);
            }
            return result;
        }

    }

}