import NavLoader from "./loader";
import UIMgr from "../manager/uimgr";

let _loaders = [];
let _loading = false;

function _all() {
    return _loaders;
}

function _length() {
    return _loaders.length;
}

function _getStack(index = 0) {
    var len = _length();
    return len > index ? _loaders[len - 1 - index] : null;
}

function _showStack(index = 0, anim = false, callback = null) {
    let stack = _getStack(index);
    if (!stack) {
        return;
    }
    stack.show(anim && _length() > 1, callback);
}

function _pushStack(stack) {
    _loaders.push(stack);
}

function _refreshStack(callback) {
    _showStack(0, true, () => {
        let stack = _getStack(1);
        if (!stack) {
            return;
        }
        stack.hide();
        callback && callback();
    });
}

function _finishStack(stacks) {
    if (!stacks || stacks.length <= 0) {
        return;
    }
    for (var i = 0; _length() > 1 && i < stacks.length; i++) {
        var stack = stacks[i];
        _loaders.splice(_loaders.indexOf(stack), 1);
        stack.hide();
        stack.exit();
    }
    _showStack(0);
}

function _popStack(count) {
    if (count >= _length()) {
        count = _length() - 1;
    }
    if (count <= 0) {
        return;
    }
    let pops = _loaders.splice(_length() - count, count);
    pops.forEach(element => {
        element.hide();
        element.exit();
    });
    _showStack(0);
}

export function setFocus(focus) {
    let stack = _getStack();
    if (stack) {
        stack.focus(focus);
    }
}

function navigate(page, params = {}, action = null) {
    new NavLoader({
        page,
        params,
        onShow: () => {
            _refreshStack(() => {
                action && action(true);
            });
        },
        onLoaded: (loader) => {
            _loading = false;
            UIMgr.addUI(loader);
            _pushStack(loader);
        },
        onLoadProgress: (loader, progress) => {
            if (_loading) {
                var stack = _getStack();
                stack && stack.nextProgress(progress);
            }
        }
    });
}

function popToTop() {
    _popStack(_length());
}

function pop(number = 1) {
    _popStack(number)
}

function finish(page, instance = null) {
    var stacks = [];
    _all().forEach(stack => {
        if (stack.canFinish(page, instance)) {
            stacks.push(stack);
        }
    });
    _finishStack(stacks);
}

export default {
    navigate,
    pop,
    popToTop,
    finish,
}