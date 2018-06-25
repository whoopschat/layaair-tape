module Tape {

    /** UUID */
    export module UUID {

        function _s4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        export const randomUUID = () => {
            return (_s4() + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + "-" + _s4() + _s4() + _s4());
        }

    }

}
