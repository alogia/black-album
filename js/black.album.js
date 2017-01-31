//Standard error message if displayed in html
var msgErr = "<h1>: (</h1><br>I don't know what you want....<br>";
var templates = "/template/"
var galleryTemplate = "gallery-entry.html"


//A function to setup image loading code to work with masonry. 
//Loads <figure> classes within the "gallery" ul
function applyTiles() {
	var gallery = $('#gallery ul');
	gallery.imagesLoaded(function() {
		$('#gallery ul').masonry({ itemSelector : '.figure' });;
	});
}

// Build the gallery from the gallery template
function constructGallery(html) {


	$.get(templates + galleryTemplate, function(templ) {
//FIXME		$(html).find('a').append($(
	});
	var as = $(html).find('a');
//	console.log(as.length);
	return as;
}


function loadGallery(url) {
	
	//var image = window.location.host + "/images/" + name;
	$.get(url, function(data) {
			var lnks = constructGallery(data);
			// Inject the modified HTML into the gallery object.
			$('#gallery').html(lnks);
	});

}


// Doc's ready, Bro
$(document).ready(function($) {

	//Init history.js 
	var History = window.History;
	console.log("History: " + History.enabled);
	//Bind history.js to statechange
	History.Adapter.bind(window,'statechange',function(){ 
		    var State = History.getState(); 
		    History.log(State.data, State.title, State.url);
	});



	//Rebind widow resize events to take place with imagesLoaded.js and masonry.js
	applyTiles();
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
