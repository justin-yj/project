import 'package:flutter/material.dart';
import 'first.dart';


void main() => runApp(new MaterialApp(home:new MyApp()));
class MyApp extends StatelessWidget {
   final _ButtonColor =  Colors.green;
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
        ),
        body:Container(
          color: Colors.grey[100],
          padding: EdgeInsets.fromLTRB(30.0, 0, 30.0, 0),
           child:new ListView(
               
                children: <Widget>[
                  new Container(
                    margin: const EdgeInsets.only(top: 100.0),
                    width: 500,
                     child: new Text(
                      "你好，",
                      style: new TextStyle(fontSize: 30.0),
                      ),
                  ),
                
                  new Container(
                    width: 500.0,
                     child: new Text(
                      "新同学",
                      style: new TextStyle(
                        fontSize: 30.0,
                        color: Colors.green[500],
                        fontWeight: FontWeight.bold,
                        ),
                      ),
                  ),
                   new Container(
                     color: Color.fromARGB(255, 255,255, 255),
                      margin: const EdgeInsets.only(top: 40.0),
                      child:new TextField(
                        decoration: new InputDecoration(
                          labelText:"请输入你的学校",
                          contentPadding: EdgeInsets.all(10.0),
                          border: OutlineInputBorder()
                        ),
                      ),
                   ),
                   new Container(
                     
                      color: Color.fromARGB(255, 255,255, 255),
                      margin: const EdgeInsets.only(top: 20.0),
                      child:new TextField(
                        decoration: new InputDecoration(
                          labelText:"输入你的学号",
                          contentPadding: EdgeInsets.all(10.0),
                          border: OutlineInputBorder()
                        ),
                      ),
                   ),
                   new Container(
                     height: 40.0,
                     margin: EdgeInsets.only(top: 20.0),
                     child:new MaterialButton(
                          color:_ButtonColor,
                          textColor: Colors.white,
                          child: new Text(
                            "登陆",
                            style: TextStyle(fontSize: 20.0),
                            ),
                          onPressed: () =>{
                            Navigator.push(context, new MaterialPageRoute(
                              builder: (context) => new FirstScreeen()
                            ))
                          },
                     )
                   ),
                ],
            )
          
        ),
      ),
    );
  }
}