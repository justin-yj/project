
$("#title li"). mouseover(function(){
	console.log(111);
		$(this).addClass("on").siblings("li").removeClass("on");
		
		var $index = $(this).index();
		$(".t_con ul").eq($index).addClass("now").siblings("ul").removeClass("now");
});

$("#title2 li"). mouseover(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		var $index = $(this).index();
		$("#t_con4 ul").eq($index).addClass("now").siblings("ul").removeClass("now");
});

$("#title3 li"). mouseover(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		var $index = $(this).index();
		$("#t_con2 ul").eq($index).addClass("now").siblings("ul").removeClass("now");
});

$("#title4 li"). mouseover(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		var $index = $(this).index();
		$("#t_con3 ul").eq($index).addClass("now").siblings("ul").removeClass("now");
});

//模态框
$('#more2').click(function(){
	$('#mtk_con').css('display','block');
});

$('#close').click(function(){
	$('#mtk_con').css('display','none');
})
