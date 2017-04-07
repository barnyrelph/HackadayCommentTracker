var article = window.location.pathname;

function setLatestCommentForArticle(url, id){
  var data ={};
  data[url]=id;
  chrome.storage.local.set(data);
}

//Chrome storage get is Async, so callback kicks off the main processing of new items
chrome.storage.local.get(article, function(items){
	handleNewItems(items[article]|0);
});

function handleNewItems(previousLatestComment){
	//Load up all comments
	var comments = document.querySelectorAll('[id^="div-comment-"]');
	var newComments=[];
	var maxId=0;

	console.log("Previous highest comment: " + previousLatestComment);

	comments.forEach(function(e){
	  var parts=e.id.split("-");
	  var id = parts[2];

	  console.log("Processing comment " + id);

	  //If the comment has a higher ID than previuous
	  if(id > previousLatestComment) {
		  if(id > maxId){
		  	maxId=id;
		  }
		 newComments.push(e);
	  }

	});

  //debug -deliberately mark the first comment as new, so we can try out CSS changes without waiting for a new comment to be posted!
  /*
  if(comments.length){
  	newComments.push(comments[0]);
  	console.log("Adding " + comments[0].id +" for UI debugging");
  }
  */

	//store new latest id
	setLatestCommentForArticle(article, maxId);

	//Skip marking articles if there was no prior record 
	if(previousLatestComment>0){
		newComments.forEach(function(e){
			e.classList.add('newComment');
		});
	}

}