import 'package:flutter/material.dart';
import 'first.dart';
void main() => runApp(new MyApp());

class MyApp extends StatelessWidget{
    @override
    Widget build(BuildContext context){
      return MaterialApp(
            title:'导航栏',
            theme: ThemeData.light(),
            home: BottomNavigationWidget(),

      );
    }
}