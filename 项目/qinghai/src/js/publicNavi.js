//头部导航
var indexOld;
$(".naviList li").click(function(){
	var valde = $(this).index();
	localStorage.setItem(indexOld,valde);
//	$(this).addClass("light").siblings().addClass("light");
})
var indexNew = localStorage.getItem(indexOld);
$(".naviList li").eq(indexNew).addClass('light').siblings().removeClass('light');