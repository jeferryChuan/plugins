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

function getSize (size) {
    var UNITS = ['B', 'K', 'M', 'G'];
    var finalSize = size, unit = UNITS[0], index = 0;

    while (finalSize / 1024 >= 1 && UNITS[index]) {
        finalSize = finalSize / 1024;
        index ++;
        unit = UNITS[index];
    }

    if (finalSize) {
        return Number(finalSize).toFixed(2) + unit;
    } else {
        return '---';
    }
}

function ajaxSubmitForm (form, callback) {
    var formData = new FormData();
    var data = form.serializeArray();

    for (var i = 0, li = data.length; i < li; i++) {
        formData.append(data[i].name, data[i].value);
    }

    $.ajax({
        type: form[0].method,
        url: form[0].action,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data && typeof data == 'string') {
                try {
                    data = JSON.parse(data);
                } catch (e) {
                    
                }
            }

            callback && callback(data);
        },
        error: function (err) {
            if (err.status && err.status == 403) {
                forbiddenErrorTip();
            }
            callback && callback();
        }
    });
}
