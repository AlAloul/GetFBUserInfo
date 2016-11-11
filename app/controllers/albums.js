// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var fb = require('facebook');

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

function makeList(data) {
    Ti.API.info('RESULT2: ' + data[0].name);
    Ti.API.info('RESULT2: ' + data[0].cover_photo.picture);
    var myTemplate = {
        childTemplates: [{ // Image justified left
            type: 'Ti.UI.ImageView', // Use an image view for the image
            bindId: 'pic', // Maps to a custom pic property of the item data
            properties: { // Sets the image view  properties
                width: '50dp',
                height: '50dp',
                left: 0
            }
        }, { // Title
            type: 'Ti.UI.Label', // Use a label for the title
            bindId: 'info', // Maps to a custom info property of the item data
            properties: { // Sets the label properties
                color: '#ccc',
                font: {
                    fontFamily: 'Arial',
                    fontSize: '20dp',
                    fontWeight: 'bold'
                },
                left: '60dp',
                top: 0,
            }
        }]
    };

    var listView = Ti.UI.createListView({
        // Maps myTemplate dictionary to 'template' string
        templates: {
            'template': myTemplate
        },
        top: 120,
        // Use 'template', that is, the myTemplate dict created earlier
        // for all items as long as the template property is not defined for an item.
        defaultItemTemplate: 'template'
    });

    var sections = [];

    var fruitSection = Ti.UI.createListSection({
        headerTitle: 'List albums'
    });
    var fruitDataSet = [];

    data.forEach(function(item) {
        if (item.name && item.cover_photo) {
            fruitDataSet.push({
                info: {
                    text: item.name
                },
                pic: {
                    image: item.cover_photo.picture
                }
            });
        }
    });

    fruitSection.setItems(fruitDataSet);
    sections.push(fruitSection);

    listView.setSections(sections);
    $.win.add(listView);
}

function onSearch() {
  Alloy.createController("search").getView().open();
}

function onOrder() {

}

function onSelectAlbum() {

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
