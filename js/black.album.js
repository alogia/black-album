//A function to setup image loading code to work with masonry. 
//Loads <figure> classes
function applyTiles() {
	var gallery = $('#gallery ul');
	gallery.imagesLoaded(function() {
		$('#gallery ul').masonry({ itemSelector : '.figure' });;
	});
}

jQuery(document).ready(function($) {

	var siteUrl = 'http://'+(document.location.hostname||document.location.host);

	document.title = $(data).find("title").text();
	$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
		e.preventDefault();
		History.pushState({}, "", this.pathname);
	});
	History.Adapter.bind(window, 'statechange', function(){
		var State = History.getState();
		$.get(State.url, function(data){
			document.title = $(data).find("title").text();
			$('.content').html($(data).find('.content'));
			_gaq.push(['_trackPageview', State.url]);
		});
	});

	$(function() {
		applyTiles();
	});
	$(window).resize(function() {
		applyTiles();
	});



	//Setup Magnific-popup code for galleries,
	//with some fading. 
	//Loads class=popup
	$('.popup').magnificPopup({
		type: 'image',
		gallery:{enabled:false}, // Enable?
		removalDelay: 300,
		mainClass: 'mfp-fade',
		closeBtnInside: false,
		closeOnContentClick: true

	});
});
