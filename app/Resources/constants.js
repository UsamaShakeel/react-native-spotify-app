var constants = {
  spotify: {
    client_id: 'bad54d4a4b144717af3b49f9d309f75b',
    client_secret: '996024f3186c4460bc9c8d86039c8c58',
    redirect_uri: 'granjurspotify://callback',
    authorize: 'https://accounts.spotify.com/authorize',
    get_recommended: 'https://api.spotify.com/v1/browse/featured-playlists',
    get_token: 'https://accounts.spotify.com/api/token',
    get_playlist_tracks: playlist_id => {
      return (
        'https://api.spotify.com/v1/playlists/' +
        encodeURI(playlist_id) +
        '/tracks'
      );
    },
  },
  storage: {
    // User defaults
    spotify_token: 'spotify_token',
  },
};

export default constants;
