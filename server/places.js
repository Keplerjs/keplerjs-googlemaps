
/* GOOGLEMAPS data structure
{
	geometry: { location: [Object], viewport: [Object] },
	icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
	id: 'b4f784bb708867bcf8e997d69431498d3b807e39',
	name: 'Bruno Kessler Institute',
	opening_hours: { open_now: false },
	photos: [ [Object] ],
	place_id: 'ChIJn6M0MpV2gkcRPz1GtaQxLLQ',
	plus_code: 
	 { compound_code: '3582+QF Povo, Trent, Province of Trento, Italy',
	   global_code: '8FRH3582+QF' },
	rating: 4.5,
	reference: 'ChIJn6M0MpV2gkcRPz1GtaQxLLQ',
	scope: 'GOOGLE',
	types: [ 'point_of_interest', 'establishment' ],
	user_ratings_total: 183,
	vicinity: 'Via Sommarive, 18, Povo'
}*/

var gmapsToPlace = function(obj) {

	var name = prop.tags.name || '';

	var place = {
		name: obj.name, //K.Util.sanitize.name(name),
		loc: [coords[1], coords[0]],
		googlemaps: obj,
		source: {
			type: 'googlemaps'
		}
	};

/*	if(prop.tags.website)
		place.url = prop.tags.website;
	*/
	return place;
};

Meteor.methods({
	insertPlaceByGooglemapsId: function(id) {

		if(!this.userId) return null;

		var obj = Meteor.call('findGooglemapsById', id);
		
		if(!obj) return null;

		//var placeData = gmapsToPlace(obj);
		
		//var placeId = Meteor.call('insertPlace', placeData);
		
		console.log('Googlemaps: insertPlaceByGooglemapsId', obj);

		return null;
	}
});
