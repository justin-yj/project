import 'package:flutter/material.dart';
import 'bottomBar/home.dart';
import 'bottomBar/email.dart';
import 'bottomBar/airplay.dart';
import 'bottomBar/pages.dart';

class BottomNavigationWidget extends StatefulWidget {
  final Widget child;

  BottomNavigationWidget({Key key, this.child}) : super(key: key);

  _BottomNavigationWidgetState createState() => _BottomNavigationWidgetState();
}

class _BottomNavigationWidgetState extends State<BottomNavigationWidget> {
  final _BottomNavitionColor = Colors.blue;

  int _currentIndex = 0;
  List<Widget> list = List();
  @override
  void initState() {
    list..add(Home())..add(Email())..add(Pages())..add(Airplay());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: list[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
              icon: Icon(
                Icons.home,
                color: _BottomNavitionColor,
              ),
              title: Text('首页',
                  style: new TextStyle(color: _BottomNavitionColor))),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.email,
                color: _BottomNavitionColor,
              ),
              title: Text('邮箱',
                  style: new TextStyle(color: _BottomNavitionColor))),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.pages,
                color: _BottomNavitionColor,
              ),
              title: Text('pages',
                  style: new TextStyle(color: _BottomNavitionColor))),
          BottomNavigationBarItem(
              icon: Icon(
                Icons.airplay,
                color: _BottomNavitionColor,
              ),
              title: Text('airplay',
                  style: new TextStyle(color: _BottomNavitionColor))),
        ],
        currentIndex: _currentIndex,
        onTap: (int index) {
         
          setState(() {
            _currentIndex = index;
          });
           print(index);
        },
        type: BottomNavigationBarType.fixed,
      ),
    );
  }
}
