import React from 'react';
import MainScreen from './Screens/MainScreen';
import {Router, Scene, Stack} from 'react-native-router-flux';
import Favorites from './Screens/FavoriteScreen';
import {FavProvider} from './Context/FavContext';

export default function App() {
  return (
    <FavProvider>
      <Router>
        <Stack key="root">
          <Scene key="MainScreen" component={MainScreen} hideNavBar={true} />
          <Scene key="FavoritesScreen" component={Favorites} hideNavBar={true} />
        </Stack>
      </Router>
    </FavProvider>
  );
}
