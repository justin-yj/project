"use strict";

var localStorangeNameOne;
var obj = [0, 0, 0];
var $thisIndexThree, $thisIndexTwo, $thisIndex;
//一级分类
$(".onInternetLeft .firstList>li>.firstSpan").click(function () {
	$thisIndex = $(this).parent().index();
	obj[0] = $thisIndex;
	localStorage.setItem(localStorangeNameOne, obj);
	var judege = $(this).hasClass("onLight");
	if (judege) {
		$(this).removeClass("onLight");
		$(this).next().hide(300);
	} else {
		$(".onInternetLeft .firstList>li>span").removeClass("onLight");
		$(this).addClass("onLight");
		$(".twoList").hide(300);
		$(this).next().show(300);
	}
});

//二级分类
$(".twoList>li>span").click(function () {
	$thisIndexTwo = $(this).parent().index();
	var wsbs_Index = localStorage.getItem(localStorangeNameOne);
	obj[0] = wsbs_Index[0];
	obj[1] = $thisIndexTwo;
	localStorage.setItem(localStorangeNameOne, obj);
	var dcs = $(this).parent().children().length;
	if (dcs == 2) {
		var judege = $(this).hasClass("changeColor");
		if (judege) {
			$(this).removeClass("changeColor");
			$(this).css("font-weight", 100);
			$(this).next().hide(300);
		} else {
			$(this).addClass("changeColor");
			$(this).next().show(300);
		}
	} else {
		$(".twoList>li span").css("font-weight", "100");
		$(this).parent().siblings().removeClass("changeColorOne");
		$(this).css("font-weight", "600");
	}
});

//三级分类
$(".threeList li").click(function () {
	$thisIndexThree = $(this).index();
	var wsbs_Index = localStorage.getItem(localStorangeNameOne);
	obj[0] = wsbs_Index[0];
	obj[1] = wsbs_Index[2];
	obj[2] = $thisIndexThree;
	console.log(obj);
	localStorage.setItem(localStorangeNameOne, obj);
	$(".threeList li").removeClass("onColors");
	$(this).addClass("onColors");
	$(".twoList>li span").css("font-weight", "100");
	$(this).parent().prev().css("font-weight", "600");
});

var wsbs_Index = localStorage.getItem(localStorangeNameOne);
console.log(wsbs_Index);
var judegeOne = $(".firstList>li").eq(wsbs_Index[0]).find("span").hasClass("onLight");
if (judegeOne) {
	$(".firstList>li").eq(wsbs_Index[0]).find("span").removeClass("onLight");
	$(".firstList>li").eq(wsbs_Index[0]).find("span").next().hide(300);
} else {
	$(".onInternetLeft .firstList>li>span").removeClass("onLight");
	$(".firstList>li").eq(wsbs_Index[0]).find("span").addClass("onLight");
	$(".twoList").hide(300);
	$(".firstList>li").eq(wsbs_Index[0]).find(".firstSpan").next().show(300);
}

var twoIndex = Number(wsbs_Index[2]);
var twoValue = $(".firstList>li").eq(wsbs_Index[0]).find(".twoList>li").eq(wsbs_Index[2]).children().length;
if (twoValue == 2) {
	$("#twoList>li").eq(twoIndex).find("span").addClass("changeColor");
	$("#twoList>li").eq(twoIndex).find("ol").show(300);
} else {
	$(".firstList>li").eq(wsbs_Index[0]).find(".twoList>li").eq(wsbs_Index[2]).addClass("changeColorOne");
}

$("#twoList>li").eq(wsbs_Index[2]).find(".threeList>li").eq(wsbs_Index[4]).addClass("onColors");