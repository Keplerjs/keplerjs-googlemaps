
Template.tabPlace_gmaps.events({
	'click .place-btn-stview': function(e) {
		e.preventDefault();		
		this.loadStreetView();
	}
});