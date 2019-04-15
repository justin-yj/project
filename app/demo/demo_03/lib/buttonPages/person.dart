import 'package:flutter/material.dart';

class Perosn extends StatefulWidget {
  final Widget child;

  Perosn({Key key, this.child}) : super(key: key);

  _PerosnState createState() => _PerosnState();
}

class _PerosnState extends State<Perosn> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: new Column(
        children: <Widget>[
          Padding(padding: EdgeInsets.only(top: 30.0),),
          new Card(
            elevation: 15.0,
            child: new Row(
              children: <Widget>[
                Padding(padding: EdgeInsets.only(top: 10.0),),
                new Text("个人中心"),
                new Icon(Icons.person),
                 new Divider()
              ],
            ),
          )
        ],
      ),
    );
  }
}
