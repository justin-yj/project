$(function () {
    //获取小按钮
    var $oLi = $("ol>li");
    //获取图片的宽度
    var imgW = $("#imgs > li").width();

   
    //默认第一个小按钮是活动
    $($oLi[0]).addClass("current");

    //点击小按钮，图片移动，并给小按钮设置背景颜色
    $oLi.on("click", function () {
        //将活动的小按钮添加一个类
        $(this).addClass("current").siblings().removeClass("current");
        //获取索引
        var num = $(this).index();
        $("#imgs").animate({
            left: -num * imgW + "px"
        }, 300);
    });
    function move(){
        var num;
        $oLi.each(function () {
            //将ul向右移动
            if($(this).hasClass("current")) {
                //得到活动的索引,然后加1
                num = $(this).index() + 1;
                //让图片移动
                $("#imgs").animate({
                    left: -num * imgW + "px"
                }, 300);
                //到达最后一张，让ul从头开始
                if(num== $oLi.length) {
                    $("#imgs").animate({
                        left: "0px"
                    }, 0);
                    num = 0;
                }
            }
        });
        //小按钮的背景色相应的改变
        $($oLi[num]).addClass("current").siblings().removeClass("current");
    }
    //循环播放
    var timeId = setInterval(function () {
        move()
        
    }, 3000);
     //鼠标移入盒子显示左右按钮
     $("#box").on("mouseenter", function () {
        clearInterval(timeId)
     });
     //鼠标移出盒子隐藏左右按钮
     $("#box").on("mouseleave", function () {
         console.log(timeId)
         timeId = setInterval(function () {
            move()
            
        }, 3000);
     });
 

    // 要闻动态切换
    $(".banner-right .title span").mouseenter(function(){
        $(this).addClass("onlight").siblings().removeClass("onlight")
        $(".main ul").eq($(this).index()).show().siblings().hide()
    })

    // 政策法规切换
    $(".statute .more ul li").mouseenter(function(){
        console.log("aaa")
        $(this).addClass("active").siblings().removeClass("active")
        $(".statute .left .list").hide()
        $(".statute .left .list").eq($(this).index()).show()
    })
    //办事指南
    $(".guide .more ul li").mouseenter(function(){
        console.log("aaa")
        $(this).addClass("active").siblings().removeClass("active")
        $(".guide .left .list").hide()
        $(".guide .left .list").eq($(this).index()).show()
    })

})