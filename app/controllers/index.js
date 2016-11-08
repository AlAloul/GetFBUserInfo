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
        $.win.add(fb.createLoginButton({
            readPermissions: ['user_photos'],
            top: 200
        }));
    } else {
        Alloy.createController("albums").getView().open();
    }

});


Alloy.Globals.openMainWindow = function(){
    $.win.open();
};


$.win.open();
