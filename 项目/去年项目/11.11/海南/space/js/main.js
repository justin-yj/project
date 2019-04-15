//新闻图片切换
(function(id, t) {
	if(!document.getElementById(id)) {
		return false;
	}
	var doc = document,
		auto = '',
		oId = doc.getElementById(id),
		IE = /msie (\d+\.\d)/i.test(navigator.userAgent),
		num = 0,
		bot = true,
		setOpacity = function(obj, opacity) {
			if(IE) {
				obj.style.filter = 'Alpha(Opacity=' + (opacity * 100) + ')';
			} else {
				obj.style.opacity = opacity;
			};
		},
		setBottom = function(obj, bottom) {
			obj.style.bottom = bottom + 'px';
		},
		fideIn = function(obj, timeLimit) {
			if(obj.style.display === 'none') {
				obj.style.display = 'block';
			};
			setOpacity(obj, 0);
			obj.style.zIndex = 1;
			if(!timeLimit) {
				timeLimit = 200;
			};
			var opacity = 0,
				step = timeLimit / 20;
			clearTimeout(fideInTime);
			var fideInTime = setTimeout(function() {
				bot = false;
				if(opacity >= 1) {
					bot = true;
					return;
				};
				opacity += 1 / step;
				setOpacity(obj, opacity);
				fideInTime = setTimeout(arguments.callee, 20);
			}, 20);
		},
		fideOut = function(obj, timeLimit) {
			if(!timeLimit) {
				timeLimit = 200;
			};
			setOpacity(obj, 1);
			obj.style.zIndex = 0;
			var opacity = 1,
				step = timeLimit / 20;
			clearTimeout(fideOutTime);
			var fideOutTime = setTimeout(function() {
				if(opacity <= 0) {
					setOpacity(obj, 0);
					return;
				};
				opacity -= 1 / step;
				setOpacity(obj, opacity);
				fideOutTime = setTimeout(arguments.callee, 20);

			}, 20);
		},
		heightIn = function(obj, timeLimit) {
			if(obj.style.display === 'none') {
				obj.style.display = 'block';
			};
			setBottom(obj, -40);
			if(!timeLimit) {
				timeLimit = 200;
			};
			var bottom = -40,
				step = timeLimit / 20;
			clearTimeout(heightInTime);
			var heightInTime = setTimeout(function() {
				if(bottom >= 4) {
					setBottom(obj, 4);
					return;
				};
				bottom += 28 / step;
				setBottom(obj, bottom);
				heightInTime = setTimeout(arguments.callee, 20);
			}, 20);
		},
		heightOut = function(obj, timeLimit) {
			if(!timeLimit) {
				timeLimit = 200;
			};
			setBottom(obj, 4);
			var bottom = 4,
				step = timeLimit / 20;
			clearTimeout(heightOutTime);
			var heightOutTime = setTimeout(function() {
				if(bottom <= -40) {
					setBottom(obj, -40);
					return;
				};
				bottom -= 28 / step;
				setBottom(obj, bottom);
				heightOutTime = setTimeout(arguments.callee, 20);
			}, 20);
		},
		getClass = function(oElem, strTagName, strClassName) {
			var arrElements = (strTagName == '*' && oElem.all) ? oElem.all : oElem.getElementsByTagName(strTagName);
			var returnArrElements = new Array();
			var oRegExp = new RegExp('(^|\\s)' + strClassName + '($|\\s)');
			for(var i = 0; i < arrElements.length; i++) {
				if(oRegExp.test(arrElements[i].className)) {
					returnArrElements.push(arrElements[i]);
				}
			}
			return(returnArrElements);
		},
		createElement = function(tag, id, cla) {
			var elem = document.createElement(tag);
			if(id && id !== "") {
				elem.id = id;
			}
			if(cla && cla !== "") {
				elem.className = cla;
			}
			return elem;
		},
		showImg = function(n, b) {
			var turnPic = getClass(oId, 'ul', 'turn-pic')[0];
			var oLi = turnPic.getElementsByTagName('li');
			var turnTit = getClass(oId, 'ul', 'turn-tit')[0];
			var oLi2 = turnTit.getElementsByTagName('li');
			var turnBtn = getClass(oId, 'div', 'turn-btn')[0];
			var oSpan = turnBtn.getElementsByTagName('span')[0];
			fideIn(oLi[n], 300);
			heightIn(oLi2[n], 300);
			oSpan.innerHTML = (n + 1) + ' / ' + oLi.length;
			if(b == true) {
				if(n == oLi.length - 1) {
					fideOut(oLi[0], 300);
					heightOut(oLi2[0], 300);
				}
				if(n < oLi.length - 1) {
					fideOut(oLi[n + 1], 300);
					heightOut(oLi2[n + 1], 300);
				}
			} else {
				if(n > 0) {
					fideOut(oLi[n - 1], 300);
					heightOut(oLi2[n - 1], 300);
				}
				if(n == 0) {
					fideOut(oLi[oLi.length - 1], 300);
					heightOut(oLi2[oLi2.length - 1], 300);
				}
			}
		},
		addHtml = function() {
			var oBg = createElement('div', '', 'turn-bg');
			var oTit = createElement('ul', '', 'turn-tit');
			var oBtn = createElement('div', '', 'turn-btn');
			var turnPic = getClass(oId, 'ul', 'turn-pic')[0];
			var oA = turnPic.getElementsByTagName('a');
			var oImg = turnPic.getElementsByTagName('img');
			for(var i = 0, len = oA.length; i < len; i++) {
				oTit.innerHTML += '<li><a href="' + oA[i].href + '">' + oImg[i].title + '</a></li>';
			}
			oBtn.innerHTML = '<div class="lb"></div><div class="rb"></div><span></span>';
			oId.appendChild(oBg);
			oId.appendChild(oTit);
			oId.appendChild(oBtn);
		},
		init = function() {
			addHtml();
			showImg(0);
			var turnLoading = getClass(oId, 'div', 'turn-loading')[0];
			//						oId.removeChild(turnLoading);
			oId.onmouseover = function() {
				clearInterval(auto);
			};
			oId.onmouseout = function() {
				auto = setInterval(autoTurn, t * 1000);
			};
			var turnPic = getClass(oId, 'ul', 'turn-pic')[0];
			var oLi = turnPic.getElementsByTagName('li');
			var oLb = getClass(oId, 'div', 'lb')[0];
			var oRb = getClass(oId, 'div', 'rb')[0];
			//						
			oLb.onclick = function() {
				if(!bot) {
					return false;
				}
				if(num == 0) {
					num = oLi.length - 1;
				} else {
					num = num - 1;
				}
				showImg(num, 1);
			}

			oRb.onclick = function() {
				if(!bot) {
					return false;
				}
				if(num == oLi.length - 1) {
					num = 0;
				} else {
					num = num + 1;
				}
				showImg(num);
			}
		},
		autoTurn = function() {
			var turnPic = getClass(oId, 'ul', 'turn-pic')[0];
			var oLi = turnPic.getElementsByTagName('li');
			if(num == oLi.length - 1) {
				num = 0;
			} else {
				num = num + 1;
			}
			showImg(num);
		};
	init();
	auto = setInterval(autoTurn, t * 1000);
})('turn', 3);

