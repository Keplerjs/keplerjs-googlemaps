
var Future = Npm.require('fibers/future')

Googlemaps = Npm.require('@google/maps');

gclient;

Meteor.startup(function() {
	gclient = Googlemaps.createClient({
		key: K.settings.googlemaps.key
	});
});

Kepler.Googlemaps = {

	requestSync: function(method, query) {

		//TODO here implement caching system

		var future = new Future();

		gclient[method](query, function(err, resp) {
			if(err) {
				console.log('Googlemaps: api error', err)
				future.throw(err);
			}
			else if(resp && resp.json) {
				future.return(resp.json.results); 
			}
		});

		return future.wait();
	},

	findByLoc: function(loc, opts) {
		
		var query = {
			language: 'en',
			location: loc,
			radius: K.settings.googlemaps.findByLocDist,
			//pagetoken: K.settings.googlemaps.findByLocLimit,
		      /*language: v.optional(v.string),
		      radius: v.optional(v.number),
		      keyword: v.optional(v.string),
		      minprice: v.optional(v.number),
		      maxprice: v.optional(v.number),
		      name: v.optional(v.string),
		      opennow: v.optional(v.boolean),
		      rankby: v.optional(v.oneOf(['prominence', 'distance'])),
		      type: v.optional(v.string),
		      pagetoken: v.optional(v.string),
		      retryOptions: v.optional(utils.retryOptions),
		      timeout: v.optional(v.number)*/
		};

		var res = this.requestSync('placesNearby',query);


		var features = _.map(res, function(r) {
			var loc = r.geometry.location,
				cc = [loc.lng, loc.lat];
			delete r.geometry;
			return K.Util.geo.feature('Point',cc,r);
		});

		features = [features[0]];

		var geojson = K.Util.geo.featureColl(features);

		console.log('Googlemaps: findByLoc',loc)

		return geojson;
	},

	/*findGooglemapsById: function(osmId) {

		var query = this.queryBuilder({id: osmId});

		console.log('Osm: findOsmById', osmId);

		return this.overpassSync(query);
	}	*/
};


Meteor.methods({
	findGooglemapsByLoc: function(loc) {

		if(!this.userId) return null;

		return K.Googlemaps.findByLoc(loc);
	},
	findGooglemapsById: function(osmId) {
		
		if(!this.userId) return null;
		
		return K.Osm.findOsmById(osmId);
	}
});

