import React from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
export default function CardInformationComponent({nextDaysWeather}) {
  return (
    <View style={{marginTop: 10, marginLeft:10}}>
      {nextDaysWeather.list.length === 0 ? null : (
        <FlatList
          horizontal={true}
          data={nextDaysWeather.list}
          renderItem={({item}) => {
            return (
              <View style={styles.cardStyle}>
                <Text
                  style={{fontWeight: 'bold', color: '#00FF88', paddingTop: 8}}>
                  {item.dt_txt.substr(5, 5)}
                </Text>
                <Image
                  style={{width: 75, height: 45}}
                  source={{
                    uri:
                      'http://openweathermap.org/img/wn/' +
                      item.weather[0].icon +
                      '@2x.png',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    marginLeft: 8,
                  }}>
                  <Text style={{fontWeight: 'bold', color: 'white'}}>
                    {Math.round(item.main.temp)}
                  </Text>
                  <Image
                    style={{marginLeft: 2}}
                    source={require('../Assets/smallDegreeIcon.png')}
                  />
                </View>
                <Text style={{fontWeight: 'bold', color: '#00FF88', marginRight:5}}>
                  {item.dt_txt.substr(10, 6)}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    width: 90,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#46474C',
    alignItems: 'center',
    margin: 20,
  },
  imageStyle: {
    width: 90,
    height: 60,
  },
});
