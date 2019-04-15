$(function(){

    var affairsinex;

    $(".title li").on("click",function(){
        localStorage.setItem("affairsinex",$(this).index())
        $(".title li").removeClass("onLight")
        $(this).addClass("onLight")
    })
    affairsinex =  localStorage.getItem("affairsinex")
    $(".title li").eq(affairsinex).addClass("onLight").siblings().removeClass("onLight")
    console.log(affairsinex)

})