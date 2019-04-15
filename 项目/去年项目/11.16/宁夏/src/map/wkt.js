var wkt = {
    parse: function(input) {
        var numberRegexp = /[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?/;
        var tuples = new RegExp('^' + numberRegexp.source + '(\\s' + numberRegexp.source + '){1,}');
        var parts = input.split(';');
        var _ = parts.pop();
        var srid = (parts.shift() || '').split('=').pop();
        var i = 0;
        function $(re) {
            var match = _.substring(i).match(re);
            if (!match) return null;
            else {
                i += match[0].length;
                return match[0];
            }
        }
        function crs(obj) {
            if (obj && srid.match(/\d+/)) {
                obj.crs = {
                    type: 'name',
                    properties: {
                        name: 'urn:ogc:def:crs:EPSG::' + srid
                    }
                };
            }

            return obj;
        }
        function white() { $(/^\s*/); }
        function multicoords() {
            white();
            var depth = 0;
            var rings = [];
            var stack = [rings];
            var pointer = rings;
            var elem;

            while (elem =
                $(/^(\()/) ||
                $(/^(\))/) ||
                $(/^(,)/) ||
                $(tuples)) {
                if (elem === '(') {
                    stack.push(pointer);
                    pointer = [];
                    stack[stack.length - 1].push(pointer);
                    depth++;
                } else if (elem === ')') {
                    // For the case: Polygon(), ...
                    if (pointer.length === 0) return null;

                    pointer = stack.pop();
                    // the stack was empty, input was malformed
                    if (!pointer) return null;
                    depth--;
                    if (depth === 0) break;
                } else if (elem === ',') {
                    pointer = [];
                    stack[stack.length - 1].push(pointer);
                } else if (!elem.split(/\s/g).some(isNaN)) {
                    var ele = elem.split(/\s/g).map(parseFloat);
                    var temp = ele[1];
                    ele[1] = ele[0];
                    ele[0] = temp;
                    Array.prototype.push.apply(pointer, ele);
                } else {
                    return null;
                }
                white();
            }

            if (depth !== 0) return null;

            return rings;
        }
        function coords() {
            var list = [];
            var item;
            var pt;
            while (pt =
                $(tuples) ||
                $(/^(,)/)) {
                if (pt === ',') {
                    list.push(item);
                    item = [];
                } else if (!pt.split(/\s/g).some(isNaN)) {
                    if (!item)
                        item = [];
                    var ele = pt.split(/\s/g).map(parseFloat);
                    var temp = ele[1];
                    ele[1] = ele[0];
                    ele[0] = temp;
                    Array.prototype.push.apply(item, ele);
                }
                white();
            }

            if (item)
                list.push(item);
            else return null;

            return list.length ? list : null;
        }
        function point() {
            if (!$(/^(point(\sz)?)/i)) return null;
            white();
            if (!$(/^(\()/)) return null;
            var c = coords();
            if (!c) return null;
            white();
            if (!$(/^(\))/)) return null;
            return {
                type: 'Point',
                coordinates: c[0]
            };
        }
        function multipoint() {
            if (!$(/^(multipoint)/i)) return null;
            white();
            var newCoordsFormat = _
                .substring(_.indexOf('(') + 1, _.length - 1)
                .replace(/\(/g, '')
                .replace(/\)/g, '');
            _ = 'MULTIPOINT (' + newCoordsFormat + ')';
            var c = multicoords();
            if (!c) return null;
            white();
            return {
                type: 'MultiPoint',
                coordinates: c
            };
        }
        function multilinestring() {
            if (!$(/^(multilinestring)/i)) return null;
            white();
            var c = multicoords();
            if (!c) return null;
            white();
            return {
                type: 'MultiLineString',
                coordinates: c
            };
        }
        function linestring() {
            if (!$(/^(linestring(\sz)?)/i)) return null;
            white();
            if (!$(/^(\()/)) return null;
            var c = coords();
            if (!c) return null;
            if (!$(/^(\))/)) return null;
            return {
                type: 'LineString',
                coordinates: c
            };
        }
        function polygon() {
            if (!$(/^(polygon(\sz)?)/i)) return null;
            white();
            var c = multicoords();
            if (!c) return null;
            return {
                type: 'Polygon',
                coordinates: c
            };
        }
        function multipolygon() {
            if (!$(/^(multipolygon)/i)) return null;
            white();
            var c = multicoords();
            if (!c) return null;
            return {
                type: 'MultiPolygon',
                coordinates: c
            };
        }
        function geometrycollection() {
            var geometries = [];
            var geometry;

            if (!$(/^(geometrycollection)/i)) return null;
            white();

            if (!$(/^(\()/)) return null;
            while (geometry = root()) {
                geometries.push(geometry);
                white();
                $(/^(,)/);
                white();
            }
            if (!$(/^(\))/)) return null;

            return {
                type: 'GeometryCollection',
                geometries: geometries
            };
        }
        function root() {
            return point() ||
                linestring() ||
                polygon() ||
                multipoint() ||
                multilinestring() ||
                multipolygon() ||
                geometrycollection();
        }
        return crs(root());
    },
    getPointWkt: function(obj) {
        if (obj.length > 0) {
            var result = "POINT(";
            if (obj.length > 1) {
                result = "MULTIPOINT(";
            }
            for (var i = 0; i < obj.length; i++) {
                var lng = obj[i]._latlng.lng;
                var lat = obj[i]._latlng.lat;
                result += lng + " " + lat + ",";
            }
            result = result.substr(0, result.length - 1) + ")";
            return result;
        }
    },
    getObjFromWkt: function(txt) {
        if (txt.indexOf('MULTIPOLYGON') === 0) {
            //解析多边形
        }
    },
    fromObject: function(type, obj) {
        var result = "";
        switch (type) {
            case "polyline":
                result = this.getPolylineWkt(obj);
                break;
            case "polygon":
                result = this.getPolygonWkt(obj);
                break;
            case "marker":
                result = this.getPointWkt(obj);
                break;
        }

        return result;
    },
    getPolygonWkt: function(obj) {
        if (obj.length > 0) {
            var result = "POLYGON(";
            if (obj.length > 1) {
                result = "MULTIPOLYGON(";
            }
            for (var i = 0; i < obj.length; i++) {
                var latlngs = obj[i]._latlngs;
                if (obj.length > 1) {
                    result += "(";
                }
                for (var a = 0; a < latlngs.length; a++) {
                    var idx = latlngs[a];
                    result += "(";
                    for (var j = 0; j < idx.length; j++) {
                        if (j == 0) {
                            result += idx[j].lng + " " + idx[j].lat;
                        } else {
                            result += "," + idx[j].lng + " " + idx[j].lat;
                        }
                    }
                    if (a == latlngs.length - 1) {
                        result += ")";
                    } else {
                        result += "),";
                    }
                }
                if (obj.length > 1) {
                    result += "),";
                }
            }
            if (obj.length > 1) {
                result = result.substr(0, result.length - 1);
            }
            result = result + ")";
            return result;
        }
    },
    getPolylineWkt: function(obj) {
        if (obj.length > 0) {
            var result = "LINESTRING(";
            if (obj.length > 1) {
                result = "MULTILINESTRING(";
            }
            for (var i = 0; i < obj.length; i++) {
                var latlngs = obj[i]._latlngs;
                if (obj.length > 1) {
                    result += "(";
                }
                for (var j = 0; j < latlngs.length; j++) {
                    if (j == 0) {
                        result += latlngs[j].lng + " " + latlngs[j].lat;
                    } else {
                        result += "," + latlngs[j].lng + " " + latlngs[j].lat;
                    }
                }
                if (obj.length > 1) {
                    result += "),";
                }
            }
            if (obj.length > 1) {
                result = result.substr(0, result.length - 1);
            }
            result = result + ")";
            return result;
        }
    }
};
