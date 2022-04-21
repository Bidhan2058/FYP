import 'package:http/http.dart' as http;
import 'package:flutter_login_signup/models/VehicleData.dart';
import 'package:flutter_session/flutter_session.dart';

class Services {
  static const String url = 'http://10.0.2.2:8000/API/vehicles';
  static const String searchurl = 'http://10.0.2.2:8000/API/searchVehicle';
  static const String listedurl = 'http://10.0.2.2:8000/API/getVehicles';

  static Future<List<Data>> getVehicle() async {
    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final body = response.body;
        print("after response");

        final vehicles = vehicleFromJson(body);
        print("after json");
        print(vehicles);
        List<Data> vehicle = vehicles.data;

        return vehicle;
      } else {
        print("error");

        return null;

      }
    } catch (e) {
      // ignore: deprecated_member_use
      return List<Data>();
    }
  }

  static Future<List<Data>> searchedVehicle(
      String search, String start, String end) async {
    try {
      final response = await http.get(
        searchurl + "/$search/$start/$end",
        headers: {"Content-type": "application/json"},
      );
      print("Search in api" + search);
      if (response.statusCode == 200) {
        print(start);
        // print(response.body);
        final body = response.body;
        // print(body.length);
        final rooms = vehicleFromJson(body);
        List<Data> room = rooms.data;
        // List property = properties.data.toString();
        // print(property[0].propertyAddress);
        return room;
      } else {
        print('Khali cha hai');
        // ignore: deprecated_member_use
        return List<Data>();
      }
    } catch (e) {
      // ignore: deprecated_member_use
      return List<Data>();
    }
  }

  static Future<List<Data>> listedVehicle() async {
    String userid = await FlutterSession().get("id");
    try {
      final response = await http.get(
        listedurl + "/$userid",
        headers: {"Content-type": "application/json"},
      );
      if (response.statusCode == 200) {
        // print(response.body);
        final body = response.body;
        // print(body.length);
        final rooms = vehicleFromJson(body);
        List<Data> room = rooms.data;
        // List property = properties.data.toString();
        // print(property[0].propertyAddress);
        return room;
      } else {
        // ignore: deprecated_member_use
        return List<Data>();
      }
    } catch (e) {
      // ignore: deprecated_member_use
      return List<Data>();
    }
  }
}
