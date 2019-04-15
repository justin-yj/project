import 'package:flutter/material.dart';
// import 'bottom_navigation_widget.dart'

class FirstScreeen extends StatefulWidget  {
  _FirstScreeenState createState() => _FirstScreeenState();
}

class _FirstScreeenState extends State<FirstScreeen>{
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
          title: new Text("登陆页面"),
      ),
      body: Center(
        child: new Text("恭喜你登陆成功"),
      ),
    );
  }
}