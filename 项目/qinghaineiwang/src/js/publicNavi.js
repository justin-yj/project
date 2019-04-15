//头部导航
var indexOld;
$(".naviList li").click(function(){
	var valde = $(this).index();
	localStorage.setItem(indexOld,valde);
//	$(this).addClass("light").siblings().addClass("light");
})
var indexNew = localStorage.getItem(indexOld);
$(".naviList li").eq(indexNew).addClass('light').siblings().removeClass('light');

//var height = $(".guide").height();
//var gHeight = $(document.body).height()-200;
//var newHeight = gHeight+200;
//if(height<gHeight){
//	$(".guide").css("height",newHeight);
//}
