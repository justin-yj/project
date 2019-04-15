"use strict";

$(function () {

    var affairsinex;

    $(".title li").on("click", function () {
        localStorage.setItem("affairsinexss", $(this).index());
        $(".title li").removeClass("onLight");
        $(this).addClass("onLight");
    });
    affairsinex = localStorage.getItem("affairsinexss");
    $(".title li").eq(affairsinex).addClass("onLight").siblings().removeClass("onLight");
    console.log(affairsinex);
});