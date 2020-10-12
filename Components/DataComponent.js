import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import FavContext from '../Context/FavContext';

export default function DataComponent({weatherData}) {
  const {addToFavs, favorites, index, getIndex} = useContext(FavContext);

  const date = new Date();
  const months = new Array(12);
  months[0] = 'January';
  months[1] = 'February';
  months[2] = 'March';
  months[3] = 'April';
  months[4] = 'May';
  months[5] = 'June';
  months[6] = 'July';
  months[7] = 'August';
  months[8] = 'September';
  months[9] = 'October';
  months[10] = 'November';
  months[11] = 'December';

  const fullData =
    months[date.getMonth().toString()] +
    ' ' +
    date.getDate().toString() +
    ' ' +
    date.getFullYear().toString();

  useEffect(() => {
    getIndex(favorites,weatherData.name);
  }, [weatherData.name]);

  return (
    <View style={styles.container}>
      <Text style={styles.textInData}>{fullData}</Text>
      <View style={styles.DataComponentStyle}>
        {index > -1 ? (
          <TouchableOpacity>
            <Image source={require('../Assets/starIconFull.png')} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              addToFavs(
                weatherData.name,
                weatherData.latitudeFromReq,
                weatherData.longitudeFromReq,
              );
            }}>
            <Image source={require('../Assets/starIcon.png')} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 18,
            marginLeft: 8,
          }}>
          {weatherData.name}, {weatherData.country}
        </Text>
      </View>

      <Image
        style={styles.image}
        source={{
          uri:
            'http://openweathermap.org/img/wn/' + weatherData.icon + '@2x.png',
        }}
      />
      <Text style={{fontSize: 25, color: 'white'}}>{weatherData.desc}</Text>

      <View style={styles.temperatureStyle}>
        <Text style={{fontSize: 60, color: 'white', fontWeight: 'bold'}}>
        {Math.round(weatherData.temp)}
        </Text>
        <Image source={require('../Assets/dotIcon.png')} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#323338',
    marginTop: 40,
    alignItems: 'center',
  },
  DataComponentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    width: 200,
    height: 120,
  },
  textInData: {
    color: '#00FF88',
  },
  temperatureStyle: {
    flexDirection: 'row',
    marginTop: 10,
    alignContent: 'center',
  },
});
