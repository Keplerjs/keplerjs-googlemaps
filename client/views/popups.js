
Template.popupCursor_gmaps.events({
	'click .btn-gmapssearch': function(e,tmpl) {

		var btn$ = $(e.target),
			icon$ = btn$.find('.icon');
		btn$.addClass('disabled');
		icon$.addClass('icon-loader');
		
		K.Googlemaps.loadByLoc(tmpl.data.loc, function(data) {
			btn$.removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});
/*
Template.popupGeojson_osm.events({
	'click .btn-osmimport': function(e,tmpl) {
		
		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');

		var osmId = tmpl.data.properties.id;

		K.Osm.importPlace(osmId, function(placeId) {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});


Template.popupOsm.helpers({
	keys: function() {

		var ret = [];

		_.each(this.properties.tags, function(val, key) {
			ret.push({
				key: key,
				url: 'http://wiki.openstreetmap.org/wiki/Key:'+key,
				val: val
			});
		});

		return ret;
	}
});*/
