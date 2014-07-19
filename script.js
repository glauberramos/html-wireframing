$(document).ready(function () {
    $(feedbacks).each(function() {
    	var feedbackHtml = Mustache.render(feedbackTemplate, this);
    	var feedbackId = this.number();

        $(this.selector()).prepend(feedbackHtml);

        $('[data-id=' + feedbackId + ']').find('.btn').click(function() {
    		addComment(feedbackId);
    	});
    });

    function addComment(id) {
      var feedback = $('[data-id=' + id + ']');
      var comment = new uifeedback.model.comment(feedback.find('.name').val(), feedback.find('.text').val());
 
 	  //update model
      feedbacks[id-1].comments().push(comment);

      //update html
      $(feedback).find('.comments').append(Mustache.render(commentTemplate, comment));
    }

	document.addEventListener('click', function(event) {
		var selector = unique(event.target);
	}, false);
});
