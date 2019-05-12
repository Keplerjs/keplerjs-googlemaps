
Template.popupCursor_gmaps.events({
	'click .btn-search': function(e,tmpl) {

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

Template.popupGeojson_gmaps.events({
	'click .btn-import': function(e,tmpl) {
		
		var icon$ = $(e.target).find('.icon');
		$(e.target).addClass('disabled');
		icon$.addClass('icon-loader');

		K.Googlemaps.importPlace(tmpl.data.properties.id, function(placeId) {
			$(e.target).removeClass('disabled');
			icon$.removeClass('icon-loader');
		});
	}
});
