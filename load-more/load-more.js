(function () {
    function loadMoreData (opts) {
        var loadMore = $('#' + opts.id);
        var parent = opts.parent || $(document.body);
        var action = opts.action || function () {};

        if (!loadMore.length) {
            $('<div class="load-more"><img src="./images/loading.gif"></div>').attr('id', opts.id).appendTo(parent);
            loadMore = $('#' + opts.id);
        }

        if (opts.parent) {
            loadMore.addClass('absolute');
        }
        loadMore.show();

        action && action();
    }

    function onLoadMoreDataComplete (opts) {
        $('#' + opts.id).hide();
    }

    if (!window.qPlugins) {
        window.qPlugins = {};
    }

    window.qPlugins.loadMoreData = loadMoreData;
    window.qPlugins.onLoadMoreDataComplete = onLoadMoreDataComplete;
}());