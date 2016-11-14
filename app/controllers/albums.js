// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var fb = require('facebook');
var async = require('async');

$.win.addEventListener('open', function() {
    $.navigation.init({
        openMainWindow: function() {
            Alloy.createController("index").getView().open();
        },
        openProfilePage: function() {
            Alloy.createController("profile").getView().open();
        }
    });

    init();

});

function onSearch() {
    Alloy.createController("search").getView().open();
}

function onOrder() {

}

function onSelectAlbum() {

}


function makeList(data) {
    var section = Ti.UI.createTableViewSection();

    data.forEach(function(item, index) {
        if (item.name && item.cover_photo) {
            var row = Ti.UI.createTableViewRow({
                layout: 'horizontal',
                width: '100%'
            });

            var image = Ti.UI.createImageView({
                image: item.cover_photo.picture,
                height: "70",
                id: index
            });

            var label = Ti.UI.createLabel({
                id: index,
                left: 20,
                text: item.name
            });

            row.add(image);
            row.add(label);

            section.add(row);
        }
    });

    $.albums.data = [section];
}


$.albums.addEventListener('click', function(event) {
    if (event.index !== undefined) {
        async.waterfall([
            getIdAlbumByIndex
        ], function(err, result) {
            var selectedAlbums = result.filter(function(item, i) {
                return i === event.index;
            })[0];

            var args = {
                id: selectedAlbums.id
            }
            Ti.API.info("selectedAlbums.id "+ selectedAlbums.id);
            Alloy.createController("slideShow", args).getView().open();
        });
    }
});

function getIdAlbumByIndex(callback) {
    var data;

    fb.requestWithGraphPath('me', {
        fields: 'albums{name, cover_photo{picture}}'
    }, 'GET', function(e) {
        if (e.success) {
            Ti.API.info('RESULT: ' + e.result);
            data = JSON.parse(e.result);
            callback(null, data.albums.data);

        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });
}

function init() {
    var data;

    fb.requestWithGraphPath('me', {
        fields: 'albums{name, cover_photo{picture}}'
    }, 'GET', function(e) {
        if (e.success) {
            Ti.API.info('RESULT: ' + e.result);
            data = JSON.parse(e.result);
            makeList(data.albums.data);

        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });
}
