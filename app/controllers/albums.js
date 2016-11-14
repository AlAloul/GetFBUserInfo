// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
//var fb = require('facebook');
var async = require('async');
var albums;

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


function renderList(data) {
    var section = Ti.UI.createTableViewSection();

    data.forEach(function(model, index) {
        var row = Ti.UI.createTableViewRow({
            layout: 'horizontal',
            width: '100%'
        });

        var image = Ti.UI.createImageView({
            image: model.get('coverPhoto'),
            height: "70",
            id: index
        });

        var label = Ti.UI.createLabel({
            id: index,
            left: 20,
            text: model.get('name')
        });

        row.add(image);
        row.add(label);

        section.add(row);
    });

    $.albums.data = [section];
}


$.albums.addEventListener('click', function(event) {
    if (event.index !== undefined) {
        var args = {
            id: albums.getIdAlbumByIndex(event.index)
        };

        Ti.API.info("albums.getIdAlbumByIndex(event.index); " + albums.getIdAlbumByIndex(event.index));
        Alloy.createController("slideShow", args).getView().open();
    }
});

$.win.addEventListener("close", function() {
    $.destroy();
});

function init() {
    var data;

    fb.requestWithGraphPath('me', {
        fields: 'albums{name, cover_photo{picture}}'
    }, 'GET', function(e) {
        if (e.success) {
            albums = Alloy.Collections.albums = Alloy.createCollection('albums');
            albums.fetch();
            albums.addCollection(e.result);
            renderList(albums.models);
        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });
}
