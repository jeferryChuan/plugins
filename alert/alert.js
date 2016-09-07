(function () {
    function showAlert (opts) {
        var alertTip = $('#alert-tip');
        var type = opts.type || 'info';
        var tip = opts.tip || '';
        var duration = opts.duration || 3000;

        if (alertTip.length) {
            alertTip.removeClass('alert-info alert-waring alert-danger').addClass('alert-' + type).html(tip).show().css({
                opacity: 0
            });
        } else {
            $('<div id="alert-tip" class="alert alert-' + type + '">' + tip + '</div>').appendTo('body').show().css({
                opacity: 0
            });
            alertTip = $('#alert-tip');
        }
        alertTip.css({
            'margin-left': - alertTip.width() / 2 - 15
        });

        //第一次获取的宽度有问题?
        setTimeout(function () {
            alertTip.css({
                opacity: 1,
                'margin-left': - alertTip.width() / 2 - 15
            });
        }, 20);

        setTimeout(function () {
            alertTip.hide();
        }, duration);
    }

    if (!window.qPlugins) {
        window.qPlugins = {};
    }

    window.qPlugins.showAlert = showAlert;
}());