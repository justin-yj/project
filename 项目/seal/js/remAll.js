(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			var clientHeight = docEl.clientHeight;
			if(!clientWidth) return;
			if(clientWidth > 750) clientWidth = 750;
			var sub = clientHeight/clientWidth;
			
			if(sub<1.77){
				docEl.style.fontSize = (clientWidth / 7.5)*(sub/1.77) + 'px';
			}else{
				docEl.style.fontSize = clientWidth / 7.5 + 'px';
			}
			
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
