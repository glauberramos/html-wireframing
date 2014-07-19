$(document).ready(function () {
    $(feedbacks).each(function() {
        $(this.selector()).prepend(Mustache.render(feedbackTemplate, this));
    });

	document.addEventListener('click', function(event) {
		var selector = unique(event.target);
	}, false);
});
