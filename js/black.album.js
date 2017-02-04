//Standard error message if displayed in html
var name="Nick Parnell"
var msgErr = "<h1>: (</h1><br>I don't know what you want....<br>";
var templates = "/template/"
var galleryTemplate = "<figure class='gallery-item'> <header class='gallery-icon'> <a class='popup' href='$URL' title='$TITLE' data-caption='© " + name + "'> <img src='$URL'></a> </header><figcaption class='gallery-caption'> <div class='entry-summary'> <h1>Untitled</h1> <p>© " + name + " </p> </div> </figcaption> </figure>"

//A function to setup image loading code to work with masonry. 
//Loads <figure> classes within the "gallery" ul
function applyTiles() {
	var gallery = $('#gallery');
	gallery.masonry({ itemSelector : '.gallery-item' });;
	gallery.imagesLoaded(function() {
		gallery.masonry({ itemSelector : '.gallery-item' });;
	});
}

// Build the gallery from the gallery template
function constructGallery(html) {
	var items = "";
	$(html).find('a').each(function () {
		items += galleryTemplate.replace(/\$URL/g, $(this).attr('href')).replace(/\$TITLE/g, $(this).text());
	});

	return items;
}


function loadGallery(url) {
	
	var links;
	//var image = window.location.host + "/images/" + name;
	$.get(url, function(data) { 
		links = data; 
		$('#gallery').append(constructGallery(links));
		refresh();
	});
	
}

//Setup Magnific-popup code for galleries,
//with some fading. 
//Loads class=popup
function initPopups() {

	console.log($('.gallery-item').length);
	$(document).find('.popup').magnificPopup({
		type: 'image',
		gallery:{enabled:false}, // Enable?
		removalDelay: 300,
		mainClass: 'mfp-fade',
		closeBtnInside: false,
		closeOnContentClick: true

	});

}

function refresh() {
	applyTiles();
	initPopups();
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
	$(window).resize(function() {
		applyTiles();
	});


});
