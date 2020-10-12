import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderComponent from '../Components/HeaderComponent';
import DataComponent from '../Components/DataComponent';
import CardInformationComponent from '../Components/CardInformationComponent';
import InformationComponent from '../Components/InformationComponent';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export default function MainScreen(props) {
  const [coordinates, setCoordinates] = useState({
    longitude: null,
    latitude: null,
  });

  const [nextDaysWeather, setNextDaysWeather] = useState({
    list: [],
  });

  const [weatherData, setWeatherData] = useState({
    name: 'loading!',
    temp: 'loading!',
    humidity: 'loading!',
    desc: 'loading!',
    icon: 'loading!',
    pressure: 'loading!',
    sunset: 'loading!',
    windSpeed: 'loading!',
    country: 'loading!',
    latitudeFromReq: 'loading!',
    longitudeFromReq: 'loading!',
  });

  const getCoordinates = () => {
    Geolocation.getCurrentPosition((position) => {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    console.log(coordinates.latitude, coordinates.longitude);
  };

  const onResultsNextDays = (results) => {
    setNextDaysWeather({
      list: results.data.list,
    });
  };

  const getNextDaysData = async (city) => {
    await axios
      .get(
        'http://api.openweathermap.org/data/2.5/forecast?q=' +
          city +
          '&units=metric' +
          '&appid=ecd7243ee1b9989131fea3393de91cfe',
      )
      .then(onResultsNextDays)
      .catch(function (error) {
        console.log(error);
      });
  };

  const onResults = (results) => {
    let date = new Date(results.data.sys.sunset * 1000);
    setWeatherData({
      name: results.data.name,
      temp: results.data.main.temp,
      humidity: results.data.main.humidity,
      desc: results.data.weather[0].description,
      icon: results.data.weather[0].icon,
      pressure: results.data.main.pressure,
      sunset: date.toLocaleTimeString().substr(0, 5),
      windSpeed: results.data.wind.speed,
      country: results.data.sys.country,
      latitudeFromReq: results.data.coord.lat,
      longitudeFromReq: results.data.coord.lon,
    });
    getNextDaysData(results.data.name);
  };

  const getWeather = async (latitude, longitude) => {
    await axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather?lat=' +
          latitude +
          '&lon=' +
          longitude +
          '&units=metric'+
          '&appid=ecd7243ee1b9989131fea3393de91cfe',
      )
      .then(onResults)
      .catch(function (error) {
        console.log(error);
      });
  };

  const getWeatherByName = (city) => {
    axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather?q=' +
          city +
          '&units=metric' +
          '&appid=ecd7243ee1b9989131fea3393de91cfe',
      )
      .then(onResults)
      .catch(function (error) {
        console.log(error);
      });
  };

  const getActualPositionWeather = () => {
    getCoordinates();
    if (coordinates.latitude != null && coordinates.longitude != null) {
      getWeather(coordinates.latitude, coordinates.longitude);
      console.log('cords set');
    }
  };

  useEffect(() => {
    if (props.latitude != null && props.longitude != null) {
      getWeather(props.latitude, props.longitude);
    } else {
      getActualPositionWeather();
    }
  }, [
    coordinates.latitude,
    coordinates.longitude,
    props.latitude,
    props.longitude,
  ]);

  return (
    <View style={styles.container}>
      <HeaderComponent getWeatherByName={getWeatherByName} />
      <DataComponent weatherData={weatherData} />
      <InformationComponent weatherData={weatherData} />
      {nextDaysWeather.list.length === 0 ? null : (
        <CardInformationComponent nextDaysWeather={nextDaysWeather} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#323338',
  },
});
