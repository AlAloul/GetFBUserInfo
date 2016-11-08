var fb = require('facebook');
var openMainWindow;
var openProfilePage;

fb.addEventListener('logout', function(e) {
    Ti.API.info('LOGOUT EVENT IS FIRED');
    openMainWindow();
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

function onProfile() {
    openProfilePage();
}

exports.init = function(conf) {
    openMainWindow = conf.openMainWindow;
    openProfilePage = conf.openProfilePage;
};
