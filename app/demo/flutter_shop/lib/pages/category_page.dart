import 'package:flutter/material.dart';
import '../service/service_method.dart';

class CategoryPage extends StatefulWidget {
  _CategoryPageState createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  List homePageContent;
  List<Widget> tiles = [];
  @override
  void initState() {
    getHomePageContent().then((val) {
      setState(() {
        homePageContent = val["data"]["data"];
        for (var item in homePageContent) {
          print(item);
          tiles.add(
            new Row(
              
            children: <Widget>[
              // new Container(
              //   // width: double.infinity,
              //   // height: 20.0,
              //   padding:const EdgeInsets.all(10.0) ,
              //   decoration: new BoxDecoration(
              //     border:new Border.all(color: Colors.blue[200],width: 1.0)
              //   ),
              new Icon(
                Icons.person,
                color:Colors.blue[200]
              ),
                new Text(
                  "姓名：" + item["body_name"],
                  style: TextStyle(color: Colors.blue, fontSize: 15.0),
                ),
              // ),
              new Icon(
                Icons.phone,
                color:Colors.blue[200]
              ),
               new Text(
                 "电话" + item["phone"],
                  style: TextStyle(color: Colors.blue, fontSize: 15.0),
                ),
            ],
          )
          // new Container(
          //   width: 500.0,
          //   padding: EdgeInsets.all(10.0),
          //   color: Colors.grey[100],
          //   decoration: new BoxDecoration(
          //     border:new Border.all(color: Colors.blue[200],width: 1.0)
          //   ),
          //   child: new Text(
          //     "姓名：" + item["body_name"],
          //     style: TextStyle(color: Colors.blue, fontSize: 14.0),
          //     ),
            
          // )
          );
        }
      });
    });
    super.initState();
  }

  Widget buildGrid() {
    Widget content;
    content = new Column(children: tiles);
    return content;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('百姓生活+'),
        ),
        body: SingleChildScrollView(
          child: buildGrid(),
        ));
  }
}
