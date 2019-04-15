$(function(){
	
	$(".treeListMain .top").click(function(){
	  var styleNow = $(this).parent().find(".right").is(":hidden");
	  if(styleNow){
	  	$(this).parent().find(".top").siblings(".right").slideDown(300);
		$(this).css("background","url(./images/folderopen.gif) no-repeat 19px,url(./images/minus.gif) no-repeat left");
	  }else{
	  	$(this).parent().find(".top").siblings(".right").slideUp(300);
		$(this).find(".imgOne").attr("src","./images/plus.gif");
		$(this).css("background","url(./images/folder.gif) no-repeat 19px,url(./images/plus.gif) no-repeat left");
	  }
		
	})

})
