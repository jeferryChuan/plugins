(function () {
    var isWeiXin = navigator.userAgent.match(/micromessenger/i);
    var weixin_sdk = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
    var appid = 'wx4081f6c3443e96eb';
    var attemptTimes = {
        'config': 0,
        'getTicket': 0
    };
    var dataForWeiXin = {
        appid: appid,
        img:	"",
        url:	"",
        title:	'',
        desc: '',
        category: '',
        action: '',
        record: false
    };
    var basePath = '/1.1';
    var shareJavaInterface = 'PKWanShareInfo';

    function setShareData (shareData) {
        dataForWeiXin.img = fixResourceUrl(shareData.img || '');
        dataForWeiXin.url = shareData.url || '';
        dataForWeiXin.title = shareData.title || document.title || '';
        dataForWeiXin.desc = shareData.desc || '';
        dataForWeiXin.record = shareData.record || false;
        dataForWeiXin.category = shareData.category || '';
        dataForWeiXin.action = shareData.action || '';

        if (isWeiXin) {
            getWeiXinJsTicket();
        }

        if (window[shareJavaInterface] && window[shareJavaInterface].setShareInfo) {
            window[shareJavaInterface].setShareInfo(shareData.img, shareData.desc, shareData.title);
        } else if (window[shareJavaInterface]) {
            console.log('no share java interface');
        } else {
            console.log('no java interface');
        }
    }

    function weiXinConfig (timestamp, noncestr, signature) {
        if (window.wx) {
            window.wx.config({
                debug: false,
                appId: appid,
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
            });

            window.wx.ready(function () {
                refreshWxData();
            });

            window.wx.error(function (data) {
                if (JSON.stringify(data).match(/invalid signature/i) && attemptTimes.config < 3) {
                    attemptTimes.config ++;
                    setTimeout(function () {
                        weiXinConfig(timestamp, noncestr, signature);
                    }, 100);
                }
                console.log(data);
            });
        } else {
            setTimeout(function () {
                weiXinConfig(timestamp, noncestr, signature);
            }, 100);
        }
    }

    function refreshWxData () {
        console.log(dataForWeiXin);

        window.wx.onMenuShareTimeline({
            title: dataForWeiXin.title,
            desc: dataForWeiXin.title,
            link: dataForWeiXin.url,
            imgUrl: dataForWeiXin.img,
            success: function () {
                weixinShareSuccess('Timeline');
            },
            error: function (e) {
                console.log(e);
            },
            cancel: function () {
                weixinShareCancel('Timeline');
            }
        });

        window.wx.onMenuShareAppMessage({
            title: dataForWeiXin.title,
            desc: dataForWeiXin.desc,
            link: dataForWeiXin.url,
            imgUrl: dataForWeiXin.img,
            success: function () {
                weixinShareSuccess('AppMessage');
            },
            error: function (e) {
                console.log(e);
            },
            cancel: function () {
                weixinShareCancel('AppMessage');
            }
        });

        window.wx.onMenuShareQQ({
            title: dataForWeiXin.title,
            desc: dataForWeiXin.desc,
            link: dataForWeiXin.url,
            imgUrl: dataForWeiXin.img,
            success: function () {
                weixinShareSuccess('QQ');
            },
            error: function (e) {
                console.log(e);
            },
            cancel: function () {
                weixinShareCancel('QQ');
            }
        });

        window.wx.onMenuShareWeibo({
            title: dataForWeiXin.title,
            desc: dataForWeiXin.desc,
            link: dataForWeiXin.url,
            imgUrl: dataForWeiXin.img,
            success: function () {
                weixinShareSuccess('Weibo');
            },
            error: function (e) {
                console.log(e);
            },
            cancel: function () {
                weixinShareCancel('Weibo');
            }
        });

        window.wx.onMenuShareQZone({
            title: dataForWeiXin.title,
            desc: dataForWeiXin.desc,
            link: dataForWeiXin.url,
            imgUrl: dataForWeiXin.img,
            success: function () {
                weixinShareSuccess('Qzone');
            },
            error: function (e) {
                console.log(e);
            },
            cancel: function () {
                weixinShareCancel('Qzone');
            }
        });
    }

    function getWeiXinJsTicket () {
        var url, jsapi_ticket, noncestr, timestamp, rankNum, signature, string1 = '';

        var SHA1 = new Hashes.SHA1;

        $.ajax({
            url:  'http://m.pkwan.cn' + basePath + '/facility/weixin/jsapi/ticket',
            dataType :'jsonp',
            cache: false,
            jsonpCallback: 'jsonp',
            jsonp: 'jsonp',
            data: {
                'force-refresh': !!(attemptTimes.getTicket > 0)
            },
            success: function (data) {
                if (data.code == 0) {
                    jsapi_ticket = data.data['jsapi-ticket'];
                    rankNum = Math.floor(Math.random() * 10);
                    noncestr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'][rankNum];
                    timestamp = Math.floor(Date.now() / 1000);
                    url = window.location.href.split('#')[0];

                    var  arr = ['jsapi_ticket=' , jsapi_ticket , '&noncestr=' , noncestr , '&timestamp=', timestamp + ''
                        , '&url=' , url];

                    string1 = arr.join('');
                    signature = SHA1.hex(string1);
                    console.log(signature);

                    if (jsapi_ticket) {
                        weiXinConfig(timestamp, noncestr, signature);
                    } else {
                        getTicketAgain();
                    }
                } else {
                    getTicketAgain();
                }
            },
            error: function () {
                getTicketAgain();
            }
        });
    }

    function getTicketAgain () {
        setTimeout(function () {
            if (attemptTimes.getTicket < 3) {
                attemptTimes.getTicket ++;
                getWeiXinJsTicket();
            }
        }, 200);
    }

    function weixinShareSuccess (type) {
        console.log('success');
        shareEventRecord(1, type);
    }

    function weixinShareCancel (type) {
        console.log('cancel');
        shareEventRecord(0, type);
    }

    function shareEventRecord (value, type) {
        if (window._czc && dataForWeiXin.record) {
            window._czc.push(["_trackEvent", (dataForWeiXin.category || 'activity'), (dataForWeiXin.action || 'weixin_share'), (dataForWeiXin.url || window.location.href), value, (type || '')]);
        }
    }

    function fixResourceUrl (url) {
        if (url) {
            if (url.match(/http/)) {
                return url;
            } else {
                return 'http://res.pkwan.cn/' + url;
            }
        } else {
            return 'http://m.pkwan.cn/h5/common/images/logo120.png';
        }
    }

    //H5页面分享
    var shareInfo = {};

    if ($('.share-info').length) {
        try {
            shareInfo = JSON.parse($('.share-info').html());
        } catch (e) {
            shareInfo = {};
        }

        if (shareInfo.title) {
            setShareData({
                title: shareInfo.title,
                desc: shareInfo.desc,
                img: fixResourceUrl(shareInfo.img),
                record: true
            });
        }
    }

    //在APP内隐藏下载banner
    if (window[shareJavaInterface] && window.location.href.match(/forum\/post/)) {
        $('.download-container-mask').hide();
        $('.download-container').hide();
    }

    if (!window.qPlugins) {
        window.qPlugins = {};
    }

    window.qPlugins.setShareData = setShareData;
}());
