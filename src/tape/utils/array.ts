module Tape {

    module ArrayUtil {

        export function random(source: Array<any>): Object {
            return source[Math.floor(Math.random() * source.length)];
        }

        export function randomArr(source: Array<any>, length: number = -1): Array<any> {
            let randomLength = length == -1 ? source.length : length;
            randomLength = Math.min(randomLength, source.length);
            var copy: Array<any> = source.concat([]);
            var result: Array<any> = new Array<any>();
            while (result.length < randomLength) {
                let randomObj = random(copy);
                result.push(randomObj);
                copy.splice(copy.indexOf(randomLength), 1);
            }
            return result;
        }
        
    }

}