var fb = require('facebook');
var openMainWindow;

fb.addEventListener('logout', function(e) {
    Ti.API.info('LOGOUT EVENT IS FIRED');
    openMainWindow();
});

fb.addEventListener('login', function(e) {
    Ti.API.info('LOGIN EVENT');
    if (e.success) {
        Ti.API.info('SUCCESS LOGIN EVENT IS FIRED');
        Alloy.createController("albums").getView().open();
    } else if (e.cancelled) {
        Ti.API.info('CANCELED LOGIN EVENT IS FIRED');
        //$.label.text = 'Logged In = ' + fb.loggedIn;
    } else {
        Ti.API.info('ERROR EVENT LOGIN IS FIRED');
        //$.label.text = 'Logged In = ' + fb.loggedIn;
    }
});


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

exports.init = function(conf) {
    openMainWindow = conf.openMainWindow;
};
