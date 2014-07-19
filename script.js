$(document).ready(function () {
    $(feedbacks).each(function() {
    	var feedbackHtml = Mustache.render(feedbackTemplate, this);
    	var feedbackId = this.number();

        $(this.selector()).prepend(feedbackHtml);

        console.log($('[data-id=' + feedbackId + ']').find('btn'));

        $('[data-id=' + feedbackId + ']').find('.btn').click(function() {
    		addComment(feedbackId);
    	});
    });

    function addComment(id) {
      var feedback = $('[data-id=' + id + ']');

      feedback.find('.name')
      var comment = new uifeedback.model.comment(feedback.find('.name').val(), feedback.find('.text').val());
 
      function map(feedbackId, comment){
  	    if(this.id == feedbackId) {
            this.comments.push(comment);
        }
      }
 
      feedbacks = $(feedbacks).each(map.curry(id, comment));

      $(feedback).find('.comments').append(Mustache.render(commentTemplate, comment));
    }

	document.addEventListener('click', function(event) {
		var selector = unique(event.target);
	}, false);
});
