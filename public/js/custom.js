jQuery(document).ready(function($){

	// Top navbar animation
	// ------------------------------------------------------------------------
	$(document).bind('shrink-menu-init', function(e, status) {
		var topBarHeight = $('.navbar-extra-top').outerHeight(); // getting the height of the nabar-extra-top
		scrollMark = Math.max(topBarHeight, 30); // forced minimum of 30
		style = ".menu-shrink {top : -"+topBarHeight+"px !important;}";
		if ( !$('#ShrinkMenu').length ) {
			$( "<style></style>" ).attr('id','ShrinkMenu').data('scrollMark',scrollMark).appendTo( "head" ); // add custom CSS for height offset
		}
		$('#ShrinkMenu').html(style);
	});
	// navbar adjustments on scroll
	$(document).bind('shrink-menu', function(e, status){

        var $window = $(window);
        var $pane = $('#pane1');

        var windowsize = $window.width();

		scrollMark = $('#ShrinkMenu').data('scrollMark');
		// when scroll hits height of navbar top, apply style changes
		if ( $(this).scrollTop() < scrollMark )   {
			$('#MainMenu').removeClass('scrolled menu-shrink');
            /*$('.brand-logo-icon').css('display','none');*/
		} else {
			$('#MainMenu').addClass('scrolled menu-shrink');
            /*$('.brand-logo-icon').css('display','block');*/

		}
	});
	// trigger shrink-menu on scroll
	$(window).resize( function(){
		$(document).trigger('shrink-menu-init');
	});
	$(window).scroll( function(){
		$(document).trigger('shrink-menu');
	});




    // Tooltips
    // ------------------------------------------------------------------------
    $('[data-toggle="tooltip"]').tooltip({
        placement: function(tip, trigger) {
            // show above, unless no space. show bottom on affixed sub-nav
            return ( $(trigger).parents('#SubMenu.affix').length ) ? 'bottom' : 'auto top';
        }
    });

    // owl carousel
    // ------------------------------------------------------------------------
    if ( $('.featured-carousel').length ) {
        $(".featured-carousel").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 3800,
            autoplaySpeed: 800,
            navSpeed: 500,
            dots: false,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ]
        });
    }

    // Navbar Hover/Click Responsive Behavior
	// ------------------------------------------------------------------------
	collapseSize = 1299; // 768;



    // Things we want to trigger once, forcefully, after loading the page
    // ------------------------------------------------------------------------

    // Fire the menu shrink function
    $(document).trigger('shrink-menu-init');
    $(document).trigger('shrink-menu');

});
