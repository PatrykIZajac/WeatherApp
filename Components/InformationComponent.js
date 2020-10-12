import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function InformationComponent({weatherData}) {
  return (
    <View style={styles.container}>
      <View style={styles.informationContainerStyle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textBoldStyle}>Wind</Text>
          <Text style={styles.textStyle}>{weatherData.windSpeed} m/s</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textBoldStyle}>Pressure</Text>
          <Text style={styles.textStyle}>{weatherData.pressure}</Text>
        </View>
      </View>

      <View style={styles.informationContainerStyle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textBoldStyle}>Humidity</Text>
          <Text style={styles.textStyle}>{weatherData.humidity}%</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textBoldStyle}>Sunset</Text>
          <Text style={styles.textStyle}>{weatherData.sunset}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#323338',
  },
  informationContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:20,
    marginRight:20,
    marginTop:10,
  },
  textBoldStyle: {
    fontWeight: 'bold',
    fontSize:20,
    color:'white'
  },
  textStyle: {
    color: '#00FF88',
    marginLeft:5,
    fontSize:20,
  },
});
