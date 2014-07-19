(function() {
	feedbacks = [];

	var firstFeedback = new uifeedback.model.feedback(1, 'html > body > div:nth-child(2)');
	var secondFeedback = new uifeedback.model.feedback(2, 'html > body > div:nth-child(3)');
	var thirdFeedback = new uifeedback.model.feedback(3, 'html > body > div:nth-child(6)');

	firstFeedback.addComment('Glauber', 'Made some improvements in the colors');
	firstFeedback.addComment('Maria', 'Working on that');
	firstFeedback.addComment('Glauber', 'Looks cool thanks for that');

	secondFeedback.addComment('Glauber', 'Made some improvements in the colors');
	secondFeedback.addComment('Maria', 'Working on that');
	secondFeedback.addComment('Glauber', 'Looks cool thanks for that');

	thirdFeedback.addComment('Glauber', 'Made some improvements in the colors');

	feedbacks.push(firstFeedback);
	feedbacks.push(secondFeedback);
	feedbacks.push(thirdFeedback);
})();