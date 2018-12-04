$(document).ready(function() {

	var scrollTop = $(window).scrollTop(),
		windowWidth = $(window).width();

	//toggler function
	(function($) {
		$.fn.clickToggle = function(func1, func2) {
			var funcs = [func1, func2];
			this.data('toggleclicked', 0);
			this.click(function() {
				var data = $(this).data();
				var tc = data.toggleclicked;
				$.proxy(funcs[tc], this)();
				data.toggleclicked = (tc + 1) % 2;
			});
			return this;
		};
	}(jQuery));

	//lock/unlock body scroll
	function lockBody() {
		if($(window).scrollTop()) {
		 	scrollTop = $(window).scrollTop();
		 	$('.wrapper').css({
		 		top: - (scrollTop)
		 	});
		}
		$('html,body').css({height: "100%", overflow: "hidden"});
	}
	function unlockBody() {
		$('html,body').css({height: "", overflow: ""});
		$('.wrapper').css({
			top: ''
		});
		window.scrollTo(0, scrollTop);
		window.setTimeout(function () {
			scrollTop = null;
		}, 0);
	}

	//custom dropdown menu
	$('.select .select-option_selected').click(function(){
		var parent = $(this).parents('.select');
		
		parent.find('.select-list').fadeIn(0);
		parent.toggleClass('select-open');
	});

	$('.select .select-list .select-option').click(function(){
		var $this = $(this);
		var text = $this.text();
		$this.parents('.select').find('.select-option_selected .text').text(text);
		$this.parents('.select').find('input[type="hidden"]').val(text);
		$this.parents('.select-list').fadeOut(0);		
		$this.parents('.select').removeClass('select-open');
	});

	$(function(){
		$(document).click(function(event) {
			if ($(event.target).closest(".select").length) return;
			$(".select-list").fadeOut(0);		
			$('.select').removeClass('select-open');
			event.stopPropagation();
		});
	});

	//tabs on JS
	$('.tab-toggle').on('click' , function() {

		$(this).closest('.tabs-header').find('.tab-toggle_active').removeClass('tab-toggle_active');
		$(this).addClass('tab-toggle_active');

		var dataTab = $(this).attr("data-tab");

		$(this).closest('.tabs-wrapper').find(".tab-content[data-tab]").removeClass('tab-content_active');
		$(this).closest('.tabs-wrapper').find(".tab-content[data-tab='"+dataTab+"']").addClass('tab-content_active');

		return false;
	});

	
	//object-fit polyfill
	objectFitImages('.cover-img, .contain-img')

	/*$('.accordion-header').on('click' , function(){
		var body = $(this).closest('.accordion-item').find('.accordion-body');

		$('.accordion-body').not(body).slideUp(300).closest('.accordion-item').removeClass('active');
		body.slideToggle(300).closest('.accordion-item').toggleClass('active');
	})*/

	$('.accordion-header').on('click' , function(){
		$(this).closest('.accordion-item').find('.accordion-body').slideToggle(300);
		$(this).closest('.accordion-item').toggleClass('active')
	})


	$('.mobile-burger').on('click' , function(e){
		e.preventDefault;
		$(this).toggleClass('active');
		$('.header-bottom').toggleClass('visible');

		$('.search-button').addClass('visible');
		$('.nav-child.nav-child_active').removeClass('nav-child_active');
		$('.header-search.header-search_active').removeClass('header-search_active');
		$('.back-button').removeClass('visible');
	});
	$('.mobile-burger').clickToggle(function() {   
		lockBody();
	}, function() {
		unlockBody();
	});


	if(windowWidth >= 768) {
		$('.calendar-option_selected').click(function(){
			var parent = $(this).parents('.calendar');
			
			parent.find('.calendar-list').fadeIn(0);
			parent.toggleClass('calendar-open');
		});

		$('.calendar-list .calendar-option').click(function(){
			var $this = $(this);
			var text = $this.text();
			$this.parents('.calendar').find('.calendar-option_selected .text').text(text);
			$this.parents('.calendar').find('input[type="hidden"]').val(text);
			$this.parents('.calendar-list').fadeOut(0);		
			$this.parents('.calendar').removeClass('calendar-open');
		});

		$(function(){
			$(document).click(function(event) {
				if ($(event.target).closest(".calendar").length) return;
				$(".calendar-list").fadeOut(0);		
				$('.calendar').removeClass('calendar-open');
				event.stopPropagation();
			});
		});

	}

	if(windowWidth < 768) {
		$('.nav-item_parent').on('click' , function(e) {
			e.preventDefault;
			$(this).find('.nav-child').addClass('nav-child_active');			
			$('.search-button').removeClass('visible');
			$('.back-button').addClass('visible');
		});

		$('.back-button').on('click' , function(e) {
			e.preventDefault;
				$(this).removeClass('visible');	
			$('.search-button').addClass('visible');
			$('.header-search.header-search_active').removeClass('header-search_active');
			$('.nav-child.nav-child_active').removeClass('nav-child_active');
		})

		$('.search-button').on('click' , function(e) {
			e.preventDefault;
			$(this).removeClass('visible');	
			$('.back-button').addClass('visible');
			$('.header-search').addClass('header-search_active');
		})

	};

	$('.show-full-table').on('click' , function() {
		$(this).fadeOut(300);
		$(this).closest('.table').find('.additional').slideDown(300);
		return false;
	})

	if(windowWidth >= 768) {
		$('.match-slider').slick({
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			variableWidth: true,
			arrows: true,
			prevArrow: '<button type="button" class="slick-prev"></button>',
			nextArrow: '<button type="button" class="slick-next"></button>',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false,
					}
				}
			]
		});
	};

	$(".fancybox").fancybox({
		helpers : {
	        overlay : {
	            css : {
	                'background' : 'rgba(46,46,46,.9)'
	            }
	        }
	    },
		openEffect  : 'none',
        closeEffect : 'none',
        nextEffect  : 'none',
        prevEffect  : 'none',
        padding     : 0,
        margin      : [30, 0, 30, 0] // Increase left/right margin
	});

	$('.popup-close').on('click' , function(e) {
		e.preventDefault;
		$(this).closest('.popup').fadeOut(300);
	});

	$('.sticky-close').on('click' , function(e) {
		e.preventDefault;
		$(this).closest('.sticky').fadeOut(300);
	})

	
}); 
