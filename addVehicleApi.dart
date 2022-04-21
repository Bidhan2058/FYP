import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/addVehicleModel.dart';
import 'package:flutter_session/flutter_session.dart';

class VehicleAPIService {
  Future<VehicleResponseModel> addVehicle(AddVehicle addvehiclemodel) async {
    String userId = await FlutterSession().get("id");
    print(userId);
    String url = "http://10.0.2.2:8000/API/$userId/vehicle";
    print(url);
    String token = await FlutterSession().get("token"); // TOKEN LEKO
    print(userId);
    final response = await http.post(url,
        headers: {
          "Content-type": "application/json",
          "Authorization": "$token"
        },
        body: json.encode(addvehiclemodel.toJson()));
    if (response.statusCode == 200 || response.statusCode == 400) {
      print("hello"+response.body);
      return VehicleResponseModel.fromJson(
        json.decode(response.body),
      );
    } else {
      throw Exception('Failed to load data!');
    }
  }

  Future<VehicleResponseModel> editVehicle(AddVehicle editVehiclemodel) async {
    String vehicleID = await FlutterSession().get("vehicleID");
    String url = "http://10.0.2.2:8000/API/$vehicleID/editvehicle";
    print(url);
    String token = await FlutterSession().get("token");
    final response = await http.put(url,
        headers: {
          "Content-type": "application/json",
          "Authorization": "$token"
        },
        body: json.encode(editVehiclemodel.toJson()));
    if (response.statusCode == 200 || response.statusCode == 400) {
      print("hello"+response.body);
      return VehicleResponseModel.fromJson(
        json.decode(response.body),
      );
    } else {
      throw Exception('Failed to load data!');
    }
  }
}
