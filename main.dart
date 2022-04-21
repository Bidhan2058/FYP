import 'package:flutter/material.dart';
// import 'package:google_fonts/google_fonts.dart';
// import 'src/welcomePage.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:flutter_login_signup/src/welcomePage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // ignore: unused_local_variable
    final textTheme = Theme.of(context).textTheme;
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      //   textTheme: GoogleFonts.latoTextTheme(textTheme).copyWith(
      //   //   bodyText1: GoogleFonts.montserrat(textStyle: textTheme.bodyText1),
      //   bodyText1: "Welcoe"
      //   ),
      ),
      // debugShowCheckedModeBanner: false,
      home: WelcomePage(),
      builder: EasyLoading.init(),
    );
  }
}
