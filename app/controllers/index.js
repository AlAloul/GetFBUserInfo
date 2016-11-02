var fb = require('facebook');

$.win.fbProxy = fb.createActivityWorker({
    lifecycleContainer: $.win
});

fb.addEventListener('login', function(e) {
    Ti.API.info('LOGIN EVENT');
    if (e.success) {
        Ti.API.info('SUCCESS LOGIN EVENT IS FIRED');
        $.label.text = 'Logged In = ' + fb.loggedIn;
    } else if (e.cancelled) {
        Ti.API.info('CANCELED LOGIN EVENT IS FIRED');
        $.label.text = 'Logged In = ' + fb.loggedIn;
    } else {
        Ti.API.info('ERROR EVENT LOGIN IS FIRED');
        $.label.text = 'Logged In = ' + fb.loggedIn;
    }
});

fb.addEventListener('logout', function(e) {
    Ti.API.info('LOGOUT EVENT IS FIRED');
    $.label.text = 'Logged In = ' + fb.loggedIn;
});

function isLogin() {
    alert('loggedIn: ' + fb.loggedIn);
}

$.win.addEventListener('open', function() {
    fb.initialize();
    $.label.text = 'Logged In = ' + fb.loggedIn;
});

function onLogIn() {
    if (!fb.loggedIn) {
        fb.authorize();
    }
}

function onLogOut() {
    fb.requestWithGraphPath('/me/permissions', {}, 'DELETE', function(e) {
        if (e.success) {
            Ti.API.info('SUCCESS EVENT LOGOUT IS FIRED');
        } else if (e.error) {
            Ti.API.info('ERROR EVENT LOGOUT IS FIRED');
        } else {
            Ti.API.info('SOME EVENT LOGOUT IS FIRED');
        }
    });

    fb.logout();
}

function onGetData() {
    fb.requestWithGraphPath('me', {}, 'GET', function(e) {
        if (e.success) {
            alert(e.result);
        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });
}

$.win.open();
