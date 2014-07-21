addingFeedback = false;

$(document).ready(function() {
	$('body').append($('<span class="adding-feedback">PLEASE CLICK ON AN ELEMENT TO ADD A NOTE</span><span class="feedback-controls"><span class="open-close">|||</span><button id="add-feedback">ADD NOTE</button><button id="toggle-notes">HIDE NOTES</button></span>'));

	$('#add-feedback').click(function() {
		addingFeedback = true;
		$('.adding-feedback').addClass('visible');
		$('body').append($('<style>body { cursor: -webkit-image-set(url(add.png) 1x, url(add.png) 2x),auto; }</style>'))
		document.addEventListener('click', addFeedback, false);
	});

	$('.open-close').click(function() {
		if(!$('.feedback-controls').hasClass('open')) {
			$('.feedback-controls').animate({ width: 100}, 200);
			$('.feedback-controls').addClass('open');
		} else {
			$('.feedback-controls').animate({ width: 0}, 200);
			$('.feedback-controls').removeClass('open');
		}
	});

	$('#toggle-notes').click(function() {
		if($('#toggle-notes').text() == "HIDE NOTES") {
			$('.feedback').hide();
			$('#toggle-notes').text("SHOW NOTES");
		} else {
			$('.feedback').show();
			$('#toggle-notes').text("HIDE NOTES");
		}
	});

	$("body *").hover(function(event) {
		$('body *').css('outline', 'none');
		if(addingFeedback) {
			$(event.target).css('outline', '3px solid #3498db');
		}
	}, function(event) {
		$(event.target).css('outline', 'none');
	});
});

function addFeedback(event) {
	if(addingFeedback 
	&& unique(event.target) != '#add-feedback' 
	&& unique(event.target) != '#toggle-notes' 
	&& unique(event.target) != 'html > body'
	&& !feedbackSelectors.contains(unique(event.target)) 
	&& !(unique(event.target).indexOf('.feedback') > -1) 
	&& !(unique(event.target).indexOf('.feedback-controls') > -1) 
	&& !(unique(event.target).indexOf('.adding-feedback') > -1)) {
		
		//disable mode of adding feedback
		addingFeedback = false;
		$('.adding-feedback').removeClass('visible');
		event.stopImmediatePropagation();
		$('body').append($('<style>body { cursor: auto; }</style>'))
		document.removeEventListener('click', addFeedback, false);

		var selector = unique(event.target);
		var nextFeedbackId = $('.feedback').length + 1;
		feedbackSelectors.push(selector);

		var feedbackFrontend = new uifeedback.model.feedback(nextFeedbackId, selector); 
		var feedbackHtml = Mustache.render(feedbackTemplate, feedbackFrontend);
		$(feedbackHtml).prependTo(selector).find('textarea').autosize();

		var feedback = new Feedback();
		feedback.set('appKey', appKey);
		feedback.set('feedbackId', nextFeedbackId);
		feedback.set('selector', selector);
		feedback.save({
		  success: function(comments) {
			$('[data-id=' + nextFeedbackId + ']').find('.btn').unbind('click').bind('click', function() {
				$(this).parent().parent().removeClass('open');
	    		addComment(nextFeedbackId);
	    	});
		  }
		});
	}
}