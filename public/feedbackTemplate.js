feedbackTemplate = 
'<span data-id="{{number}}" class="feedback">' +
'  <figure>{{number}}</figure>' +
'  <span class="feedback-content">' +
'    <div class="comments">' +
'      {{#comments}}' +
'      <div class="comment-container">' +
'        <label class="user">{{userName}}</label>' +
'        <label class="comment">{{text}}</label>' +
'      </div>' +
'      {{/comments}}' +
'    </div>' +
'    <div id="input-container">' +
'      <input class="feedback-input name" placeholder="Write your name..." type="text" />' +
'      <input class="feedback-input text" placeholder="Write a comment..." type="text" />' +
'      <input class="btn" type="button" value="POST THIS COMMENT" />' +
'    </div>' +
'  </div>' +
'</span>';

var commentTemplate =
'<div class="comment-container">' +
'    <label class="user">{{userName}}</label>' +
'    <label class="comment">{{text}}</label>' +
'</div>';


'<span class="feedback"></span>'