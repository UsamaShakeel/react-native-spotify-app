/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  FlatList,
  StatusBar
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {images, fonts, helpers, strings, constants, theme} from '../Resources/index';
import {NavBar, TracklistRowItem, ProgressView} from '../Components/index';
import axios from 'axios';
import {Toast, Container} from 'native-base';
import {connect} from 'react-redux';

class PlaylistTracks extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    let playlist = navigation.getParam('item', null);
    return {
      title: playlist ? playlist.name : 'asd',
    };
  };

  constructor(props) {
    let playlist = props.navigation.getParam('item', null);
    super(props);
    this.state = {
      playlistId: playlist.id,
      loading: true,
      hasMoreData: true,
      data: [],
      offset: 0,
    };
  }
  componentDidMount() {
    if (this.state.playlistId) {
      this.fetchTracks();
    } else {
      Toast.show({text: 'Playlist not found'});
    }
  }

  fetchTracks = id => {
    axios
      .get(constants.spotify.get_playlist_tracks(this.state.playlistId), {
        params: {
          offset: this.state.offset,
          fields: 'total,next,limit,items(track(name,duration_ms,popularity,album(name,artists,images)))'
        },
        headers: {
          Authorization: 'Bearer ' + this.props.spotify_info.access_token,
        },
      })
      .then(response => {
        let items = response.data.items;
        if (items) {
          let hasMoreData = false;
          let data = this.state.data;
          data = data.concat(items);
          let next = response.data.next;
          if (next) {
            hasMoreData = true;
          }
          this.setState({data: data, loading: false, hasMoreData: hasMoreData});
        }
      })
      .catch(error => {
        console.log(error);
        this.dropDownAlertRef.alertWithType('error', 'Error', error);
      })
      .finally(function() {
        // always executed
      });
  };

  renderItem = ({item}) => {
    return (
      <TracklistRowItem
        item={item}
        onPress={() => {
          this.props.navigation.navigate('TrackDetails', {item: item});
        }}
      />
    );
  };

  onEndReached = info => {
    if (!this.state.loading && this.state.hasMoreData) {
      this.setState(
        {offset: this.state.data.length, loading: true},
          this.fetchTracks,
      );
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor= {theme.colors.medium} barStyle='dark-content'/>
          <NavBar 
            title={'Track List'}
            backgroundColor={'white'}
            tintColor={theme.colors.dark}
            showLeftButton={true}
            leftButtonIcon={images.back_icon}
            onNavLeftBtnClick={() => {this.props.navigation.goBack(null)}} 
            />
          <FlatList
            style={styles.listStyle}
            data={this.state.data}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'key_' + index}
            onEndReachedThreshold={0.9}
            onEndReached={this.onEndReached}
            ListFooterComponent={() => 
              <View style={{minHeight: 20}}>
              {this.state.loading && 
                <ActivityIndicator
                  animating={this.state.loading}
                  hidesWhenStopped={true}
                />
              }
              </View>
            }
          />
          <ProgressView
            isVisible={this.state.loading && this.state.offset === 0}
          />
        </SafeAreaView>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.medium,
  },
  listStyle: {
    padding: helpers.wp(4),
    overflow: 'hidden',
  },
});

const mapStateToProps = state => {
  return {
    spotify_info: state.main.spotify_info,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistTracks);
