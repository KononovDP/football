$(document).ready(function() {

	var scrollTop = $(window).scrollTop();

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
	$('.select-option_selected').click(function(){
		var parent = $(this).parents('.select');
		
		parent.find('.select-list').fadeIn(0);
		parent.toggleClass('select-open');
	});

	$('.select-list .select-option').click(function(){
		var $this = $(this);
		var text = $this.text();
		$this.parents('.select').find('.select-option_selected').text(text);
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

	//popup
	$('.js-show-popup').on('click', function() {
		var dataPopup = $(this).attr("data-popup");

		$(".popup-overlay[data-popup='"+dataPopup+"']").fadeIn('500');

		var parentHeight = $('.popup-centering').height();
		var childrenHeight = $('.popup').height();

		if (childrenHeight >= parentHeight) {
			$('.popup').addClass('popup-scrollable');
		} else {
			$('.popup').removeClass('popup-scrollable');
		}

		$(window).resize(function(event) {
			var parentHeight = $('.popup-centering').height();

			var childrenHeight = $('.popup').height();

			if (childrenHeight >= parentHeight) {
				$('.popup').addClass('popup-scrollable');
			} else {
				$('.popup').removeClass('popup-scrollable');
			}
		});
	});

	$('.js-close-popup').on('click' , function() {
		$('.popup-overlay').fadeOut('500');
	});

	
	//blocks with equal height
	$(window).on('load resize', function() {
		$(".item-wrap").each(function () {
			var itemParent = $(this);
			var maxHeight = 0;

			itemParent.find('.item').each(function () {
			   $(this).height('auto');
			   var itemHeight = parseInt($(this).height());
			   if(itemHeight > maxHeight) {
				  maxHeight = itemHeight;
			   };
			});
			itemParent.find('.item').height(maxHeight);
		})
	});
	
	//object-fit polyfill
	objectFitImages('.cover-img')

	$('.accordion-header').on('click' , function(){
		var body = $(this).closest('.accordion-item').find('.accordion-body');

		$('.accordion-body').not(body).slideUp(300).closest('.accordion-item').removeClass('active');
		body.slideToggle(300).closest('.accordion-item').toggleClass('active');
	})

}); 
