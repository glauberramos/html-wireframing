addingFeedback = false;

$(document).ready(function() {
	$('body').append($('<button id="add-feedback">Add feedback</button>'));

	$('#add-feedback').click(function() {
		addingFeedback = true;
		document.addEventListener('click', addFeedback, false);
	});
});

function addFeedback(event) {
	if(addingFeedback && unique(event.target) != '#add-feedback') {
		addingFeedback = false;
		document.removeEventListener('click', addFeedback, false);

		var selector = unique(event.target);
		var nextFeedbackId = $('.feedback').length + 1;

		var feedback = new Feedback();
		feedback.set('feedbackId', nextFeedbackId);
		feedback.set('selector', selector);
		feedback.save({
		  success: function(comments) {
		  	var feedback = new uifeedback.model.feedback(nextFeedbackId, selector); 
		  	var feedbackHtml = Mustache.render(feedbackTemplate, feedback);
			$(selector).prepend(feedbackHtml);

			$('[data-id=' + nextFeedbackId + ']').find('.btn').unbind('click').bind('click', function() {
	    		addComment(nextFeedbackId);
	    	});
		  }
		});
	}
}