function removeItemForWhere(array, where) {
    if (typeof where === 'function') {
        let removeIndexArray = []
        array.forEach((value, index) => {
            if (where(value)) {
                removeIndexArray.push(index)
            }
        })
        removeIndexArray.reverse()
        removeIndexArray.forEach(index => {
            array.splice(index, 1);
        })
    }
}

class Looper {

    private _tasks = [];
    private _hasLoop = false;

    private _checkLoop() {
        if (this._tasks.length > 0) {
            if (!this._hasLoop) {
                Laya.timer.frameLoop(1, this, () => {
                    this._tasks.forEach(task => {
                        let { caller, callback } = task;
                        callback.apply(caller);
                    });
                });
                this._hasLoop = true;
            }
        } else {
            if (this._hasLoop) {
                Laya.timer.clearAll(this);
                this._hasLoop = false;
            }
        }
    }

    public loop(caller: Object, callback: () => void) {
        let filterTasks = this._tasks.filter((task) => {
            return task.caller == caller && task.callback == callback;
        })
        if (filterTasks.length == 0) {
            this._tasks.push({
                caller,
                callback,
            });
            this._checkLoop();
        }
    }

    public clear(caller: Object, callback: () => void) {
        removeItemForWhere(this._tasks, (task) => {
            return task.caller == caller && (!callback || task.callback == callback);
        });
        this._checkLoop();
    }

}

export default new Looper;