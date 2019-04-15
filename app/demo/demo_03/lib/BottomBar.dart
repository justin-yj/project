import 'package:flutter/material.dart';
import 'buttonPages/home.dart';
import 'buttonPages/person.dart';


class BottomBar extends StatefulWidget {
  final Widget child;

  BottomBar({Key key, this.child}) : super(key: key);

  _BottomBarState createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> {

  var _colors = Colors.white;
  

  int _currentIndex = 0;
  List<Widget> list = List();
    @override
    void initState(){
      list..add(Home())..add(Perosn());
      super.initState();
    }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: list[_currentIndex],
       floatingActionButton: FloatingActionButton(
         onPressed: (){
           
         },
         tooltip: "提示信息",
         child: Icon(
           Icons.search,
           color:Colors.white,
         ),
       ),
       floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
       bottomNavigationBar: BottomAppBar(
         color: Colors.lightBlue,
         shape: CircularNotchedRectangle(),
         child: Row(
           mainAxisSize: MainAxisSize.max,
           mainAxisAlignment: MainAxisAlignment.spaceAround,
           children: <Widget>[
             IconButton(
               icon:Icon(Icons.home),
               color:_colors,
               onPressed:(){
                 setState(() {
                  _currentIndex = 0; 
                 });
               }
             ),
             IconButton(
               icon:Icon(Icons.person),
               color:_colors,
               onPressed:(){
                  setState(() {
                  _currentIndex = 1; 
                 });
               }
             ),
           ],
         ),
       ),
    );
  }
}