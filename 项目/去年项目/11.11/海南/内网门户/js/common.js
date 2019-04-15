$(function(){
	
	//公文流转
	$("#partake").click(function(){
		$("#menu1").show();
	});
	$(".qX").click(function(){
		$(this).parent().parent().hide();
	});
	//查看更多
	$("#more").click(function(){
		$("#checkMore").show();
	});
	//点击返回上一层
	$(".back").click(function(){
		window.history.go(-1);
	})
	
})