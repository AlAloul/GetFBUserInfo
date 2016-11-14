// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var value;
var fb = require('facebook');

function getAllPhotos(tag) {
    var data;
    //tag=value;
    fb.requestWithGraphPath('me', {
      fields:'albums{name,photos.limit(10000){name,images.limit(1)}}'
    }, 'GET', function(e) {
        if (e.success) {
            Ti.API.info('RESULT: ' + e.result);
            data = JSON.parse(e.result);
            searchPhoto(data.albums.data,tag);

        } else if (e.error) {
            alert(e.error);
        } else {
            alert('Unknown response');
        }
    });
}

function onBack(){
  Alloy.createController("albums").getView().open();
}

function searchPhoto(albums,tag){
  var detectedPhotos=[];
  albums.forEach(function(item){
    if(item.photos){
    item.photos.data.forEach(function(itemPhoto,i){
      //Ti.API.info('Index: ' + i);
      if(itemPhoto.name&&itemPhoto.name.indexOf(tag)>=0){
        detectedPhotos.push(itemPhoto);
      }
      });
    }
});


  //Ti.API.info('Detected PHOTOS: ' + detectedPhotos[0].images);
  renderDetectedPhotos(detectedPhotos);
}


function onSearch(){
  getAllPhotos($.searchField.value);
//  Ti.API.info('TAG: ' + $.searchField.value);
}

var listView;
function renderDetectedPhotos(data){
  if(listView){
    $.win.remove(listView);
  }
  //Ti.API.info('RESULT2: ' + data[0].name);
  //Ti.API.info('RESULT2: ' + data[0].cover_photo.picture);
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

   listView = Ti.UI.createListView({
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

  var albumsSection = Ti.UI.createListSection({
      headerTitle: 'List albums'
  });
  var albumsDataSet = [];

  data.forEach(function(item) {
      if (item.name) {
          albumsDataSet.push({
              info: {
                  text: item.name
              },
              pic: {
                  image: item.images[0].source
              }
          });
      }
  });

  albumsSection.setItems(albumsDataSet);
  sections.push(albumsSection);

  listView.setSections(sections);
  $.win.add(listView);
}
// $.win.addEventListener('open', function(){
//   value = $.searchField.value;
// });

$.win.open();
