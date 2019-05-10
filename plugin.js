
K.Plugin({
	name: 'googlemaps',
	templates: {
		tabPlace: 'tabPlace_gmaps',
		popupCursor: 'popupCursor_gmaps'
	},
	settings: {
		"googlemaps": {
			"findByLocDist": 50,
			"findByLocLimit": 10,
			"findByBBoxLimit": 10,
			"key": "",
		}
	}
});
