feedbackTemplate = 
'<span class="feedback">' +
'  <figure>{{number}}</figure>' +
'  <div class="feedback-content">' +
'    <div class="comments">' +
'      {{#comments}}' +
'      <div class="comment-container">' +
'        <label class="user">{{userName}}</label>' +
'        <label class="comment">{{text}}</label>' +
'      </div>' +
'      {{/comments}}' +
'    </div>' +
'    <div id="input-container">' +
'      <input class="feedback-input" type="text" />' +
'      <input class="feedback-input" type="text" />' +
'      <input class="btn" type="button" />' +
'    </div>' +
'  </div>' +
'</div>';

var commentTemplate =
'<div class="comment-container">' +
'  <img class="user-image" src="{{image}}"></image>' +
'  <label class="comment">{{text}}</label>' +
'</div>';


'<span class="feedback"></span>'