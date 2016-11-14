// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var async = require('async');
var idAlbum;
if (args.id !== undefined && args.id !== null) {
    idAlbum = args.id;
    Ti.API.info("ID CLCKED PHOTO", idAlbum);

    async.waterfall([
        getPhoto
    ], function(err, result) {
        var photos = result.photos.data.map(function(photo) {
            if (photo.images && photo.images.length > 0) {
                return photo.images[0];
            }
        });

        Ti.API.info("photos", photos);
        $.loaderImage.image = photos[0].source
        setInterval(function() {
            defaultAnimation(photos)
        }, 3000);
    });
}

var indexPhoto = 0;

function getPhoto(callback) {
    var data;

    fb.requestWithGraphPath(idAlbum, {
        fields: 'photos.limit(10000){images}'
    }, 'GET', function(e) {
        if (e.success) {
            Ti.API.info('RESULT: ' + e.result);
            data = JSON.parse(e.result);
            callback(null, data);

        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });
}

function onBack() {

}

function defaultAnimation(photos) {
    indexPhoto++;
    Ti.API.info("index2", indexPhoto);

    if (indexPhoto === photos.length) indexPhoto = 0;
    $.loaderImage.image = photos[indexPhoto].source;

}
