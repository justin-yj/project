(function(global) {
    'use strict';
    var TDTLayer = {
        vecLayer: (function() {
            var hVecLayer = L.tileLayer("http://www.dzmap.cn/OneMapServer/rest/services/vector_service/MapServer/WMTS?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=image/jpgpng&TILEMATRIXSET=default028mm&STYLE=default&LAYER=vector_service&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
                minZoom: 0,
                maxZoom: 17,
                native: true
            });
            var tVecLayer = L.tileLayer("http://t{s}.tianditu.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
                minZoom: 0,
                maxZoom: 17,
                subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            });
            var aVecLayer = L.tileLayer("http://t{s}.tianditu.com/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
                minZoom: 0,
                maxZoom: 17,
                subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            });
            return [tVecLayer, aVecLayer, hVecLayer];
        })(),
        imgLayer: (function() {
            var hVecLayer = L.tileLayer("http://www.dzmap.cn/OneMapServer/rest/services/vector_service/MapServer/WMTS?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&FORMAT=image/jpgpng&TILEMATRIXSET=default028mm&STYLE=default&LAYER=vector_service&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
                minZoom: 0,
                maxZoom: 17,
                native: true
            });
            var tImgLayer = L.tileLayer("http://t{s}.tianditu.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
                minZoom: 0,
                maxZoom: 17,
                subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            });
            var aImgLayer = L.tileLayer("http://t{s}.tianditu.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=c&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles", {
                minZoom: 0,
                maxZoom: 17,
                subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
            });
            return [tImgLayer, aImgLayer, hVecLayer];
        })()
    };
    (function() {
        //加载天地图
        var vecLayer = L.layerGroup(TDTLayer.vecLayer);
        var imgLayer = L.layerGroup(TDTLayer.imgLayer);
        L.Control.Zoom = L.Control.extend({
            options: {
                position: 'topleft',
                zoomInText: '+',
                zoomInTitle: 'Zoom in',
                zoomOutText: '-',
                locateTitle: '显示您的位置',
                zoomOutTitle: 'Zoom out'
            },
            onAdd: function(map) {
                var zoomName = 'leaflet-control-zoom',
                    locateName = 'leaflet-control-locate',
                    switchName = 'leaflet-control-switcher',
                    containerWrap = L.DomUtil.create('div', zoomName + ' leaflet-bar'),
                    container = L.DomUtil.create('div', zoomName + ' leaflet-bar', containerWrap),
                    options = this.options;
                this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
                    zoomName + '-in', container, this._zoomIn);
                this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
                    zoomName + '-out', container, this._zoomOut);
                if (navigator.geolocation) {
                    this._locateButton = this._createButton('', options.locateTitle,
                        locateName, container, this._locate);
                }
                this._switchButton = this._createButton('', '卫星图',
                    switchName, container, this._switcher);
                this._updateDisabled();
                map.addLayer(vecLayer);
                map.on('zoomend zoomlevelschange', this._updateDisabled, this);
                return containerWrap;
            },
            _switcher: function() {
                var _self = this;
                if (!$(_self._switchButton).hasClass('vec')) {
                    _self._map.removeLayer(vecLayer);
                    _self._map.addLayer(imgLayer);
                    $(_self._switchButton).attr('title', '矢量图');
                } else {
                    _self._map.removeLayer(imgLayer);
                    _self._map.addLayer(vecLayer);
                    $(_self._switchButton).attr('title', '卫星图');
                }
                $(_self._switchButton).toggleClass('vec');
            },
            onRemove: function(map) {
                map.off('zoomend zoomlevelschange', this._updateDisabled, this);
                map.removeLayer(vecLayer);
                map.removeLayer(imgLayer);
            },
            disable: function() {
                this._disabled = true;
                this._updateDisabled();
                return this;
            },
            enable: function() {
                this._disabled = false;
                this._updateDisabled();
                return this;
            },
            _locate: function(e) {
                if (!this._disabled) {
                    var options = {
                        enableHighAccuracy: true,
                        maximumAge: 1000
                    }
                    var self = this;
                    navigator.geolocation.getCurrentPosition(L.bind(self._success, self), L.bind(self._error, self), options);
                }
            },
            _success: function(pos) {
                var lon = pos.coords.longitude;
                var lat = pos.coords.latitude;
                this._map.flyTo([lat, lon]);
            },
            _error: function(err) {
                switch (err.code) {
                    case 1:
                        Dialog.show({ title: "请求位置服务被拒绝！", text: "关闭" });
                        break;
                    case 4:
                    case 2:
                        Dialog.show({ title: "暂时无法获取位置信息，请重试！", text: "关闭" });
                        break;
                    case 3:
                        Dialog.show({ title: "获取位置信息超时，请重试！", text: "关闭" });
                        break;
                }
            },
            _zoomIn: function(e) {
                if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
                    this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
                }
            },
            _zoomOut: function(e) {
                if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
                    this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
                }
            },
            _createButton: function(html, title, className, container, fn) {
                var link = L.DomUtil.create('a', className, container);
                link.innerHTML = html;
                link.href = '#';
                link.title = title;

                L.DomEvent
                    .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
                    .on(link, 'click', L.DomEvent.stop)
                    .on(link, 'click', fn, this)
                    .on(link, 'click', this._refocusOnMap, this);

                return link;
            },
            _updateDisabled: function() {
                var map = this._map,
                    className = 'leaflet-disabled';

                L.DomUtil.removeClass(this._zoomInButton, className);
                L.DomUtil.removeClass(this._zoomOutButton, className);

                if (this._disabled || map._zoom === map.getMinZoom()) {
                    L.DomUtil.addClass(this._zoomOutButton, className);
                }
                if (this._disabled || map._zoom === map.getMaxZoom()) {
                    L.DomUtil.addClass(this._zoomInButton, className);
                }
            }
        });
        L.Map.mergeOptions({
            zoomControl: true
        });
        L.Map.addInitHook(function() {
            if (this.options.zoomControl) {
                this.zoomControl = new L.Control.Zoom();
                this.addControl(this.zoomControl);
            }
        });
        L.control.zoom = function(options) {
            return new L.Control.Zoom(options);
        };
    })();
    var zoomControl, lMap, isTag = false,
        tempLayer = null;
    //将传递过来的参数转换成json对象
    function getJsonObject(options) {
        var obj = {};
        //json字符串
        if (typeof options == 'string') {
            //解析json字符串
            obj = $.parseJSON(options);
        } else { //json对象
            obj = options;
        }
        return obj;
    }
    //将wkt字符串转换成具体的点线面
    function getWktPoint(wktStr) {
        wktStr = wktStr.replace(/(^\s*)|(\s*$)/g, "")
        return wkt.parse(wktStr);
    }
    //点击事件
    function showPopup(mark) {
        var opt = mark.options.params;
        if (opt.mouseclick) {
            opt.mouseclick.event(opt.mouseclick.parameter);
        }
    }
    var HMap = function() {};
    //初始化地图
    HMap.iniMap = function(mapDiv, opts) {
        if (mapDiv) {
            var options = getJsonObject(opts);
            var center = [28.12, 112.59];
            var level = 6;
            if (options.point) {
                var point = getWktPoint(options.point).coordinates;
                center = [point[0], point[1]];
            }
            if (options.level) {
                level = parseInt(options.level, 10);
            }
            //设置zoomControl的位置
            zoomControl = L.control.zoom({
                position: 'topleft',
                zoomInText: '+',
                zoomOutText: '-',
                zoomInTitle: '放大',
                zoomOutTitle: '缩小'
            });
            var scaleControl = L.control.scale({
                imperial: false
            });
            //创建地图
            lMap = L.map(mapDiv, {
                zoomControl: false,
                attributionControl: false,
                crs: L.CRS.EPSG4326
            }).setView(center, level);
            lMap.addControl(scaleControl);
            lMap.addControl(zoomControl);
            return 0;
        } else {
            return 1;
        }
    };
    //单点定位模式
    HMap.markSingle = function(opts) {
        var options = getJsonObject(opts);
        if (lMap) {
            addTempLayerAndBindEvent();
            if (options.point) {
                options.point = options.point.replace(/(^\s*)|(\s*$)/g, "");
                var pointArr = getWktPoint(options.point).coordinates;
                var point = [pointArr[0], pointArr[1]];
                var level = options.level ? parseInt(options.level, 10) : 6;
                var icon = options.icon ? options.icon : "assets/img/marker/markers_00.gif";
                var marker = L.marker(point, {
                    icon: L.icon({
                        iconUrl: icon,
                        iconSize: [24, 36]
                    }),
                    params: options
                });
                tempLayer.addLayer(marker);
                lMap.flyTo(marker.getLatLng(), level);
                return 0;
            } else {
                return 1;
            }
        } else {
            return 1;
        }
    };
    //清除单点定位模式在地图上的痕迹
    HMap.clearMap = function() {
        if (tempLayer) {
            tempLayer.clearLayers();
            tempLayer.off();
            lMap.removeLayer(tempLayer);
        }
    };
    //根据多个坐标点，地图自动缩放，并聚合计数
    //地图需要根据传入中心点数据计算地图级别
    //能够整屏显示所有中心点内容，并聚合计数
    HMap.markSome = function(opts) {
        var options = getJsonObject(opts);
        if (options && options.items.length > 0) {
            addTempLayerAndBindEvent();
            var items = options.items;
            var points = [];
            var xmin = 0,
                ymin = 0,
                xmax = 0,
                ymax = 0;
            for (var i = 0; i < items.length; i++) {
                var it = items[i];
                //解析所有的point并计算范围
                var point = getWktPoint(it.point).coordinates;
                if (i == 0) {
                    xmin = xmax = point[1];
                    ymin = ymax = point[0];
                }
                if (point[1] < xmin) {
                    xmin = point[1];
                }
                if (point[1] > xmax) {
                    xmax = point[1];
                }
                if (point[0] < ymin) {
                    ymin = point[0];
                }
                if (point[0] > ymax) {
                    ymax = point[0];
                }
                var marker = L.marker(L.latLng(point[0], point[1]), {
                    icon: L.icon({
                        iconUrl: options.icon ? options.icon : "assets/img/marker/markers_00.gif",
                        iconSize: [24, 36]
                    }),
                    riseOnHover: true,
                    params: it
                });
                tempLayer.addLayer(marker);
            }
            lMap.flyToBounds([
                [ymin, xmin],
                [ymax, xmax]
            ]);

            return 0;
        } else {
            return 1;
        }
    };
    //清除所有模式在地图上遗留的痕迹
    function removeAnyOtherModel() {
        HMap.clearMap();
    }

    function getWktPolygon(wktStr) {
        wktStr = wktStr.replace(/(^\s*)|(\s*$)/g, "")
        return wkt.parse(wktStr);
    }

    function addTempLayerAndBindEvent() {
        if (!tempLayer) {
            tempLayer = L.featureGroup();
            tempLayer.on('click', function(e) {
                var mark = e.layer;
                showPopup(mark);
            });
        }
        if (!lMap.hasLayer(tempLayer)) {
            lMap.addLayer(tempLayer);
        }
    }
    //区域渲染模式
    //根据wkt格式的面数据，颜色数据，区域名称等参数渲染地图，并按照传入的面数据计算显示级别。
    HMap.draw = function(opts) {
        var options = getJsonObject(opts);
        if (options && options.items.length > 0) {
            addTempLayerAndBindEvent();
            var items = options.items;
            for (var i = 0; i < items.length; i++) {
                addToMap(items[i]);
            }
            return 0;
        } else {
            return 1;
        }
    };

    function addToMap(it) {
        var data = getWktPolygon(it.region);
        switch (data.type) {
            case "MultiPolygon":
                for (var i = 0; i < data.coordinates.length; i++) {
                    var coordinates = data.coordinates[i];
                    for (var j = 0; j < coordinates.length; j++) {
                        var polygon = L.polygon([coordinates[j]], {
                            fillColor: '#' + it.back_color.substring(2),
                            params: it,
                            color: '#' + it.back_color.substring(2),
                            weight: 2,
                            fillOpacity: .9,
                            riseOnOver: true
                        });
                        tempLayer.addLayer(polygon);
                    }
                }
                break;
            case "Polygon":
                for (var i = 0; i < data.coordinates.length; i++) {
                    var coordinates = data.coordinates[i];
                    var polygon = L.polygon([coordinates], {
                        fillColor: '#' + it.back_color.substring(2),
                        params: it,
                        color: '#' + it.back_color.substring(2),
                        weight: 2,
                        fillOpacity: .9,
                        riseOnOver: true
                    });
                    tempLayer.addLayer(polygon);
                }
                break;
        }
    }

    //在地图上任意画一个区域，将该区域的四向作为参数调用一个web服务，
    //获取一系列坐标点和坐标点ID，然后将四向内区域外的点排除后，返回这些ID。
    //然后自动调用外部公共函数stat，执行此函数时，地图提供绘制区域的功能
    HMap.stat = function(opts) {
        var options = getJsonObject(opts);
    }

    function addTempLayer() {
        if (!tempLayer) {
            tempLayer = L.featureGroup();
        }
        if (!lMap.hasLayer(tempLayer)) {
            lMap.addLayer(tempLayer);
        }
    }

    //根据一系列点坐标和值绘制热力图功能
    HMap.hotMap = function(opts) {
        var options = getJsonObject(opts);
        if (options && options.items.length > 0) {
            addTempLayer();
            var datas = {};
            var items = options.items;
            var xmin = 0,
                ymin = 0,
                xmax = 0,
                ymax = 0;
            for (var i = 0; i < items.length; i++) {
                var point = getWktPoint(items[i].lonlat).coordinates;
                items[i]['lng'] = point[1];
                items[i]['lat'] = point[0];
                if (i == 0) {
                    xmin = xmax = point[1];
                    ymin = ymax = point[0];
                }
                if (point[1] < xmin) {
                    xmin = point[1];
                }
                if (point[1] > xmax) {
                    xmax = point[1];
                }
                if (point[0] < ymin) {
                    ymin = point[0];
                }
                if (point[0] > ymax) {
                    ymax = point[0];
                }
            }
            datas['data'] = items;
            var cfg = {
                "radius": 30,
                "maxOpacity": .8,
                "scaleRadius": false,
                "useLocalExtrema": true,
                latField: 'lat',
                lngField: 'lng',
                valueField: 'value'
            };
            tempLayer = new HeatmapOverlay(cfg);
            lMap.addLayer(tempLayer);
            tempLayer.setData(datas);
            return 0;
        } else {
            return 1;
        }
    }

    global.HMap = HMap;
})(window);
