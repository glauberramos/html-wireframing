addingFeedback = false;

$(document).ready(function() {
	$('body').append($('<span class="adding-feedback">PLEASE CLICK ON AN ELEMENT TO ADD A NOTE</span><span class="feedback-controls"><span class="open-close">|||</span><span class="feedback-buttons"><button id="add-feedback">ADD NOTE</button><button id="toggle-notes">HIDE NOTES</button></span></span>'));

	$('#add-feedback').click(function() {
		addingFeedback = true;
		$('.adding-feedback').addClass('visible');
		$('body').append($('<style>body { cursor: -webkit-image-set(url(add.png) 1x, url(add.png) 2x),auto; }</style>'))
		document.addEventListener('click', addFeedback, false);
	});

	$('.open-close').click(function() {
		if(!$('.feedback-controls').hasClass('open')) {
			$('.feedback-controls').animate({ right: 0}, 200);
			$('.feedback-controls').addClass('open');
		} else {
			$('.feedback-controls').animate({ right: '-7%'}, 200);
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

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = ".feedback-controls{position:fixed;top:40%;right:-7%}.open-close{display:inline-block;font-size:17px;top:60px;width:16px;cursor:pointer;height:42px;vertical-align:top;background:#267CB6;color:#fff;padding:18px 0 0 4px;border-radius:4px 0 0 4px}.adding-feedback{display:none;font-family:\'Brandon Text\',Avenir,Helvetica,sans-serif;font-size:11px;position:fixed;top:0;background:#267CB6;color:#fff;padding:5px 8px;width:100%;left:0;text-align:center}.adding-feedback.visible{display:inline-block}.feedback-buttons{display:inline-block}.feedback-controls button{height:30px;background:#3498db;border:0;color:#fff;outline:0;width:100px;display:block;cursor:pointer;vertical-align:top;border-bottom:1px solid #267CB6}.feedback-controls button:last-child{border-bottom:0}.feedback .btn{background:#5fbe20;color:#fff;border:0;width:100%;height:40px;margin-top:7px;cursor:pointer;border-radius:0 0 6px 6px}.feedback .btn:disabled{background:#ccc;color:#bbb;cursor:not-allowed}.feedback .user{background:#3498db;color:#fff;padding:2px 4px;border-radius:2px;display:inline-block;max-width:223px;line-height:21px;font-weight:400}.feedback{font-family:\'Brandon Text\',Avenir,Helvetica,sans-serif;color:#444;font-size:14px;width:26px;height:17px;display:block;background-color:#3498db;position:absolute;-webkit-border-radius:50px;-moz-border-radius:50px;-ms-border-radius:50px;-o-border-radius:50px;border-radius:50px;padding:10px 0 0!important;margin-top:-10px;margin-left:-10px;font-weight:400}.feedback figure{font-size:14px;line-height:100%;margin:0;color:#fff;text-align:center;line-height:.7em}.feedback{position:absolute}.feedback .feedback-content{display:none;position:absolute;background-color:#f3f3f3;border-radius:7px;margin-top:10px;margin-left:-1px;width:250px;box-shadow:0 2px 10px rgba(0,0,0,.1),0 8px 6px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.1)}.feedback:hover .feedback-content{display:block;z-index:999}.feedback .feedback-content.open{display:block}.feedback .feedback-content:before{border:solid;border-color:#F3F3F3 transparent;border-width:0 7px 9px;top:-9px;left:7px;content:\"\";position:absolute}.feedback .comment-span{float:left}.feedback .comment{line-height:1.5em;display:block;float:left;margin-bottom:8px;margin-right:22px;width:100%;font-weight:400}.feedback .comments{float:left;clear:both}.feedback .comment-container{float:left;clear:both;border-bottom:1px solid rgba(0,0,0,.05);width:230px;padding:10px}.feedback .feedback-input{outline:0;background-color:#EEE;border-radius:1px;margin-left:8px;margin-bottom:3px;width:233px;background:0;border:1px dashed #ccc;padding:7px;min-height:30px;margin-top:4px;font-family:'Brandon Text',Avenir,Helvetica,sans-serif;color:#444;font-size:14px}.feedback textarea{resize:none;overflow-y:hidden}.feedback .feedback-input:first-child{margin-top:10px}.feedback .feedback-input:focus,.feedback-input[value=\"\"]{border:1px solid transparent}.border{outline:4px solid #3498db}";
document.body.appendChild(css);

function addFeedback(event) {
	if(addingFeedback
		&& unique(event.target) != '#add-feedback' 
		&& unique(event.target) != '#toggle-notes' 
		&& unique(event.target) != 'html > body'
		&& !feedbackSelectors.contains(unique(event.target)) 
		&& !(unique(event.target).indexOf('.feedback') > -1) 
		&& !(unique(event.target).indexOf('.feedback-controls') > -1) 
		&& !(unique(event.target).indexOf('.adding-feedback') > -1)
	) {
		
		//disable mode of adding feedback
		addingFeedback = false;
		$('.adding-feedback').removeClass('visible');
		event.stopImmediatePropagation();
		$('body').append($('<style>body { cursor: auto; }</style>'))
		document.removeEventListener('click', addFeedback, false);

		//adding feedbackselector to the list
		var selector = unique(event.target);
		var feedbackId = randomString();
		var nextFeedbackNumber = $('.feedback').length + 1;
		feedbackSelectors.push(selector);

		//create model and html
		var feedbackFrontend = new uifeedback.model.feedback(feedbackId, nextFeedbackNumber, selector); 
		newData.push(feedbackFrontend);
		var feedbackHtml = Mustache.render(feedbackTemplate, feedbackFrontend);
		var newFeedback = $(feedbackHtml).prependTo(selector);

		//settings on new feedback
		newFeedback.addClass('new');
		newFeedback.find('.feedback-content').addClass('open');
		newFeedback.find('textarea').autosize();
		newFeedback.find('input').first().focus();
		newFeedback.find('.feedback-content').mouseleave(function() {
			$(this).removeClass('open');
		});

		//binding add comment
		$('[data-id=' + feedbackId + ']').find('.btn').unbind('click').bind('click', function() {
			$(this).parent().parent().removeClass('open');
    		addComment(feedbackId);
    	});
	}
}