
Template.tabPlace_googlemaps.events({
	'click .place-btn-stview': function(e) {
		e.preventDefault();		
		this.loadStreetView();
	}
});