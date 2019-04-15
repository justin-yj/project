$(function(){
	(function(window, undefined){
			   if( window.localStorage )
			       return;
			   /*
			    * IE系列
			    */
			   var userData = {
			       //存储文件名（单文件小于128k，足够普通情况下使用了）
			      file : window.location.hostname || "localStorage",
			      //key'cache
			      keyCache : "localStorageKeyCache",
			      //keySplit
			      keySplit : ",",
			      // 定义userdata对象
			      o : null,
			      //初始化
			      init : function(){
			          if(!this.o){
			              try{
			                  var box = document.body || document.getElementsByTagName("head")[0] || document.documentElement, o = document.createElement('input');
			                  o.type = "hidden";
			                  o.addBehavior ("#default#userData");
			                  box.appendChild(o);
			                  //设置过期时间
			                  var d = new Date();
			                  d.setDate(d.getDate()+365);
			                  o.expires = d.toUTCString();
			                  //保存操作对象
			                  this.o = o;
			                  //同步length属性
			                  window.localStorage.length = this.cacheKey(0,4);
			              }catch(e){
			                  return false;
			              }
			          };
			          return true;
			      },
			      //缓存key，不区分大小写（与标准不同）
			      //action  1插入key 2删除key 3取key数组 4取key数组长度
			      cacheKey : function( key, action ){
			          if( !this.init() )return;
			          var o = this.o;
			          //加载keyCache
			          o.load(this.keyCache);
			          var str = o.getAttribute("keys") || "",
			              list = str ? str.split(this.keySplit) : [],
			              n = list.length, i=0, isExist = false;
			          //处理要求
			          if( action === 3 )
			             return list;
			          if( action === 4 )
			              return n;
			          //将key转化为小写进行查找和存储
			         key = key.toLowerCase();
			          for(; i<n; i++){
			              if( list[i] === key ){
			                  isExist = true;
			                  if( action === 2 ){
			                      list.splice(i,1);
			                      n--; i--;
			                  }
			              }
			          }
			          if( action === 1 && !isExist )
			              list.push(key);
			          //存储
			          o.setAttribute("keys", list.join(this.keySplit));
			          o.save(this.keyCache);
			      },
			  //核心读写函数
			      item : function(key, value){
			          if( this.init() ){
			              var o = this.o;
			              if(value !== undefined){ //写或者删
			                  //保存key以便遍历和清除
			                  this.cacheKey(key, value === null ? 2 : 1);
			                  //load
			                  o.load(this.file);
			                  //保存数据
			                  value === null ? o.removeAttribute(key) : o.setAttribute(key, value+"");
			                  // 存储
			                  o.save(this.file);
			              }else{ //读
			                  o.load(this.file);
			                  return o.getAttribute(key) || null;
			              }
			              return value;
			          }else{
			              return null;
			          }
			          return value;
			      },
			      clear : function(){
			          if( this.init() ){
			              var list = this.cacheKey(0,3), n = list.length, i=0;
			              for(; i<n; i++)
			                  this.item(list[i], null);
			          }
			     }
			 };
			 //扩展window对象，模拟原生localStorage输入输出
			 window.localStorage = {
			     setItem : function(key, value){userData.item(key, value); this.length = userData.cacheKey(0,4)},
			     getItem : function(key){return userData.item(key)},
			     removeItem : function(key){userData.item(key, null); this.length = userData.cacheKey(0,4)},
			     clear : function(){userData.clear(); this.length = userData.cacheKey(0,4)},
			     length : 0,
			     key : function(i){return userData.cacheKey(0,3)[i];},
			     isVirtualObject : true
			 };
			 })(window);
				
				
			var $ele = $(".mainLeft ul li");
			var localStorangeName;
			$ele.click(function(){
				var $thisIndex = $(this).index();
				console.log($thisIndex)
				localStorage.setItem(localStorangeName,$thisIndex);
				$(this).addClass("active").siblings().removeClass('active');
				if($thisIndex==0){
					$(".mainRightsOne").hide();
					$(".mainRights").show()
				}else{
					$(".mainRights").hide();
					$(".mainRightsOne").show();
				}
			})
			var wsbs_Index = localStorage.getItem(localStorangeName);
			$ele.eq(wsbs_Index).addClass('active').siblings().removeClass('active');
			if(wsbs_Index==0){
					$(".mainRightsOne").hide();
					$(".mainRights").show()
				}else{
					$(".mainRights").hide();
					$(".mainRightsOne").show();
				}
})
