import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default function HeaderComponent({
  getWeatherByName,
}) {
  const [cityInput, setCityInput] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => {
          Actions.FavoritesScreen();
        }}>
        <Image source={require('../Assets/FavoriteIcon.png')} />
      </TouchableOpacity>

      <TextInput
        ref={(input) => {
          textInput = input;
        }}
        style={styles.textInputStyle}
        onChangeText={(value) => {
          setCityInput(value);
        }}
        onEndEditing={() => {
          getWeatherByName(cityInput);
        }}
      />

      {cityInput === '' ? (
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => {
            getWeatherByName(cityInput);
            console.log(cityInput);
          }}>
          <Image source={require('../Assets/searchIcon.png')} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={()=>{
            Actions.reset('MainScreen');
          }}>
          <Image source={require('../Assets/locationIcon.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    height: 30,
  },
  textInputStyle: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    width: '65%',
    height: 40,
    color: 'white',
    textAlign: 'center',
  },
  menuIcon: {
    paddingTop: 20,
  },
  searchIcon: {
    paddingTop: 15,
  },
});
