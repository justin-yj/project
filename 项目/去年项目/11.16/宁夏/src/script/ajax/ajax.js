/*
 * 接口类
 */
//e10cd3e0209b7a4d46847209d38f24f2
//Bearer zOiGAyKA6KLiRp9TZTMUMfl90uG_eXazIUo6qxqmvCwSBWpAlr9S0gwWKVnfg7xOum4muLzYGJ52Jve9vQmDEthV9plR-wq0k4j-uD-1JTQtGowYXTP5thx1L9yp1hK2hID0jkMm7lyVekMFRZGPt8Tdb2iFqVO8yvQpT9Ry4u-Q-q5dhEMSmcJrCNrLPP6lRFTdi2u-E_H6nepYdck6Chzzav7KxQKlawBHroCAbVmX6e8CoAHk6YoWkcwHYI1ZLDPT6RznNbjzLdd3TlEOmg
var $http = (function($) {
    var clazz = null, baseUrl = '';
        //baseUrl = "https://api.daolan.com.cn:40405/1/tour/unit/26275/recommend?source=jinan&ds=jinan&count=10&page=1";
    var _instance = function() {}
    //推荐
    // /1/tour/unit/26275/recommend?source=jinan&ds=jinan&count=10&page=1
    //详情
    // /1/tour/unit/26275?source=jinan&ds=jinan
    //评论
    // /1/unit/26275/comment?count=10&page=1
    //资源
    // /1/tour/unit/26275/asset/2?source=jinan&ds=jinan&count=10&page=1
    _instance.prototype.ajaxGet = function(url) {
        var deferred = $.Deferred();
        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            success: function(suc) {
                deferred.resolve(suc);
            },
            error:function(err){
                deferred.reject(err);
            }
        });
        return deferred;
    };
    //获取景区详情数据
    _instance.prototype.getInfo = function(params) {
        var paramStr = $.param(params);
        return this.ajaxGet('./Proxy.ashx?method=GetInfo&' + paramStr);
    };

    //获取推荐
    _instance.prototype.getRecommend = function(params) {
        var paramStr = $.param(params);
        return this.ajaxGet('./Proxy.ashx?method=GetRecommend&' + paramStr);
    };

    //获取评论信息
    _instance.prototype.getComment = function(params) {
        var paramStr = $.param(params);
        return this.ajaxGet('./Proxy.ashx?method=GetComment&' + paramStr);
    };

    //获取实时攻略信息
    _instance.prototype.getSSGL = function(params) {
        var paramStr = $.param(params);
        return this.ajaxGet('./Proxy.ashx?method=GetSSGL&' + paramStr);
    };

    //获取每日美景信息
    _instance.prototype.getAssert = function(params) {
        var paramStr = $.param(params);
        return this.ajaxGet('./Proxy.ashx?method=GetAsset&' + paramStr);
    };
    if (!clazz) {
        clazz = new _instance();
    }
    return clazz;
})(jQuery);
