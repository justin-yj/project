import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class Home extends StatefulWidget {
  final Widget child;

  Home({Key key, this.child}) : super(key: key);

  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Container(
       child: new Column(
         children: <Widget>[
           Padding(
             padding: EdgeInsets.only(top: 30.0),
           ),
           SwiperPage(),
           new ListTile(
             leading: new Icon(Icons.cake),
             title: new Text("水果"),
             subtitle: new Row(
               children: <Widget>[
                 new Text("苹果"),
                 new Icon(Icons.phonelink_ring)
               ],
             ),
           ),
           new ListTile(
             leading: new Icon(Icons.cake),
             title: new Text("水果"),
             subtitle: new Row(
               children: <Widget>[
                 new Text("苹果"),
                 new Icon(Icons.phonelink_ring)
               ],
             ),
           ),
           new ListTile(
             leading: new Icon(Icons.cake),
             title: new Text("水果"),
             subtitle: new Row(
               children: <Widget>[
                 new Text("苹果"),
                 new Icon(Icons.phonelink_ring)
               ],
             ),
           )
         ],
       ),
    );
  }
}

//轮播
class SwiperPage extends StatefulWidget {
  @override
  _SwiperPageState createState() => _SwiperPageState();
}

class _SwiperPageState extends State<SwiperPage> {
  @override
  Widget build(BuildContext context) {
    return  Container(
          width: MediaQuery.of(context).size.width,
          height: 200.0,
          child: Swiper(
            itemBuilder: _swiperBuilder,
            scrollDirection:Axis.horizontal,//横向还是竖向滚动
            loop:true,//无线滚动模式开关
            index: 0,//初始时下标位置
            autoplayDelay: 2000,//自动播放延迟秒数
            itemCount: 3,//个数
            autoplayDisableOnInteraction: true,//拖拽时是否停止自动播放
            onIndexChanged: (index){},//拖拽或下标变化时触发 

            pagination: new SwiperPagination(
              //FractionPaginationBuilder数字分页  DotSwiperPaginationBuilder圆点分页
              builder: FractionPaginationBuilder(
                color: Colors.black54,
                activeColor: Colors.blue,//选中圆点颜色
              ),
              alignment: Alignment.bottomLeft,//控制分页的位置
            ),
            control: new SwiperControl(),
            autoplay: true,
            onTap: (index){},
          ),
        );  
  }

  List<Widget> list = List();
  @override
  void initState(){
      list..add(Image.asset("images/1.jpg"))
      ..add(Image.asset("images/2.jpg"))
      ..add(Image.asset("images/3.jpg"));
      super.initState();
    }

  Widget _swiperBuilder(BuildContext context, int index) {
    return (list[index]);
  }
}