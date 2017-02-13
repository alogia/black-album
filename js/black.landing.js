var landingImgs = "/landing.conf"
var landingRoot = "/landing/"
var $kb;


function loadLanding(url) {

	$('#kenburns').attr('width', $(window).width());
	$('#kenburns').attr('height', $(window).width());

	$.get(url, function (res) {
		var as = $(res).find('a');
		var names = as.map(function () { return $(this).attr('href'); }).get().slice(4);
		var imgs = names.map(function (i) {
			return landingRoot + i
		});
		$kb = $("#kenburns").kenburned({
			images: imgs,
			frames_per_second: 30,
			display_time: 5000,
			fade_time: 1000,
			zoom: 1.2,
			background_color:'#F7F6F5'
		});
	});
}

// Doc's ready, Bro

$(document).ready(function($) {
	loadLanding('/landing/');
	$(window).resize(function() {
	});
});
