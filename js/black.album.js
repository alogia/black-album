//Standard error message if displayed in html
var name="Nick Parnell"
var msgErr = "<h1>: (</h1><br>I don't know what you want....<br>";
var templates = "/template/"
var galleryTemplate = "<figure class='gallery-item'> <header class='gallery-icon'> <a class='popup' href='$URL' alt='$TITLE' data-caption='© " + name + "'> <img src='$URL'></a> </header><figcaption class='gallery-caption'> <div class='entry-summary'> <h3>$TITLE</h3> <p>© " + name + " </p> </div> </figcaption> </figure>"
var $gallery;

//A function to setup image loading code to work with masonry. 
//Loads <figure> classes within the "gallery" ul
function applyTiles() {
	$gallery = $('#gallery').masonry({ 
		itemSelector : '.gallery-item',
		originLeft: false,
		fitWidth: true
	});
	$gallery.imagesLoaded(function() {
		$gallery.masonry({ 
			itemSelector : '.gallery-item',  
			originLeft: false,
			fitWidth: true
		});;
	});
}


// Build the gallery from the gallery template
function constructGallery(html, name) {
	var items = "";
	$(html).find('a').each(function () {
		items += galleryTemplate.replace(/\$URL/g, "/images/" + name.toLowerCase() + "/" + $(this).attr('href')).replace(/\$TITLE/g, $(this).text());
	});

	return items;
}


// Loads a gallery ajax style, and refreshes the layout. 
function loadGallery(url, name) {

	History.pushState($gallery.children(), document.title, $(this).attr('href'));
	
	//$('#gallery').addClass('hidden');
	$.get(url, function(data) { 
		$gallery.masonry('remove', $gallery.children());
		var $figs = $(constructGallery(data, name));
		$gallery.append($figs);
		$gallery.masonry('appended', $figs);
		$('#menu-title a').text(name);
		refresh();
	});

	
}

function hideMenu() {
	$('#block1').css('height', '38').css('overflow', 'hidden');

}

// Shows the menu when hidden on small screens
function showMenu() {
	$('#block1').css('height', '100%').css('overflow', 'show');
}

//Setup Magnific-popup code for galleries,
//with some fading. 
//Loads class=popup
function initPopups() {

	$(document).find('.popup').magnificPopup({
		type: 'image',
		gallery:{enabled:false}, // Enable?
		removalDelay: 300,
		mainClass: 'mfp-fade',
		closeBtnInside: false,
		closeOnContentClick: true,
		image: {
			titleScr: 'alt'
		}

	});

}

//basic refresh function to call when any change
function refresh() {
	if( $(window).width() < 440 ) {
		hideMenu();
	}
	else {
		$('#block1').css('height', '100%').css('overflow', 'show');
	}
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

	});



	//Rebind widow resize events to take place with imagesLoaded.js and masonry.js
	$(window).resize(function() {
		applyTiles();
		if( $(window).width() < 440 ) {
			hideMenu()
		}else {
			$('#block1').css('height', '100%').css('overflow', 'show');
		}

	});
	refresh();
	$('#menu ul li a').first().click();
});


