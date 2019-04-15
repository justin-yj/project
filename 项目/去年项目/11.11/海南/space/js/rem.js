;(function(argument) {
	var SCREENTYPE = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var DEFINENUMBER = 10;
	function setView(){
		var gg = document.documentElement;
		var width = gg.clientWidth;
		if(gg.clientWidth > 640){
			width = 640;
		}else if(gg.clientWidth < 320){
			width = 320;
		}
		gg.style.fontSize = width / DEFINENUMBER + 'px';
		return arguments.callee;
	}
	window.addEventListener(SCREENTYPE,setView());
})();