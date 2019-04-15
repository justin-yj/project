import 'package:flutter/material.dart';   
// import 'package:flutter/rendering.dart';    //调试引入的dart
import 'pages/index_page.dart';

void main() {
  // debugPaintSizeEnabled=true;
  runApp(MyApp());
}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: MaterialApp(
        title:'百姓生活+',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primaryColor:Colors.pink
        ),
        home:IndexPage()
      ),
    );
  }
}