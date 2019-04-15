function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * @file pageination.js
 * @author zhangyuhan2016 <hi_zhangyuhan@163.com>
 */
var Page =
  /*#__PURE__*/
  (function() {
    "use strict";

    function Page() {
      var _ref =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : {},
        _ref$el = _ref.el,
        el = _ref$el === void 0 ? ".pagination-box" : _ref$el,
        _ref$now = _ref.now,
        now = _ref$now === void 0 ? 1 : _ref$now,
        _ref$show = _ref.show,
        show = _ref$show === void 0 ? 5 : _ref$show,
        _ref$total = _ref.total,
        total = _ref$total === void 0 ? 1000 : _ref$total,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? 10 : _ref$size,
        _ref$click = _ref.click,
        click = _ref$click === void 0 ? null : _ref$click;

      _classCallCheck(this, Page);

      this.now = now;
      this.show = show;
      this.total = total;
      this.size = size;
      this.min = 1;
      this.max = total / size;
      this.contentArr = [];
      this.contentDom = [];
      this.dom = document.querySelector(el);
      this.abDom = [];
      this.otherDom = [];
      this.click = click;
    }

    _createClass(Page, [
      {
        key: "init",
        value: function init() {
          var _this = this;

          // dom数组
          var cArr = ["back", "prev", "next", "cont", "min", "max"];
          cArr.forEach(function(v) {
            _this.otherDom.push(
              _this.dom.querySelector('button[name="'.concat(v, '"]'))
            );
          });
          this.otherDom[4].innerText = this.min;
          this.otherDom[5].innerText = this.max; // 创建dom

          this.getContent(); // 点击事件

          this.dom.addEventListener("click", function(e) {
            if (e.target.nodeName === "BUTTON") {
              var type = e.target.getAttribute("name");
              var tempNumber = 0;

              switch (type) {
                case "back": {
                  tempNumber = -1;
                  break;
                }

                case "cont": {
                  tempNumber = 1;
                  break;
                }

                case "prev": {
                  tempNumber = -_this.show;
                  break;
                }

                case "next": {
                  tempNumber = _this.show;
                  break;
                }

                default: {
                  tempNumber = parseInt(e.target.innerText) - _this.now;
                }
              }

              _this.now += tempNumber;
              typeof _this.click === "function"
                ? _this.click(_this.now, type)
                : null;

              _this.getContent();

              _this.upData();
            }
          });
          var nextButton = this.otherDom[2];
          this.abDom = this.otherDom.slice(-2);
          this.contentArr.forEach(function(v) {
            var b = document.createElement("button");
            b.innerText = v;

            _this.contentDom.push(b);

            _this.dom.insertBefore(b, nextButton);
          });
          this.upData();
        }
      },
      {
        key: "upData",
        value: function upData() {
          var _this2 = this;

          this.abDom.forEach(function(v) {
            return (v.className = "");
          });
          this.otherDom[0].className = "";
          this.otherDom[3].className = "";

          if (this.now <= this.min) {
            this.now = this.min;
            this.abDom[0].className = "now";
            this.otherDom[0].className = "stop";
          }

          if (this.now >= this.max) {
            this.now = this.max;
            this.abDom[1].className = "now";
            this.otherDom[3].className = "stop";
          }

          this.contentDom.forEach(function(v, i) {
            v.className = "";
            var n = _this2.contentArr[i];

            if (n === _this2.now) {
              v.className = "now";
            }

            v.innerText = n;
          });
        }
      },
      {
        key: "getContent",
        value: function getContent() {
          var _this3 = this;

          var n = this.now;
          var size = this.show;
          var arr = [];

          for (var i = 0; i < size; i++) {
            arr[i] = i;
          } // default

          var content = Math.floor(arr.length / 2);
          var show = [true, true];

          var mapF = function mapF(v, i) {
            var step = content - i;
            return n - step;
          }; // min

          if (n <= size - this.min) {
            mapF = function mapF(v, i) {
              return _this3.min + 1 + i;
            };

            show[0] = false;
          } // max

          if (this.max - size < n) {
            mapF = function mapF(v, i) {
              return _this3.max - size + i;
            };

            show[1] = false;
          }

          this.contentArr = arr.map(mapF);
          show.forEach(function(v, i) {
            _this3.otherDom[i + 1].style.display = v ? "inline-block" : "none";
          });
        }
      }
    ]);

    return Page;
  })();
/*
* el Dom节点
* show 索引数量
* total 数据总数
* size 每页条数
* now 当前索引
* click 点击事件
* */

var clickF = function clickF(number, type) {
  console.log("--number,type--", number, type);
};

var p = new Page({
  show: 10,
  total: 10000,
  size: 80,
  click: clickF
});
p.init();
