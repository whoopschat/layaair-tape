// =========================== //
// Tape NumUtil.js
// =========================== //
module Tape {

    export class NumUtil {

        /**
         * rangedNum
         * @param val curr number
         * @param min min number
         * @param max max number
         */
        public static rangedNum(val: number, min: number, max: number): number {
            if (val < min)
                return min;
            else if (val > max)
                return max;
            else
                return val;
        }

        /**
         * randomFloat
         * @param min min number default 0
         * @param max max number default 1
         */
        public static randomFloat(min: number = 0, max: number = 1): number {
            return Math.random() * (max - min) + min;
        }

        /**
         * randomInteger
         * @param min min number
         * @param max max number
         */
        public static randomInteger(min: number, max: number): number {
            return Math.floor(Math.random() * (max - min) + min);
        }

    }

}