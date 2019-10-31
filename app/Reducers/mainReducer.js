import * as types from '../Actions/types';
import AsyncStorage from '@react-native-community/async-storage';
import {constants, helpers} from '../Resources/index';

const initialState = {
  spotify_info: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_TOKEN:
      if (action.payload) {
        saveToken(action.payload);
      }
      return {
        ...state,
        spotify_info: action.payload,
      };
    default:
      return state;
  }
};
function saveToken(token) {
  AsyncStorage.setItem(
    constants.storage.spotify_token,
    JSON.stringify(token),
  ).then(value => {});
}
export default reducer;
