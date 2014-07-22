newData = [];
feedbackSelectors = [];

var query = new Parse.Query(Feedback);
query.ascending("createdAt");
query.equalTo("appKey", appKey);
var count = 0;
var numberCount = 0;

query.find({
  success: function(results) {
    $(results).each(function() {
    	numberCount++;
    	var feedback = new uifeedback.model.feedback(this.get('feedbackId'), numberCount, this.get('selector'));
    	feedbackSelectors.push(this.get('selector'));

		var query = new Parse.Query(Comment);
		query.equalTo("parent", this);
		query.ascending("createdAt");
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
    	var feedbackId = this.feedbackId();

        $(feedbackHtml).prependTo(this.selector()).find('textarea').autosize();
        $('[data-id=' + feedbackId + ']').find('.btn').unbind('click').bind('click', function() {
    		addComment(feedbackId);
    	});
    });
}

function findSelector(id) {
	var returnSelector;
	$(newData).each(function() {
		if(this.feedbackId() === id) {
			returnSelector = this.selector();
		}
	});

	return returnSelector;
}


//adding comments
function addComment(id) {
  var feedbackHtml = $('[data-id=' + id + ']');

  //check if the fields are populated
  if(feedbackHtml.find('.name').val() != "" && feedbackHtml.find('.text').val() != "") {
  	 
  	 // save if it is a new feedback
  	 if(feedbackHtml.hasClass('new')) {
  	 	var feedbackServer = new Feedback();
		feedbackServer.set('appKey', appKey);
		feedbackServer.set('feedbackId', id);
		feedbackServer.set('selector', findSelector(id));
		feedbackServer.save({
		  success: function(comments) {
	    	feedbackHtml.removeClass('new');
		  }
		});
  	 }

  	  //disable button after clicking on add comment
      feedbackHtml.find('.btn').attr('disabled', 'disabled');

      //query to search for its feedback parent
	  var query = new Parse.Query(Feedback);
	  query.equalTo("feedbackId", id);
	  query.equalTo("appKey", appKey);
	  query.find({
	    success: function(feedbacks) {
		  var comment = new Comment();
		  comment.set('parent', feedbacks[0]);
		  comment.set('userName', feedbackHtml.find('.name').val());
		  comment.set('text', feedbackHtml.find('.text').val());
		  comment.save();

		  var newComment = Mustache.render(commentTemplate, new uifeedback.model.comment(feedbackHtml.find('.name').val(), feedbackHtml.find('.text').val()));

		  //append comment html to the markup and clear everything
	  	  $(newComment).appendTo('[data-id=' + id + '] .comments').show('normal');
	  	  feedbackHtml.find('.name').val('')
	  	  feedbackHtml.find('.text').val('')
	  	  feedbackHtml.find('textarea').css('height', '35px')
	  	  feedbackHtml.find('.btn').removeAttr('disabled');
		}
	  });
	}
}