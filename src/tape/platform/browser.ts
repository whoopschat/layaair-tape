module Tape {

    /** BrowserHandler  */
    export module BrowserHandler {

        export const init = (width: number, height: number, ...options) => {
            Screen.init(width, height, ...options);
        }

        export const exit = () => {
        }

    }

}