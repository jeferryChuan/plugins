function getParamByName (name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results;

    results = regex.exec(url || location.href);

    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getQueryString(params) {
    var queryString = window.location.href;
    var regex = new RegExp(name + "=[^&#]*");

    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            if (queryString.match(new RegExp(i + '='))) {
                regex = new RegExp(i + "=[^&#]*");
                queryString = queryString.replace(regex, i + '=' + params[i]);
            } else {
                if (queryString.split('?')[1] && queryString.split('?')[1].length) {
                    queryString += '&' + i + '=' + params[i];
                } else {
                    queryString += '?' + i + '=' + params[i];
                }
            }
        }
    }
    return queryString;
}
