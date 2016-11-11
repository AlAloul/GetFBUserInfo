var fb = require('facebook');
//
$.win.fbProxy = fb.createActivityWorker({
    lifecycleContainer: $.win
});

$.win.addEventListener('open', function() {
    //  $.label.text = 'Logged In = ' + fb.loggedIn;
    Ti.API.info('TRY LOGIN');
    fb.initialize();

    if (!fb.loggedIn) {
        Ti.API.info('ADD BUTTON');
        $.win.add(fb.createLoginButton({
            readPermissions: ['user_photos','public_profile','email','user_hometown'],
            top: 200
        }));
    } else {
        Alloy.createController("albums").getView().open();
    }

});


Alloy.Globals.openMainWindow = function() {
    $.win.open();
};

fb.addEventListener('login', function(e) {
    Ti.API.info('LOGIN EVENT2');
    //  accessToken
    fb.accessToken = "abvc";
    Ti.API.info(fb.accessToken);
    Ti.API.info(fb.getAccessToken());

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


$.win.open();
