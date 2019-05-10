
Meteor.methods({
	findGooglemapsByLoc: function(loc) {
		
		console.log("findGooglemapsByLoc()",loc);

		var place = K.findPlaceById(placeId).fetch()[0],
			lastP = place.loc;

		/*if(place.tracks>0) {
			var track = getTracksByIds(place.tracks).fetch()[0],
				firstP = track.features[0].geometry.coordinates[0].reverse();
		}*/
		//TODO calcolare angolo e inclinazione da fisrtP a lastP

		//// http://code.google.com/apis/maps/documentation/streetview
		//size, location, callback, sensor, heading, fov, pitch
		var res = Googlemaps.streetView('250x200', lastP.join(','), false);

		return res;
	}
});