/*//登录
var dialogInstace, onMoveStartId, mousePos = {
	x: 0,
	y: 0
}; //	用于记录当前可拖拽的对象

// var zIndex = 9000;

//	获取元素对象	
function g(id) {
	return document.getElementById(id);
}

//	自动居中元素（el = Element）
function autoCenter(el) {
	var bodyW = document.documentElement.clientWidth;
	var bodyH = document.documentElement.clientHeight;

	var elW = el.offsetWidth;
	var elH = el.offsetHeight;

	el.style.left = (bodyW - elW) / 2 + 'px';
	el.style.top = (bodyH - elH) / 2 + 'px';

}

//	自动扩展元素到全部显示区域
function fillToBody(el) {
	el.style.width = document.documentElement.clientWidth + 'px';
	el.style.height = document.documentElement.clientHeight + 'px';
}

//	Dialog实例化的方法
function Dialog(dragId, moveId) {
	var instace = {};

	instace.dragElement = g(dragId); //	允许执行 拖拽操作 的元素
	instace.moveElement = g(moveId); //	拖拽操作时，移动的元素

	instace.mouseOffsetLeft = 0; //	拖拽操作时，移动元素的起始 X 点
	instace.mouseOffsetTop = 0; //	拖拽操作时，移动元素的起始 Y 点

	instace.dragElement.addEventListener('mousedown', function(e) {

		var e = e || window.event;

		dialogInstace = instace;
		instace.mouseOffsetLeft = e.pageX - instace.moveElement.offsetLeft;
		instace.mouseOffsetTop = e.pageY - instace.moveElement.offsetTop;

		onMoveStartId = setInterval(onMoveStart, 10);
		return false;
		instace.moveElement.style.zIndex = zIndex++;
	})

	return instace;
}

//	在页面中侦听 鼠标弹起事件
document.onmouseup = function(e) {
	dialogInstace = false;
	clearInterval(onMoveStartId);
}
document.onmousemove = function(e) {
	var e = window.event || e;
	mousePos.x = e.clientX;
	mousePos.y = e.clientY;

	e.stopPropagation && e.stopPropagation();
	e.cancelBubble = true;
	e = this.originalEvent;
	e && (e.preventDefault ? e.preventDefault() : e.returnValue = false);

	document.body.style.MozUserSelect = 'none';
}

function onMoveStart() {

	var instace = dialogInstace;
	if(instace) {

		var maxX = document.documentElement.clientWidth - instace.moveElement.offsetWidth;
		var maxY = document.documentElement.clientHeight - instace.moveElement.offsetHeight;

		//		console.log(instace.mouseOffsetLeft);

		instace.moveElement.style.left = Math.min(Math.max((mousePos.x - instace.mouseOffsetLeft), 0), maxX) + "px";
		instace.moveElement.style.top = Math.min(Math.max((mousePos.y - instace.mouseOffsetTop), 0), maxY) + "px";
	}

}
//	重新调整对话框的位置和遮罩，并且展现
function showDialog() {

	//禁止鼠标滚动
	document.documentElement.style.overflow = 'hidden';

	g('dialogMove').style.display = 'block';
	g('mask').style.display = 'block';
	autoCenter(g('dialogMove'));
	fillToBody(g('mask'));
	//	侦听浏览器窗口大小变化
	window.onresize = showDialog;
}

function showReg() {
	//	侦听浏览器窗口大小变化
	window.onresize = showReg;
	//禁止鼠标滚动
	document.documentElement.style.overflow = 'hidden';

	g('regMove').style.display = 'block';
	g('dialogMove').style.display = 'none';
	g('mask').style.display = 'block';
	autoCenter(g('regMove'));
	fillToBody(g('mask'));
}

//	关闭对话框
function hideDialog() {
	document.documentElement.style.overflow = 'visible';

	var firstOnResizeFire = true; //谷歌浏览器onresize事件会执行2次，这里加个标志位控制  
	window.onresize = function() {
		if(firstOnResizeFire) {
			//			NfLayout.tabScrollerMenuAdjust(homePageWidth);
			firstOnResizeFire = false;

			//0.5秒之后将标志位重置（Chrome的window.onresize默认执行两次）  
			//			setTimeout(function() {
			//				firstOnResizeFire = true;
			//			}, 500);
		}

		homePageWidth = document.body.clientWidth; //重新保存一下新宽度  
	}
	g('dialogMove').style.display = 'none';
	g('mask').style.display = 'none';
}

function hideReg() {
	g('regMove').style.display = 'none';
	g('mask').style.display = 'none';
	hideDialog();
}

Dialog('dialogDrag', 'dialogMove');
Dialog('regDrag', 'regMove');
//默认设置弹出层启动
//showDialog();
*/
//选项卡切换
(function() {
	fnTab($('.tabNav1'), $('.tabCon1'), 'mouseover');
	fnTab2($('.tabNav2'), $('.tabCon2'), 'mouseover');
	fnTab($('.tabNav3'), $('.tabCon3'), 'mouseover');
	fnTab4($('.tabNav4'), $('.tabCon4'), 'mouseover');
	function fnTab(oNav, aCon, sEvent) {
		var aElem = oNav.children();
		aCon.hide().eq(0).show();
		aElem.each(function(index) {
			$(this).bind(sEvent, function() {
				aElem.removeClass('active').addClass('');
				$(this).removeClass('').addClass('active');
				aElem.find('span').attr('class', '');
				$(this).find('span').attr('class', 'active_arrow');
				aCon.hide().eq(index).show();
			});
		});
	}

	function fnTab2(oNav, aCon, sEvent) {
		var aElem = oNav.children();
		aCon.hide().eq(0).show();
		aElem.each(function(index) {
			$(this).bind(sEvent, function() {
				aElem.removeClass('active').addClass('');
				$(this).removeClass('').addClass('active');
				aElem.find('span').attr('class', '');
				$(this).find('span').attr('class', 'notice_arrow');
				aCon.hide().eq(index).show();
			});
		});
	}
	function fnTab4(oNav, aCon, sEvent) {
		var aElem = oNav.children();
		aCon.hide().eq(0).show();
		aElem.each(function(index) {
			$(this).bind(sEvent, function() {
				aElem.removeClass('active').addClass('');
				$(this).removeClass('').addClass('active');
				aElem.find('span').attr('class', '');
				$(this).find('span').attr('class', 'notice_arrow');
				aCon.hide().eq(index).show();
			});
		});
	}
})();