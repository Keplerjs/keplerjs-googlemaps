
var Future = Npm.require('fibers/future')

Googlemaps = null;

Meteor.startup(function() {
	Googlemaps = Npm.require('@google/maps').createClient({
		key: K.settings.googlemaps.key
	});
});

 /*directions: makeApiMethod(directions.directions),
    distanceMatrix: makeApiMethod(distanceMatrix.distanceMatrix),
    elevation: makeApiMethod(elevation.elevation),
    elevationAlongPath: makeApiMethod(elevation.elevationAlongPath),
    geocode: makeApiMethod(geocode.geocode),
    geolocate: makeApiMethod(geolocation.geolocate),
    reverseGeocode: makeApiMethod(geocode.reverseGeocode),
    findPlace: makeApiMethod(places.findPlace),
    places: makeApiMethod(places.places),
    placesNearby: makeApiMethod(places.placesNearby),
    placesRadar: deprecate(makeApiMethod(places.placesRadar), 'placesRadar is deprecated, see http://goo.gl/BGiumE'),
    place: makeApiMethod(places.place),
    placesPhoto: makeApiMethod(places.placesPhoto),
    placesAutoComplete: makeApiMethod(places.placesAutoComplete),
    placesQueryAutoComplete: makeApiMethod(places.placesQueryAutoComplete),
    snapToRoads: makeApiMethod(roads.snapToRoads),
    nearestRoads: makeApiMethod(roads.nearestRoads),
    speedLimits: makeApiMethod(roads.speedLimits),
    snappedSpeedLimits: makeApiMethod(roads.snappedSpeedLimits),
    timezone: makeApiMethod(timezone.timezone)*/

/*
var gmAPI = new GoogleMapsAPI();
var params = {
  location: '51.507868,-0.087689',
  size: '1200x1600',
  heading: 108.4,
  pitch: 7,
  fov: 40
};
var result = gmAPI.streetView(params);
//*/

Kepler.Googlemaps = {

	requestSync: function(method, query) {

		//TODO here implement caching system

		var future = new Future();

		Googlemaps[method](query, function(err, resp) {
			if(err) {
				console.log('Googlemaps: api error', err)
				future.throw(err);
			}
			else if(resp && resp.json)
				future.return(resp.json); 
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

		var geojson = this.requestSync('placesNearby',query);

			//features = geojson.features;
		/*
		for(var f in features) {
			if( features[f] && features[f].properties) {
				if(opts.meta!==true && features[f].properties.meta)
					delete features[f].properties.meta;
				
				if(opts.type!=='rel' && features[f].properties.relations)
					delete features[f].properties.relations;
			}
		}*/

		console.log('Googlemaps: findByLoc',loc,geojson)

		return [];
	},

	/*findOsmById: function(osmId) {

		var query = this.queryBuilder({id: osmId});

		console.log('Osm: findOsmById', osmId);

		return this.overpassSync(query);
	}	*/
};


Meteor.methods({
	findGooglemapsByLoc: function(loc, opts) {
		
		if(!this.userId) return null;

		return K.Googlemaps.findByLoc(loc, opts);
	},
/*
	findOsmById: function(osmId) {
		
		if(!this.userId) return null;
		
		return K.Osm.findOsmById(osmId);
	}*/
});