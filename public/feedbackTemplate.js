feedbackTemplate = 
'<span data-id="{{number}}" class="feedback">' +
'  <figure>{{number}}</figure>' +
'  <span class="feedback-content open">' +
'    <div class="comments">' +
'      {{#comments}}' +
'      <div class="comment-container">' +
'        <label class="comment">{{text}}</label>' +
'        <label class="user">{{userName}}</label>' +
'      </div>' +
'      {{/comments}}' +
'    </div>' +
'    <div class="input-container">' +
'      <input class="feedback-input name" placeholder="Write your name..." type="text" />' +
'      <textarea class="feedback-input text" placeholder="Write a comment..." />' +
'      <input class="btn" type="button" value="POST THIS COMMENT" />' +
'    </div>' +
'  </div>' +
'</span>';

var commentTemplate =
'<div style="display: none" class="comment-container">' +
'    <label class="comment">{{text}}</label>' +
'    <label class="user">{{userName}}</label>' +
'</div>';


'<span class="feedback"></span>'