'use strict';
$(document).ready(function() {
    var downloadUrl = 'http://api.daolan.com.cn:40605/1/dl/';
    //景区详情信息
    var result = null;


    function nano(template, data) {
        return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
            var keys = key.split("."),
                v = data[keys.shift()];
            for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
            return (typeof v !== "undefined" && v !== null) ? v : "";
        });
    }
    /*
     获取查询字符串
     * */
    var queryObjects = (function() {
        var query = window.location.search;
        if (query.indexOf('?') > -1) {
            query = query.substr(1);
        }
        var pairs = query.split('&');
        var queryObject = {};
        for (var i = 0; i < pairs.length; i++) {
            var splits = decodeURIComponent(pairs[i]).split('=');
            queryObject[splits[0]] = splits[1];
        }
        return queryObject;
    })();

    //判断ie浏览器版本
    var ie = (function() {
        var undef, v = 3,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
        while (all[0]) {
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->';
        }
        return v > 4 ? v : undef;
    }());

    function loading() {
        if (!$('.loading').hasClass('active')) {
            $('.loading').addClass('active');
        }
    }

    function unloading() {
        if ($('.loading').hasClass('active')) {
            $('.loading').removeClass('active');
        }
    }

    // 获取景区详情信息 
    function initApp() {
        var params = {
            id: queryObjects["id"],
            source: queryObjects["source"],
            ds: queryObjects["ds"]
        };
        $http.getInfo(params).then(function(suc) {
            result = suc;
            constructPage();
            unloading();
        }, function(err) {
            console.log(err);
        });
    }
    //构建页面
    function constructPage() {
        if (result && result.units && result.units.length > 0) {
            var unit = result.units[0];
            document.title = unit.unit_name;
            //创建幻灯片
            createSlider(unit);
            //实时攻略
            createSSGL(unit);
            //创建简介信息
            createBrief(unit);
            //为门票价格和开放时间赋值
            setPriceAndTimeInfo(unit);
            //为联系电话赋值
            setTelInfo(unit);
            //创建百度地图
            updateBDMap();
            //为地址和公交信息赋值
            setAddrAndTransInfo(unit);
            //创建每日美景
            var id = queryObjects["id"];
            if (unit.unit_type == 1) {
                if (unit.app) {
                    id = unit.app.id;
                }
            }
            createBeautiful(id);
            //获取并创建评论信息
            createComment();
            //创建其它景区
            createOtherScene();
        }
    }

    //34:城市攻略、33:当地热门-> typeid

    var ssglHtml = '<div><a href="{url}" style="display:block"><image width="150" height="110" id="other_ssgl_{unit_id}" data-longitude="{longitude}" data-latitude="{latitude}" data-src="{title_url}" style="display:block;"/><p>{title}</p></a></div>'
    //创建实时攻略
    function createSSGL(unit) {
        if (unit.app && unit.app.id) {
            var params = {
                id: queryObjects["typeid"] ? queryObjects["typeid"] : 34,
                rid: unit.app.id,
                source: queryObjects["source"],
                ds: queryObjects["ds"]
            };
            $http.getSSGL(params).then(function(suc) {
                console.log(suc);
                var units = suc.posts;
                if (units && units.length > 0) {
                    $('#other_ssgl').css('width', 150 * units.length + 15 + 6 * (units.length));
                    if (units.length > 0) {
                        for (var i = 0; i < units.length; i++) {
                            var unit = units[i];
                            unit.title_url = unit.titleImage.url;
                            var str = nano(ssglHtml, unit);
                            $('#other_ssgl').append(str);
                        }
                    }
                    var myScroll = new IScroll('#ssgl_wrapper', {
                        scrollX: true,
                        scrollY: false,
                        scrollbars: true,
                        disableTouch: false,
                        mouseWheel: false,
                        interactiveScrollbars: false,
                        shrinkScrollbars: 'scale',
                        fadeScrollbars: true
                    });
                    updateImg();
                }

            }, function(err) {
                console.log(err);
            });
        } else {
            $('#ssgl').css('style', 'none');
        }
    }

    //是否是手机端页面
    var isMobile = (function() {
        if (!(navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i))) { //如果不是手机端，则需要注册以下一些事件和方法
            return false;
        } else {
            return true;
        }
    })();

    function setPC() {
        //设置幻灯片中图片的高度为浏览器的内容区域高度
        if (!isMobile) {
            var height = $(window).height();
            $('.slider img.slider-img').attr('height', height);
            /* 添加PC端滑动效果 */
            $('#fullpage').fullpage({
                'verticalCentered': false,
                'css3': true,
                'anchors': ['index', 'intro', 'scene', 'comment', 'other'],
                'menu': '#menu',
                'sectionsColor': ['#F0F2F4', '#fff', '#fff', '#fff'],
                'navigation': true,
                'navigationPosition': 'left',
                'lockAnchors': true,
                'navigationTooltips': []
            });
            $('.navMain li').click(function() {
                $.fn.fullpage.moveTo($(this).attr('data-menuanchor'));
            });
        }
        $(window).resize(function() {
            var height = $(window).height();
            $('.slider img.slider-img').attr('height', height);
        });
    }

    var otherScene = '<div><image width="150" height="110" id="other_{unit_id}" data-longitude="{longitude}" data-latitude="{latitude}" src="" data-src="{thumb_url}"/><p>{unit_name}</p></div>'

    function createOtherScene(id) {
        var params = {
            id: queryObjects["id"],
            source: queryObjects["source"],
            ds: queryObjects["ds"]
        };
        $http.getRecommend(params).then(function(suc) {
            console.log(suc);
            var units = suc.units;
            if (units && units.length > 0) {
                $('#other_scene').css('width', 150 * units.length + 15 + 6 * (units.length));
                if (units.length > 0) {
                    for (var i = 0; i < units.length; i++) {
                        var unit = units[i];
                        var str = nano(otherScene, unit);
                        $('#other_scene').append(str);
                    }
                }
                var myScroll = new IScroll('#other_scene_wrapper', {
                    scrollX: true,
                    scrollY: false,
                    scrollbars: true,
                    disableTouch: false,
                    mouseWheel: false,
                    interactiveScrollbars: false,
                    shrinkScrollbars: 'scale',
                    fadeScrollbars: true
                });
                updateImg();
            }
        }, function(err) {
            console.log(err);
        });
    }

    var commentCache = '<div class="comment-row"><div class="g-g">\
                            <div class="g-u-1-5">\
                                <img width="45" height="45" src="{authorAvatar}"/>\
                            </div>\
                            <div class="g-u-4-5">\
                                <div style="width:60%">\
                                    <span>{author}<br/><span>{createdAt}</span></span>\
                                </div>\
                                <div style="width:40%"></div>\
                            </div>\
                        </div>\
                        <div class="g-g">\
                            <div class="g-u-1-5">\
                            </div>\
                            <div class="g-u-4-5">\
                                <div>\
                                    <p>{content}</p>\
                                </div>\
                            </div>\
                        </div></div>';

    //获取并创建评论信息
    function createComment() {
        var params = {
            id: queryObjects["id"]
        };
        $http.getComment(params).then(function(suc) {
            var comments = suc.comments;
            if (comments && comments.length > 0) {
                for (var i = 0; i < comments.length; i++) {
                    var comment = comments[i];
                    var str = nano(commentCache, comment);
                    $('#comment_detail').append(str);
                }
            }
        }, function(err) {
            console.log(err);
        });
    }

    var assetImage = '<image width="150" height="110" id="asset_{id}" data-longitude="{longitude}" data-latitude="{latitude}" src="" data-src="{url}"/>'

    function createBeautiful(id) {
        var params = {
            id: id,
            source: queryObjects["source"],
            ds: queryObjects["ds"],
            aid: queryObjects["aid"]
        };

        $http.getAssert(params).then(function(suc) {
            var assets = suc.assets;
            $('#scene_image').css('width', 150 * assets.length + 15 + 6 * (assets.length));
            if (assets.length > 0) {
                for (var i = 0; i < assets.length; i++) {
                    var asset = assets[i];
                    var str = nano(assetImage, asset);
                    $('#scene_image').append(str);
                }
                var myScroll = new IScroll('#scene_image_wrapper', {
                    scrollX: true,
                    scrollY: false,
                    scrollbars: true,
                    mouseWheel: false,
                    interactiveScrollbars: false,
                    shrinkScrollbars: 'scale',
                    disableTouch: false,
                    fadeScrollbars: true
                });
                updateImg();
            }
        }, function(err) {
            console.log(err);
        });
    }

    function setAddrAndTransInfo(unit) {
        if (unit.address) {
            $('#bd_address').text(unit.address);
        }
        if (unit.traffic_info) {
            $('#transport').text(unit.traffic_info);
        }
    }

    var markerImage = "images/small_01.png";

    function createBDMap() {
        if (result && result.units && result.units.length > 0) {
            var unit = result.units[0];
            if (unit.latitude && unit.longitude) {
                var map = new BMap.Map("bd_map");
                var point = new BMap.Point(unit.longitude, unit.latitude);

                var myIcon = new BMap.Icon(markerImage,
                    new BMap.Size(26, 36), {
                        // 指定定位位置。
                        // 当标注显示在地图上时，其所指向的地理位置距离图标左上      
                        // 角各偏移7像素和25像素。您可以看到在本例中该位置即是     
                        // 图标中央下端的尖角位置。      
                        anchor: new BMap.Size(13, 18),
                    });
                // 创建标注对象并添加到地图
                var marker = new BMap.Marker(point, {
                    icon: myIcon
                });
                map.addOverlay(marker);
                map.centerAndZoom(point, 15); // 编写自定义函数，创建标注
            }
        }
    }

    function loadResources(ress, onOneLoad, onLoad) {
        var loaded = [];

        function _onOneLoad(url) {
            if (checkHaveLoaded(url)) {
                return;
            }
            loaded.push(url);
            if (onOneLoad) {
                onOneLoad(url, loaded.length);
            }
            if (loaded.length === ress.length) {
                if (onLoad) {
                    onLoad();
                }
            }
        }
        for (var i = 0; i < ress.length; i++) {
            loadJs(ress[i], _onOneLoad);
        }

        function checkHaveLoaded(url) {
            for (var i = 0; i < loaded.length; i++) {
                if (loaded[i] === url) {
                    return true;
                }
            }
            return false;
        }
    }

    function loadJs(url, onLoad) {
        loadJs(url);

        function createElement(config) {
            var e = document.createElement(config.element);
            for (var i in config) {
                if (i !== 'element' && i !== 'appendTo') {
                    e[i] = config[i];
                }
            }
            var root = document.getElementsByTagName(config.appendTo)[0];
            return (typeof root.appendChild(e) === 'object');
        }

        function loadJs(url) {
            var result = createElement({
                element: 'script',
                type: 'text/javascript',
                src: url,
                appendTo: 'body',
                onload: function() {
                    elementLoaded(url);
                },
                onreadystatechange: function() {
                    if (this.readyState === 'loaded' || this.readyState === 'complete') {
                        elementLoaded(url);
                    }
                }
            });
        }

        function elementLoaded(url) {
            if (onLoad) {
                onLoad(url);
            }
        }
    }

    var bdjs = ['http://api.map.baidu.com/getscript?type=quick&file=api&ak=CoFhxZBGxjoKAHmtZBShvLOv&t=20140109092002', 'http://api.map.baidu.com/getscript?type=quick&file=feature&ak=CoFhxZBGxjoKAHmtZBShvLOv&t=20140109092002'];
    var isCreateMap = false;

    function updateBDMap() {
        if (result && result.units && result.units.length > 0) {
            var unit = result.units[0];
            if (unit.latitude && unit.longitude) {
                if (!window.BMap || !window.BMap.Map) {
                    var offsetTop = $('#bd_map').offset();
                    var scroll = $(document).scrollTop();
                    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    if (scroll + clientHeight >= offsetTop.top) {
                        if (!isCreateMap) {
                            isCreateMap = true;
                            //(function(){ window.BMap_loadScriptTime = (new Date).getTime(); document.write('<script type="text/javascript" src="http://api.map.baidu.com/getscript?type=quick&file=api&ak=CoFhxZBGxjoKAHmtZBShvLOv&t=20140109092002">');document.write('</script><script type="text/javascript" src="http://api.map.baidu.com/getscript?type=quick&file=feature&ak=CoFhxZBGxjoKAHmtZBShvLOv&t=20140109092002"></script>');})();
                            window.BMap_loadScriptTime = (new Date).getTime();
                            loadResources(bdjs, function(url) {
                                console.log('loaded: ' + url);
                            }, createBDMap);
                        }
                    }
                }
            }
        }
    }

    function setTelInfo(unit) {
        unit.contact_phone = '13522084241';
        if (unit.contact_phone) {
            $('#tel_me').text(unit.contact_phone);

            $('#deal_tel').html('<a href="tel:' + unit.contact_phone + '" style="color:#ff8200;text-decoration: none;">拨打电话</a>');
        }
    }

    function setPriceAndTimeInfo(unit) {
        $('#price_info').text(unit.price_info);
        $('#open_time').text(unit.open_time);
    }

    //创建简介信息
    function createBrief(unit) {
        unit.brief = '<p>' + unit.brief + '</p>';
        unit.brief = unit.brief.replace(new RegExp(/(。)/g), '。</p><p>');
        $('.intro').html(unit.brief);
    }

    //幻灯片缓存html
    var sliderLi = '<li class="slider-item openParam" data-param="{thumb_url}"><div class="img-wrap"><img id="slider_{id}" data-time="{created_at}" data-long="{longitude}" data-lat="{latitude}" class="banner-image" width="100%" height="208" src="{thumb_url}" alt="{title}"></li>';
    //创建幻灯片
    function createSlider(unit) {
        var images = unit.images;
        var imageCount = images.length;
        for (var i = 0; i < imageCount; i++) {
            var image = images[i > 1 ? i - 2 : i];
            var str = nano(sliderLi, image);
            $('#slider_wrapper ul').append(str);
        }
        //$('#slider_wrapper ul').css('width', 100 * imageCount + '%');
        //setPC();
        doSlider();
    }

    //开始播放幻灯片
    function doSlider() {
        $('#slider_wrapper').slider({
            "autoScroll": true,
            "infinite": true
        });
    }

    $(window).scroll(function() {
        updateImg();
        updateBDMap();
    });

    function updateImg() {
        $('img').each(function(idx, itm) {
            if ($(!$(this).attr('src'))) {
                var offsetTop = $(this).offset();
                var scroll = $(document).scrollTop();
                var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if (scroll + clientHeight >= offsetTop.top) {
                    $(this).attr('src', $(this).attr('data-src'));
                }
            }
        });
    }

    $('.download-app').click(function(e) {
        e.preventDefault();
        location.href = downloadUrl + queryObjects["source"];
    });

    //跳转到每日美景界面
    //跳转到评论界面
    /*$('#dlBeautify').click(function(){
        location.href = 'beautify.html';
    });
    $('#dlComment').click(function(){
        location.href = 'comment.html';
    });*/

    //初始化应用程序
    if (queryObjects && queryObjects["id"]) {
        initApp();
    } else {
        unloading();
        showError('参数错误!');
    }

    function showError(title){
        new Notify({
            type: 'error',
            str: title,
            height: 170,
            hasBtn: true
        });
    }
});
