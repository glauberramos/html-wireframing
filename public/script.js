addingFeedback = false;

$(document).ready(function() {
	$('body').append($('<button id="add-feedback">Add feedback</button>'));

	$('#add-feedback').click(function() {
		addingFeedback = true;
		$('body').append($('<style>body { cursor: -webkit-image-set(url(add.png) 1x, url(add.png) 2x),auto; }</style>'))
		document.addEventListener('click', addFeedback, false);
	});

	$("body *").hover(function(event) {
		if(addingFeedback) {
			$(event.target).addClass('border');
		}
	}, function(event) {
		$(event.target).removeClass('border');
	});
});

function addFeedback(event) {
	if(addingFeedback && unique(event.target) != '#add-feedback') {
		addingFeedback = false;
		event.stopImmediatePropagation();
		$('body').append($('<style>body { cursor: auto; }</style>'))
		document.removeEventListener('click', addFeedback, false);

		var selector = unique(event.target);
		var nextFeedbackId = $('.feedback').length + 1;

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