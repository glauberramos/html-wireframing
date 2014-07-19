newData = [];

var query = new Parse.Query(Feedback);
var count = 0;

query.find({
  success: function(results) {
    $(results).each(function() {
    	var feedback = new uifeedback.model.feedback(this.get('feedbackId'), this.get('selector')); 

		var query = new Parse.Query(Comment);
		query.equalTo("parent", this);
		query.find({
		  success: function(comments) {
		  	count++;
		    $(comments).each(function() {
		    	feedback.addComment(this.get('userName'), this.get('text'));
		    });

		    newData.push(feedback);

			if(count === results.length) {
			    renderData();
			}
		  }
		});
	});
  },
  error: function(error) {
    console.log("Error: " + error.code + " " + error.message);
  }
});

function renderData() {
	$(newData).each(function() {
    	var feedbackHtml = Mustache.render(feedbackTemplate, this);
    	var feedbackId = this.number();

        $(this.selector()).prepend(feedbackHtml);

        $('[data-id=' + feedbackId + ']').find('.btn').unbind('click').bind('click', function() {
    		addComment(feedbackId);
    	});
    });
}

function addComment(id) {
  var feedback = $('[data-id=' + id + ']');

  var query = new Parse.Query(Feedback);
	query.equalTo("feedbackId", id);
	query.find({
	  success: function(feedbacks) {
	    var comment = new Comment();
	  	comment.set('parent', feedbacks[0]);
	  	comment.set('userName', feedback.find('.name').val());
	  	comment.set('text', feedback.find('.text').val());
	  	comment.save();

  		$(feedback).find('.comments').append(Mustache.render(commentTemplate, new uifeedback.model.comment(feedback.find('.name').val(), feedback.find('.text').val())));
	  }
});
}