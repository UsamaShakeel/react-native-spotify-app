/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {strings} from './app/Resources/index';

import SplashScreen from './app/Containers/SplashScreen';
import RecommendedPlaylists from './app/Containers/RecommendedPlaylists';
import PlaylistTracks from './app/Containers/PlaylistTracks';
import TrackDetails from './app/Containers/TrackDetails';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './app/Reducers';
import {Root} from 'native-base';

const RootNavigation = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {header: null},
  },
  RecommendedPlaylists: {
    screen: RecommendedPlaylists,
    // navigationOptions: {headerLeft: null, title: strings.recommended_playlists},
    navigationOptions: {header: null},
  },
  PlaylistTracks: {
    screen: PlaylistTracks,
    navigationOptions: {header: null},
  },
  TrackDetails: {
    screen: TrackDetails,
    navigationOptions: {header: null},
  },
});
const AppContainer = createAppContainer(RootNavigation);

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware));
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

const App = () => (
  <Root>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </Root>
);

export default App;
