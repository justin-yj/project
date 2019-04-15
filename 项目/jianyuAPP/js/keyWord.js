$(function(){

    $(".enterOne").focus(function(){
        $(".btnChoose").show();
    })

    $('.knowBtn').on('click',function(){
        $(".problemPop").hide()
    })
    $(".problem").on('click',function(){
        $(".problemPop").css("display",'flex');
    })

    var showKeyWordLength = $(".showKeyWord ul li").length;
    if(showKeyWordLength>0){
        $(".addkeyWord").hide();
    }
    else{
        $(".showKeyWord").show();
    }
    //添加按钮
    $(".addKeyWord i").on('click',function(){
        $(".addkeyWord").show();
        $(".showKeyWord").hide();
    })

    // 编辑
    $(".editKeyWord").on('click',function(){
        $('.modify span').each(function(item){
            $('.modify span')[0].contentEditable = true
            console.log($('.modify span')[0].contentEditable)
        })
        $(this).parent().hide()
        $(this).parent().siblings().css('display','block')
    })

    //去空格方法
    String.prototype.trim=function(){
        return this.replace(/(^\s*)|(\s*$)/g, ' ');
     }

    //关键词个数
$('.modify span').keydown(function(){
    var olength = $(this).text().replace(/\s+/g,'').length;
    console.log(olength)
    if(olength>100){
        $('.fontLength').show();
        $(this)[0].contentEditable = false
        setTimeout(function(){
            $('.fontLength').hide()
        },1000)
    }
})

    $(".addExclusion").on('click',function(){
        $('.exclusion').show();
        $('.showKeyWord').hide();
    })
    
})