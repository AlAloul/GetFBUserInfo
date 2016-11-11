// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// var value;
//
// function getAllPhotos(tag) {
//     var data;
//     tag=value;
//     fb.requestWithGraphPath('me/photos', {
//         pretty: '0',
//         limit: '10000'
//     }, 'GET', function(e) {
//         if (e.success) {
//             Ti.API.info('RESULT: ' + e.result);
//             data = JSON.parse(e.result);
//             searchPhoto(data.data,tag);
//
//         } else if (e.error) {
//             alert(e.error);
//         } else {
//             alert('Unknown response');
//         }
//     });
// }
//
// function searchPhoto(photos,tag){
//   var detectedPhotos = photos.filter(function(item){
//     return item.name.indexOf('tag')>=0;
//   });
//
//   Ti.API.info('Detected PHOTOS: ' + detectedPhotos);
// }
//
//
// function onSearch(){
//   getAllPhotos();
// }
//
// $.win.addEventListener('open', function(){
//   value = $.searchField.value;
// });
