addingFeedback = false;

$(document).ready(function() {
	$('body').append($('<span class="feedback-controls"><button id="add-feedback">ADD FEEDBACK</button><button id="toggle-notes">HIDE NOTES</button></span>'));

	$('#add-feedback').click(function() {
		addingFeedback = true;
		$('body').append($('<style>body { cursor: -webkit-image-set(url(add.png) 1x, url(add.png) 2x),auto; }</style>'))
		document.addEventListener('click', addFeedback, false);
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
			$(event.target).css('outline', '4px solid #3498db');
		}
	}, function(event) {
		$(event.target).css('outline', 'none');
	});
});

function addFeedback(event) {
	if(addingFeedback && unique(event.target) != '#add-feedback' && !feedbackSelectors.contains(unique(event.target))) {
		addingFeedback = false;
		event.stopImmediatePropagation();
		$('body').append($('<style>body { cursor: auto; }</style>'))
		document.removeEventListener('click', addFeedback, false);

		var selector = unique(event.target);
		var nextFeedbackId = $('.feedback').length + 1;
		feedbackSelectors.push(selector);

		var feedbackFrontend = new uifeedback.model.feedback(nextFeedbackId, selector); 
		var feedbackHtml = Mustache.render(feedbackTemplate, feedbackFrontend);
		$(selector).prepend(feedbackHtml);

		var feedback = new Feedback();
		feedback.set('feedbackId', nextFeedbackId);
		feedback.set('selector', selector);
		feedback.save({
		  success: function(comments) {
			$('[data-id=' + nextFeedbackId + ']').find('.btn').unbind('click').bind('click', function() {
	    		addComment(nextFeedbackId);
	    	});
		  }
		});
	}
}