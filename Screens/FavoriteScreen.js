import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import FavContext from '../Context/FavContext';

export default function FavoriteScreen() {
  const {favorites,deleteFromFavs} = useContext(FavContext);

  const clickHandler = (item) => {
    Actions.reset('MainScreen', {
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
    });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({item}) => {
          return (
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.rowListStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      clickHandler(item);
                    }}>
                    <Text style={styles.listTextStyle}>{item.placeName}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{
                  deleteFromFavs(item.placeName),
                  Actions.reset('MainScreen');
                }}>
                <Image
                  style={styles.imageStyle}
                  source={require('../Assets/bucketDeleteIcon.png')}
                />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#323338',
  },
  rowListStyle: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    width: 300,
    height: 55,
  },
  listTextStyle: {
    color: 'white',
    fontSize:20,
  },
  imageStyle: {
    marginLeft: 20,
    marginTop: 40,
  },
});
