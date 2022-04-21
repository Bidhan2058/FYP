// import 'package:flutter_login_signup/models/searchModel.dart';
import 'package:flutter_login_signup/models/userModel.dart';
import 'package:flutter_session/flutter_session.dart';
import 'package:http/http.dart' as http;

class UserServices {
  static const String url = 'http://10.0.2.2:8000/API/getUserInfo';

  static Future<List<UserData>> getUserInfo() async {
    String userid = await FlutterSession().get("id");
    try {
      final response = await http.get(url + "/$userid");
      if (response.statusCode == 200) {
        print("hi");

        print(response.body);
        final body = response.body;
        print("hi");
        final users = infofromJson(body);
        print("hi");
        print(users);
        List<UserData> userinfo = users.data;

        return userinfo;

      } else {
        // ignore: deprecated_member_use
        return null;
      }
    } catch (e) {
      // ignore: deprecated_member_use
      return List<UserData>();
    }
  }
}