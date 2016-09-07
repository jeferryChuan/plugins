(function () {
    var loading = $('#loading');

    function showLoading (tip) {
        if (!loading.length) {
            $('<div id="loading"><div class="loading-content"><div id="loading-center" class="loading-icon"></div>'
                + '</div><div id="loading-tip" class="row"></div></div>').appendTo($(document.body));
            loading = $('#loading');
        }

        $('#loading-tip').html(tip);
        loading.show();
    }

    function hideLoading () {
        loading.hide();
    }

    if (!window.qPlugins) {
        window.qPlugins = {};
    }

    window.qPlugins.showLoading = showLoading;
    window.qPlugins.hideLoading = hideLoading;
}());