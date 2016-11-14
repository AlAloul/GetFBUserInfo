exports.definition = {
    config: {

        adapter: {
            type: "properties",
            collection_name: "albums"
        },
        columns: {
            id: "Number",
            name: "String",
            coverPhoto: "String"

        },
        defaults: {
            id: null,
            name: "",
            coverPhoto: ""
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            // extended functions and properties go here
            defaults: {
                id: null,
                name: "",
                coverPhoto: ""
            },
        });

        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            // extended functions and properties go here

            // For Backbone v1.1.2, uncomment the following to override the
            // fetch method to account for a breaking change in Backbone.
            /*
            fetch: function(options) {
            	options = options ? _.clone(options) : {};
            	options.reset = true;
            	return Backbone.Collection.prototype.fetch.call(this, options);
            }
            */

            addCollection: function(data) {
                //var data
                Ti.API.info('RESULT1: ' + data);
                //  var data;
                Ti.API.info('RESULT12: ' + typeof data);
                data = JSON.parse(data);

                Ti.API.info('data.length: ' + data.albums.data.length);
                Ti.API.info('RESULT2: ');
                data.albums.data.forEach(function(item) {
                    if (item.name && item.cover_photo) {
                        var model = Alloy.createModel('albums', {
                            id: item.id,
                            name: item.name,
                            coverPhoto: item.cover_photo.picture, // default
                        });
                        model.save();
                    }
                });

            },
            getIdAlbumByIndex:function(index){
              var album = this.filter(function(item, i) {
                  return i === index;
              })[0];
              return album.get('id');
            },
            orderAbs: function() {

            },
            orderTime: function() {

            }
        });

        return Collection;
    }
};
