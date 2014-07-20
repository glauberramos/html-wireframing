Parse.initialize("b5FjcYNyBOrVW9khuHbEePlaIjZFFaEYzvOIb33x", "RKxRYi9DhqO804pzJB78nOOsnramIdjVdP2cZ1Dx");

var Feedback = Parse.Object.extend("Feedback");
var Comment = Parse.Object.extend("Comment");

function createData() {
	var feedback = new Feedback();
	feedback.set('feedbackId', 1);
	feedback.set('selector', 'html > body > div:nth-child(2)');
	feedback.save();

	var comment = new Comment();
	comment.set('parent', feedback);
	comment.set('userName', 'Glauber');
	comment.set('text', 'Made some improvements in the colors');
	comment.save();

	var comment2 = new Comment();
	comment2.set('parent', feedback);
	comment2.set('userName', 'Glauber');
	comment2.set('text', 'Made some improvements in the colors');
	comment2.save();

	var comment3 = new Comment();
	comment3.set('parent', feedback);
	comment3.set('userName', 'Glauber');
	comment3.set('text', 'Made some improvements in the colors');
	comment3.save();

	var feedback2 = new Feedback();
	feedback2.set('feedbackId', 2);
	feedback2.set('selector', 'html > body > div:nth-child(3)');
	feedback2.save();

	var comment4 = new Comment();
	comment4.set('parent', feedback2);
	comment4.set('userName', 'Glauber');
	comment4.set('text', 'Made some improvements in the colors');
	comment4.save();

	var comment5 = new Comment();
	comment5.set('parent', feedback2);
	comment5.set('userName', 'Glauber');
	comment5.set('text', 'Made some improvements in the colors');
	comment5.save();

	var comment6 = new Comment();
	comment6.set('parent', feedback2);
	comment6.set('userName', 'Glauber');
	comment6.set('text', 'Made some improvements in the colors');
	comment6.save();

	var feedback3 = new Feedback();
	feedback3.set('feedbackId', 3);
	feedback3.set('selector', 'html > body > div:nth-child(6)');
	feedback3.save();

	var comment7 = new Comment();
	comment7.set('parent', feedback3);
	comment7.set('userName', 'Glauber');
	comment7.set('text', 'Made some improvements in the colors');
	comment7.save();
};