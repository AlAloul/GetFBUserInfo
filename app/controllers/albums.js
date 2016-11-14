// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
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


$.picker.addEventListener('change', function(e) {
    Ti.API.info(e.row.value);
    //selectAnimation(e.row.value);

    switch (e.row.value) {
        case 0:
            albums.setSortField("name", "ASC");
            albums.sort();
            Ti.API.info('albums.models ' + albums.models[0].get('name'));
            renderList(albums.models);
            break;
        case 1:
            albums.setSortField("createdTime", "ASC");
            albums.sort();
            Ti.API.info('albums.models ' + albums.models[0].get('name'));
            renderList(albums.models);
            break;
    }
});

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
        fields: 'albums{name, cover_photo{picture},created_time}'
    }, 'GET', function(e) {
        if (e.success) {
            albums = Alloy.Collections.albums = Alloy.createCollection('albums');
            albums.addCollection(e.result);
            albums.fetch();
            Ti.API.info('albums.models ' + albums.models[0].get('name'));
            renderList(albums.models);
        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });
}
