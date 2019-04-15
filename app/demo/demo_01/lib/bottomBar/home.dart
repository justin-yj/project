import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('时光屋'),
        ),
        body: Center(
          child: Text('时光屋的主页用于展示所有的动态，图标位于正中间，以不规则的形式展示出来'),
        ));
  }
}
