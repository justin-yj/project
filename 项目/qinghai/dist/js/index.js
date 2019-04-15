"use strict";

//轮播图
jQuery(".slideBox").slide({
	mainCell: ".bd ul",
	effect: "left",
	autoPlay: true
});

//通知公告
jQuery(".slideTxtBox").slide({
	effect: "leftLoop"
});

jQuery(".naviList").slide({
	type: "menu",
	titCell: ".nLi",
	targetCell: ".naviSlide",
	effect: "slideDown",
	delayTime: 300,
	triggerTime: 0,
	returnDefault: true
});

var dcslen = $(".gkml dl").children().length;
if (dcslen > 6) {
	$(".gkml dl dd").each(function () {
		if ($(this).index() < 7) {
			$(this).css({
				float: "left",
				width: "50.1%"
			});
		} else {
			$(this).css({
				width: "74px",
				float: "right",
				position: "relative",
				right: "-6px",
				top: '-174px'
			});
		}
	});
}

$(".messageGk1 ul.messageGk1top li").mouseenter(function () {
	$(this).parent().parent().find(".messageGk1Main").hide();
	$(this).parent().parent().find(".messageGk1Main").eq($(this).index()).show();
	$(this).parent().find("li").removeClass("botderOn");
	$(this).addClass("botderOn");
});