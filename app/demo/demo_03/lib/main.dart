import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'BottomBar.dart';

void main() => runApp(new TabNavigation());
 

 
class TabNavigation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      routes: {
        "bottomBar":(BuildContext context)=>new BottomBar(),
      },
        home: Scaffold(
      body: DefaultTabController(
        length: 2,
        initialIndex: 0,
        child: Column(
          children: <Widget>[
            Container(
              width: double.infinity,
              height: 200.0,
              decoration: new BoxDecoration(
                  image: new DecorationImage(
                      image: new NetworkImage(
                          "https://web-jytest.jianyu360.cn/jyapp/me/images/banner_03.png"),
                      fit: BoxFit.cover)),
              child: Center(
                  child: new Text(
                "欢迎使用剑鱼APP，我们将全心为你服务",
                style: TextStyle(fontSize: 20.0, color: Colors.white),
              )),
            ),
            Container(
              color: Colors.white,
              child: AspectRatio(
                aspectRatio: 8.0,
                child: TabBar(
//                    isScrollable: true,//项少的话，无需滚动（自动均分屏幕宽度），多的话，设为true
                  indicatorColor: Colors.lightBlue,
                  indicatorWeight: 2,
                  unselectedLabelColor: Colors.black,
                  labelColor: Colors.lightBlue,
                  indicatorSize: TabBarIndicatorSize.label,
                  tabs: [
                    Tab(
                      text: "密码登录",
                    ),
                    Tab(
                      text: "验证码登录",
                    ),
                  ],
                ),
              ),
            ),
            Expanded(
              child: TabBarView(
                children: [
                  Container(
                      margin: EdgeInsets.fromLTRB(20.0, 30.0, 20.0, 0),
                      child: changeEyes()),
                  new Text("2"),
                ],
              ),
            ),
            new Stack(
           
           children: <Widget>[
             Positioned(
               bottom: 30.0,
               left: 180.0,
               child: new InkWell(
                onTap: (){},
                child: new Row(
                  mainAxisAlignment:MainAxisAlignment.spaceAround,
                    children: <Widget>[
                      Icon(FontAwesomeIcons.weixin),
                      new Padding(
                        padding: EdgeInsets.all(10.0),
                      ),
                      new Text("微信登录")
                    ],
                ),
              ) ,
             ),
             new Container(
               padding: EdgeInsets.all(30.0),
              //  color: Colors.blue,
             )
            
           ],
         )
          ],
        ),

      ),
    ));
  }
}

class changeEyes extends StatefulWidget {
  @override
  _changeEyesState createState() => _changeEyesState();
}

class _changeEyesState extends State<changeEyes> {
  bool _keyforwords = true;

  get d71dc5 => null;

  void _induce() {
    setState(() {
      if (_keyforwords) {
        _keyforwords = false;
      } else {
        _keyforwords = true;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: ListView(
        padding: EdgeInsets.only(top: 20.0),
        children: <Widget>[
          new TextField(
            decoration: InputDecoration(
                contentPadding: EdgeInsets.all(10.0),
                //  icon: Icon(Icons.phone),
                labelText: '手机号码'),
          ),
          new Stack(
            
            children: <Widget>[
              new Positioned(
                child: new TextField(
                  obscureText: _keyforwords,
                  decoration: InputDecoration(
                      contentPadding: EdgeInsets.all(10.0),
                      //  icon: Icon(Icons.phone),
                      labelText: '密码'),
                ),
              ),
              new Positioned(
                right: 0.0,
                top: 5.0,
                child: IconButton(
                  icon: Icon(Icons.visibility),
                  onPressed: _induce,
                ),
              ),
            ],
          ),
         new Container(
           margin: EdgeInsets.only(top:30.0),
           child:  new RaisedButton(
             
             color: Colors.lightBlue,
             padding: EdgeInsets.fromLTRB(0.0,10.0,0.0,10.0),
              child: new Text("登录",style: TextStyle(color: Colors.white),),
              onPressed: (){
                Navigator.pushNamed(context, 'bottomBar');
              },
            ),
         ),
         new Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
             new Expanded(
               child: new ListTile(
                 title: new Text("忘记密码？"),
                 onTap: (){},
               ),
             ),
             new Expanded(
               child: new ListTile(
                 title: new Text("立即注册",textAlign: TextAlign.right),
                 onTap: (){},
               ),
             )
            ],
         ),
         
        ],
      ),
    );
  }
}
