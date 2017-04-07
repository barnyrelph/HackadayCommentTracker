var article = window.location.pathname;

function getLatestReadArticle(url){
  return id = chrome.storage.get(url)||0;
}

var comments = document.querySelectorAll('[id^="div-comment-"]');
var ids=[];
comments.forEach(function(e){
  var parts=e.id.split("-");
  var id = parts[2];
  ids.push[id];
})
