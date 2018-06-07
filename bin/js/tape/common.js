var Tape;
(function (Tape) {
    /**
     * 初始化
     * @param width 宽度
     * @param height 高度
     * @param options 其他拓展
     */
    Tape.init = function (width, height) {
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        if (Tape.isMiniGame()) {
            Tape.MiniHandler.init.apply(Tape.MiniHandler, [width, height].concat(options));
        }
        else {
            Tape.ConchHandler.init.apply(Tape.ConchHandler, [width, height].concat(options));
        }
    };
    /**
     * 退出
     * @param success 成功回调
     * @param fail 失败回调
     * @param complete 完成回调，失败成功都会回调
     */
    Tape.exit = function () {
        if (Tape.isMiniGame()) {
            Tape.MiniHandler.exit();
        }
        else if (Tape.isConchApp()) {
            Tape.ConchHandler.exit();
        }
    };
})(Tape || (Tape = {}));
