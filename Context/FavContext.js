import React, {useState} from 'react';
import {useEffect} from 'react';
import LocationModel from '../ModelData/LocationModel';

const FavContext = React.createContext();

export const FavProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);
  const [index, setIndex] = useState(null);

  const getData = async () => {
    let favs = await LocationModel.getDataFromRealm();
    setFavorites(Array.from(favs));
  };


  const addToFavs = (placeName, latitude, longitude) => {
    let location = {placeName, latitude, longitude};
    LocationModel.saveDataToRealm(location, (results) => {
      if (results === true) {
        let fav = favorites;
        fav.push(location);
        setFavorites(fav);
        console.log('Dodano lokacje: ' + location.placeName + ' do ulubionych');
      } else {
        console.log('lokacja już istnieje');
      }
    });
  };

  const getIndex = (array,searchPlace) => {
    let index = array.findIndex(
      (element) => element.placeName === searchPlace);
    console.log(index, 'INDEX');
    setIndex(index);
  };

  const deleteFromFavs = (placeName) => {
    let fav = favorites;
    let index = favorites.findIndex(
      (element) => element.placeName === placeName,
    );
    if (index > -1) {
      fav.splice(index, 1);
    }
    LocationModel.deleteDataFromRealm(placeName);
    setFavorites(fav);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <FavContext.Provider
      value={{
        favorites: favorites,
        getData: getData,
        addToFavs: addToFavs,
        deleteFromFavs: deleteFromFavs,
        index: index,
        setIndex: setIndex,
        getIndex:getIndex
      }}>
      {children}
    </FavContext.Provider>
  );
};

export default FavContext;
