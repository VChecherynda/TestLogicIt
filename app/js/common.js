$(function() {

	$('.icon-mobile').click(function(e){
		e.preventDefault();
		$(this).parent().toggleClass('nav-mobile');
		$(this).stop().toggleClass('open');
		$('.menu').stop().toggleClass('mobile');
	});

});