$(function() {

	$('.icon-mobile').click(function(e){
		e.preventDefault();
		$(this).stop().toggleClass('open');
		$('.nav-mobile').stop().toggleClass('open');
	});

});