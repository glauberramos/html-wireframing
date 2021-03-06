var uifeedback = uifeedback || {};
	uifeedback.model = uifeedback.model || {}

	uifeedback.model.feedback = function(feedbackId, number, selector) {
	var comments = [];
	var feedbackId = feedbackId || 0;
	var number = number || 0;
	var selector = selector || 0;

	function addComment(userName, text) {    
		comments.push(new uifeedback.model.comment(userName, text));
	}

	return {
		selector: function() { return selector; },
		feedbackId: function() { return feedbackId; },
		number: function() { return number; },
		comments: function() { return comments; },
		addComment: addComment
	};
};

uifeedback.model.comment = function(userName, text) {
	var userName = userName;
	var text = text || '';

	return {
		text: function() { return text; },
		userName: function() { return userName; }
	};
};