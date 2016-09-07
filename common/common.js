function getParamByName (name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results;

    results = regex.exec(url || location.href);

    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}