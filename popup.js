function positionCenter(content) {
	var top = $(window).scrollTop();
	var winW = $(window).width();
	var winH = $(window).height();
	var conW = $(content).width();
	var conH = $(content).height();
	var winW2 = (winW - conW) / 2;
	var winH2 = (winH - conH) / 2;

	$(content).css({
		'top' : winH2 + top,
		'left' : winW2,
	})
}


function shopopup(btn,popup){
		$(btn).on('click', function() {
			$(popup).toggleClass('block');
			console.log(2);
			positionCenter(popup);
			$('.dim').addClass('block');
		});
}
