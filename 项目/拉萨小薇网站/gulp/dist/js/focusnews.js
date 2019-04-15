"use strict";

$(function () {
    //获取小按钮
    var $oLi = $(".subscript>span");
    //获取图片的宽度
    var imgW = $("#imgs > li").width();
    var imgLength = $("#imgs > li").length;

    //默认第一个小按钮是活动
    $($oLi[0]).addClass("onLight");

    //给左按钮注册点击事件
    $(".prepage").click(function () {
        //判断小按钮中哪个按钮是活动的
        var num;
        $oLi.each(function () {
            //将ul向右移动
            if ($(this).hasClass("onLight")) {
                num = $(this).index() - 1;
                console.log(num, "aaaa");
                if (num == -1) {
                    num = imgLength - 2;
                    $("#imgs").stop().animate({
                        left: -num * imgW + "px"
                    }, 500);
                } else {
                    $("#imgs").animate({
                        left: -num * imgW + "px"
                    }, 500);
                }
                console.log(num, "sss");
            }
        });
        //小按钮的背景色相应的改变
        $($oLi[num]).addClass("onLight").siblings().removeClass("onLight");
    });
    //给右按钮注册点击事件
    $(".nextpage").click(function () {
        //判断小按钮中哪个按钮是活动的
        var num;
        $oLi.each(function () {
            //将ul向右移动
            if ($(this).hasClass("onLight")) {
                num = $(this).index() + 1;
                //当达到最左边时，移动到最右边

                if (num == $oLi.length) {
                    $("#imgs").stop().animate({
                        left: "0px"
                    }, 0);
                    num = 0;
                } else {
                    $("#imgs").stop().animate({
                        left: -num * imgW + "px"
                    }, 500);
                }
            }
        });
        //小按钮的背景色相应的改变
        $($oLi[num]).addClass("onLight").siblings().removeClass("onLight");
    });

    //点击小按钮，图片移动，并给小按钮设置背景颜色
    $oLi.on("click", function () {
        //将活动的小按钮添加一个类
        $(this).addClass("onLight").siblings().removeClass("onLight");
        //获取索引
        var num = $(this).index();
        $("#imgs").animate({
            left: -num * imgW + "px"
        }, 500);
    });
    function move() {
        var num;
        $oLi.each(function () {
            //将ul向右移动
            if ($(this).hasClass("onLight")) {
                //得到活动的索引,然后加1
                num = $(this).index() + 1;
                //让图片移动
                $("#imgs").animate({
                    left: -num * imgW + "px"
                }, 500);
                //到达最后一张，让ul从头开始
                if (num == $oLi.length) {
                    $("#imgs").animate({
                        left: "0px"
                    }, 0);
                    num = 0;
                }
            }
        });
        //小按钮的背景色相应的改变
        $($oLi[num]).addClass("onLight").siblings().removeClass("onLight");
    }
    //循环播放
    var timeId = setInterval(function () {
        //判断小按钮中哪个按钮是活动的
        move();
    }, 3000);
    //鼠标移入盒子显示左右按钮
    $(".left").on("mouseenter", function () {
        $(".switch").css("display", "block");
        clearInterval(timeId);
    });
    //鼠标移出盒子隐藏左右按钮
    $(".left").on("mouseleave", function () {
        $(".switch").css("display", "none");
        timeId = setInterval(function () {
            move();
        }, 3000);
    });
});