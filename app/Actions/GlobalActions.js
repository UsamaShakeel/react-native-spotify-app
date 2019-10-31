import * as types from './types';

export function saveSpotifyToken(response) {
  return {
    type: types.SAVE_TOKEN,
    payload: response,
  };
}
