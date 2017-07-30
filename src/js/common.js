$(function() {

	//For animation mobile menu

	var toggleMenu = (function(){
		var containerMenu = $('.nav'),
			menu = $('.menu'),
			menuItem = $('.menu__item'),
			iconMenu = $('.icon-mobile');

		var getToggle = function() {
			containerMenu.toggleClass('nav-mobile'); // For rebuild position of menu items
			menu.toggleClass('mobile');  // For rebuild position of menu items
			iconMenu.toggleClass('open'); // For animation hamburger icon
			menuItem.each(function(){ $(this).toggleClass('animate')});
		};

		return {
			getToggle: getToggle,
			iconMenu: iconMenu 
		};
	})();

	toggleMenu.iconMenu.on('click', toggleMenu.getToggle);

});