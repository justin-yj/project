$(function(){

    var interaction;

    $(".title li").on("click",function(){
        localStorage.setItem("interaction",$(this).index())
        $(".title li").removeClass("onLight")
        $(this).addClass("onLight")
    })
    interaction =  localStorage.getItem("interaction")
    $(".title li").eq(interaction).addClass("onLight").siblings().removeClass("onLight")
    console.log(interaction)

})