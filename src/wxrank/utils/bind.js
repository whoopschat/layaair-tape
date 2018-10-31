function tryParseJson(data) {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data);
        } catch (e) {
            return data;
        }
    }
    return data;
}

function findDataByWhere(data, where) {
    let whereSplit = where.split('|');
    let name = whereSplit[0];
    let findValue = tryParseJson(data);
    if (!data) {
        findValue = null;
    } else if (data[name]) {
        findValue = tryParseJson(data[name]);
    } else {
        var nameSplit = name.split('.');
        nameSplit.forEach(function (key) {
            if (findValue !== null && findValue !== undefined && findValue[key] !== null && findValue[key] !== undefined) {
                findValue = tryParseJson(findValue[key]);
            } else {
                findValue = null;
            }
        });
    }
    let whereArgv = [];
    for (let index = 1; index < whereSplit.length; index += 2) {
        const action = whereSplit[index];
        const target = whereSplit.length > index + 1 ? whereSplit[index + 1] : '';
        whereArgv.push({ action, target });
    }
    let defaultValue = null;
    for (let index = 0; index < whereArgv.length; index++) {
        const { action, target } = whereArgv[index];
        if (action === 'default') {
            defaultValue = target;
        }
        if (findValue !== null && findValue !== undefined) {
            if ((action === 'eq' && target !== findValue.toString())
                || (action === 'neq' && target === findValue.toString())
                || (action === 'gt' && findValue <= target)
                || (action === 'egt' && findValue < target)
                || (action === 'lt' && findValue >= target)
                || (action === 'elt' && findValue > target)
                || (action === 'like' && findValue.toString().indexOf(target) < 0)) {
                findValue = null;
            } else if (action === 'sub') {
                if (findValue.toString().length > Number(target)) {
                    findValue = findValue.toString().substr(0, Number(target)) + '...';
                }
            } else if (action === 'append') {
                findValue = findValue.toString() + target;
            }
        } else {
            findValue = null;
        }
    }
    if (findValue === null) {
        findValue = defaultValue;
    }
    return findValue;
}

export function bindView(targetView, targetData) {
    var data = tryParseJson(targetData);
    for (var index = 0; index < targetView.numChildren; index++) {
        var elementView = targetView.getChildAt(index);
        if (elementView.name) {
            var element = findDataByWhere(data, elementView.name);
            if (element !== null && element !== undefined) {
                elementView.visible = true;
                if (elementView instanceof Laya.List) {
                    const listView = elementView;
                    listView.array = [];
                    if (listView.repeatX > 1 && !listView.hScrollBarSkin) {
                        listView.hScrollBarSkin = null;
                    }
                    if (listView.repeatY > 1 && !listView.vScrollBarSkin) {
                        listView.vScrollBarSkin = null;
                    }
                    listView.renderHandler = Laya.Handler.create(this, function (itemView, index) {
                        var elementItemData = listView.array[index];
                        if (typeof elementItemData === 'object') {
                            Object.assign(elementItemData, { index });
                        }
                        bindView(itemView, elementItemData);
                    }, null, false);
                    listView.array = element;
                } else if (elementView instanceof Laya.FontClip) {
                    elementView.value = `${element}`;
                } else if (elementView instanceof Laya.Label) {
                    elementView.text = `${element}`;
                } else if (elementView instanceof Laya.Text) {
                    elementView.text = `${element}`;
                } else if (elementView instanceof Laya.Image) {
                    elementView.skin = element;
                } else if (elementView instanceof Laya.Box) {
                    bindView(elementView, element);
                } else {
                    elementView.value = element;
                }
            } else {
                elementView.visible = false;
            }
        }
    }
}