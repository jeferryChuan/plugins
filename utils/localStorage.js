var supportLocalStorage = false;
var supportCookie = false;

//当前环境是否支持localStorage
try {
    supportLocalStorage = !!window.localStorage;
    window.localStorage.setItem('_test_', 'test');
    window.localStorage.removeItem('_test_');
} catch (e) {
    supportLocalStorage = false;
}

//当前环境是否支持cookie
try {
    window.cookie && window.cookie('_test_', 'test');
    supportCookie = window.cookie && !!(window.cookie('_test_') && window.cookie('_test_') == 'test');
} catch (e) {
    supportCookie = false;
}

if (supportLocalStorage) {
    localStorage = {
        getItem: function (key) {
            return window.localStorage.getItem(key);
        },
        setItem: function (key, value) {
            return window.localStorage.setItem(key, value);
        },
        removeItem: function (key) {
            return window.localStorage.removeItem(key);
        }
    };
} else if (supportCookie) {
    localStorage = {
        getItem: function (key) {
            return cookie(key);
        },
        setItem: function (key, value, options) {
            return cookie(key, value, options);
        },
        removeItem: function (key) {
            return cookie(key, {expires: -1});
        }
    };
} else {
    localStorage = {
        getItem: function () {
            console.log('not support localStorage or cookie!');
        },
        setItem: function () {
            console.log('not support localStorage or cookie!');
        },
        removeItem: function () {
            console.log('not support localStorage or cookie!');
        }
    };
    console.log('not support localStorage or cookie!');
}