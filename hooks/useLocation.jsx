import { useEffect, useState } from "react";
import Geolocation from 'react-native-geolocation-service'
import { Platform, PermissionsAndroid } from "react-native";

export default async (isTrue, callback) => {
  const [err, setErr] = useState(null);
  const [subcriber, setSubscriber] = useState(null)

  const requestLocationPermission = async () => {
    if(Platform.OS === 'ios'){
      return Geolocation.requestAuthorization('whenInUse')
    }
    
    if(Platform.OS === 'android'){
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
          title: "Location Permission",
          message: "App need to access to your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return false;
  }

  const startWatching = async () => {
    try {
      const permissionGranted = await requestLocationPermission();
      if(!permissionGranted){
        throw new Error("Location permission not granted");
      }

      const sub = Geolocation.watchPosition(
        (position) => {
          callback(position)
        },
        (error) => {
          setErr(error)
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 1000,
          fastestInterval: 1000
        }
      )

      setSubscriber(sub);
    } catch (error) {
      setErr(error)
    }
  }

  useEffect(() => {
    if(isTrue){
      startWatching();
    }else{
      if(subcriber){
        Geolocation.clearWatch(subcriber)
        setSubscriber(null);
      }
    }

    return () => {
      if(subcriber){
        Geolocation.clearWatch(subcriber)
      }
    }
  }, [isTrue])

  return [err]
}