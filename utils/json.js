function parseJson (json) {
    if (json) {
        try {
            return JSON.parse(json);
        } catch (e) {
            console.log('parse JSON error, maybe not a JSON?', 'error');
            return {'error': 'JSON.parse error!'};
        }
    } else {
        return {};
    }
}

function stringifyJson (obj) {
    try {
        return JSON.stringify(obj);
    } catch (e) {
        console.log('stringify obj to json error, maybe not a obj?', 'error');
        return JSON.stringify({'error': 'stringify error!'});
    }
}