exports.definition = {
    config: {

        adapter: {
            type: "properties",
            collection_name: "albums"
        },
        columns: {
            id: "Number",
            name: "String",
            coverPhoto: "String",
            createdTime: "Date"
        },
        defaults: {
            id: null,
            name: "",
            coverPhoto: "",
            createdTime: null
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
            initialize: function() {
                //*** Default sort field.  Replace with your own default.
                this.sortField = "name";
                //*** Default sort direction
                this.sortDirection = "ASC";
            },
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
                            createdTime: item.created_time
                        });
                        model.save();
                    }
                });

            },
            getIdAlbumByIndex: function(index) {
                var album = this.filter(function(item, i) {
                    return i === index;
                })[0];
                return album.get('id');
            },
            setSortField: function(field, direction) {
                this.sortField = field;
                this.sortDirection = direction;
            },

            comparator: function(collection) {
                return collection.get(this.sortField);
            },
            sortBy: function(iterator, context) {
                Ti.API.info('SORT BY !! ' + context);
                Ti.API.info('this.sortDirection !! ' + this.sortDirection);
                var obj = this.models;
                var direction = this.sortDirection;

                return _.pluck(_.map(obj, function(value, index, list) {
                    return {
                        value: value,
                        index: index,
                        criteria: iterator.call(context, value, index, list)
                    };
                }).sort(function(left, right) {
                    // swap a and b for reverse sort
                    var a = direction === "ASC" ? left.criteria : right.criteria;
                    var b = direction === "ASC" ? right.criteria : left.criteria;

                    if (a !== b) {
                        if (a > b || a === void 0) return 1;
                        if (a < b || b === void 0) return -1;
                    }
                    return left.index < right.index ? -1 : 1;
                }), 'value');
            }
        });

        return Collection;
    }

};
