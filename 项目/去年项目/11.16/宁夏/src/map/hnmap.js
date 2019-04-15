(function(global) {
    global.loadScriptTime = (new Date).getTime();

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

    function loadJs(url, onloadCallback) {
        var result = createElement({
            element: 'script',
            type: 'text/javascript',
            onload: function() {
                elementLoaded(url, onloadCallback);
            },
            onreadystatechange: function() {
                elementReadyStateChanged(url, this, onloadCallback);
            },
            src: url,
            appendTo: 'body'
        });
        return (result);
    }

    function elementLoaded(url, onloadCallback) {
        if (onloadCallback) {
            onloadCallback(url);
        }
    }

    function elementReadyStateChanged(url, thisObj, onloadCallback) {
        if (thisObj.readyState === 'loaded' || thisObj.readyState === 'complete') {
            elementLoaded(url, onloadCallback);
        }
    }

    /* 注意路径不要写错了 */
    document.write('<link rel="stylesheet" href="lib/leaflet/leaflet.css">');
    document.write('<scri' + 'pt type="text/javascript" src="lib/leaflet/leaflet-src.js"></sc' + 'ript>');
    //此行需要修改
    if (!(global.$ || global.jQuery)) {
        document.write('<scri' + 'pt type="text/javascript" src="lib/jquery.min.js"></sc' + 'ript>');
    }
    document.write('<scri' + 'pt type="text/javascript" src="map/wkt.js"></sc' + 'ript>');
    document.write('<scri' + 'pt type="text/javascript" src="map/cluster.js"></sc' + 'ript>');
    document.write('<scri' + 'pt type="text/javascript" src="map/heatmap.js"></sc' + 'ript>');
    document.write('<scri' + 'pt type="text/javascript" src="map/leaflet-heatmap.js"></sc' + 'ript>');
    document.write('<scri' + 'pt type="text/javascript" src="map/index.js"></sc' + 'ript>');

	global.loadJS = loadJs;
})(window);
