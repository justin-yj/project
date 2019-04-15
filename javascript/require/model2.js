console.log('hello world')
//通过http 网络请求
var http = require("http");//引入http模块
var cheerio = require("cheerio");

var url = 'http://sports.sina.com.cn/nba/1.shtml'

//get()方法请求网络数据
http.get(url,function(res,cb){

    var html = "";
    //on方法在node.js中是属于监听事件
    res.on('data',function(chunk){
            html += chunk;
    })
    
    res.on("end",function(){
        console.log(html)
        // console.log('请求完成')
        var $ = cheerio.load(html)
        $("#right a").each(function(){
            console.log($(this).text())
        })

    })

   

}).on('error',function(e){
    console.log(e.message);//如果在访问过程中有错误产生 ，那么输出错误信息。
})