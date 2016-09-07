(function () {
    function showDialog (opts) {
        var dialog;

        if (!opts || !opts.id) {
            console.log('需要设定dialog的id');
            return;
        } else if (!$('#' + opts.id).length) {
            dialog = '<div class="dialog-container">'
                + '<div class="dialog-mask"></div>'
                + '<div class="dialog-content"><div class="dialog-title border-bottom"></div>'
                + '<div class="dialog-desc"></div><div class="dialog-button text-right"></div></div>'
                + '</div>';

            dialog = $(dialog).attr('id', opts.id).css(opts.css);
            dialog.appendTo(document.body);
        }

        dialog = $('#' + opts.id);

        if (opts.title) {
            dialog.find('.dialog-title').html(opts.title);
        }

        if (opts.desc) {
            dialog.find('.dialog-desc').html(opts.desc);
        }

        if (opts.button) {
            dialog.find('.dialog-button').html(opts.button);
        }

        if (dialog.find('.dialog-button span').length == 1) {
            dialog.find('.dialog-button span').addClass('color-ec4c3c');
        }

        dialog.show();

        dialog.find('.close-btn').one('click', function () {
            $('#' + opts.id).hide();
            opts.callback && opts.callback('close');
        });

        dialog.find('.ok-btn').one('click', function () {
            $('#' + opts.id).hide();
            opts.callback && opts.callback('ok');
        });

        dialog.find('.cancel-btn').one('click', function () {
            $('#' + opts.id).hide();
            opts.callback && opts.callback('cancel');
        });

        adjustDialog();
    }

    function adjustDialog () {
        var diablogs = $('.dialog-container'), dialog;
        var winWidth = $(window).width();
        var bodyWidth = $(document.body).width();

        for (var i = 0, li = diablogs.length; i < li; i++) {
            dialog = $(diablogs[i]);

            if (dialog.width() > $(document.body).width()) {
                dialog.css({
                    width: bodyWidth,
                    left: (winWidth - bodyWidth) / 2
                });
            }
        }
    }

    if (!window.qPlugins) {
        window.qPlugins = {};
    }

    window.qPlugins.showDialog = showDialog;
}());