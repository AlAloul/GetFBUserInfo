// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var fb = require('facebook');

$.win.addEventListener('open', function() {

    init();

});

function onBack() {
    Alloy.createController("albums").getView().open();
}

function init() {
    fb.requestWithGraphPath('me', {
        fields: 'picture, name, link, gender, locale, age_range'
    }, 'GET', function(e) {
        if (e.success) {
            Ti.API.info('RESULT: ' + e.result);
            data = JSON.parse(e.result);
            $.imageView.image = data.picture.data.url;
            $.name.text = 'Name: ' + data.name;
            $.link.text = 'Link: ' + data.link;
            $.gender.text = 'Gender: ' + data.gender;
            $.locale.text = 'Locale: ' + data.locale;
            $.age_range.text = 'Age range: ' + data.age_range.min;
        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });
}
