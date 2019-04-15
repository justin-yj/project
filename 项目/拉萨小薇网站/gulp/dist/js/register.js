"use strict";

$(function () {
    $("#login").bind("click", function () {
        $(".register").show();
        $(".registerMain").show();
        $(".loginError").hide();
    });
    $(".longin").bind("click", function () {
        $(".loginError").show();
        $(".registerMain").hide();
    });
    $(".loginRight").bind("click", function () {
        $(".register").hide();
    });
    $(".registerMain .zhuce").bind("click", function () {
        // $(".loginError").hide();
        $(".startRegister").show();
        $(".registerMain").hide();
    });
    $("#startRegister").bind("click", function () {
        $(".startRegister").hide();
        $(".successRegister").show();
    });
    $(".close").bind("click", function () {
        $(".register").hide();
    });
});