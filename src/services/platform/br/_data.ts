function _getQueryParams() {
    var queryStr = window.location.search.substring(1);
    let query = {};
    var vars = queryStr.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair.length > 1) {
            query[pair[0]] = decodeURIComponent(pair[1]);
        }
    }
    return query;
}

export function getEnterSceneForBR() {
    return 'other';
}

export function getEnterDataForBR() {
    return {};
}