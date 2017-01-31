//A function to setup image loading code to work with masonry. 
//Loads <figure> classes
function applyTiles() {
	var gallery = $('#gallery ul');
	gallery.imagesLoaded(function() {
		$('#gallery ul').masonry({ itemSelector : '.figure' });;
	});
}

jQuery(document).ready(function($) {


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
