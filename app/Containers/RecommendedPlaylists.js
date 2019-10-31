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
import {NavBar, PlaylistRowItem, ProgressView, TextButton} from '../Components/index';
import {connect} from 'react-redux';
import {GlobalActions} from '../Actions/index';
import {Button, Text, Container} from 'native-base';
import axios from 'axios';
import * as RNLocalize from "react-native-localize";

class RecommendedPlaylists extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hasMoreData: true,
      data: [],
      offset: 0,
    };
  }
  componentDidMount() {
    this.fetchRecommendedPlaylists();
  }

  renderItem = ({item}) => {
    return (
      <PlaylistRowItem
        item={item}
        onPress={() => {
          this.props.navigation.navigate('PlaylistTracks', {item: item});
        }}
      />
    );
  };

  fetchRecommendedPlaylists = () => {
    axios
      .get(constants.spotify.get_recommended, {
        params: {
          country: RNLocalize.getCountry(),
          offset: this.state.offset,
        },
        headers: {
          Authorization: 'Bearer ' + this.props.spotify_info.access_token,
        },
      })
      .then(response => {
        let playlists = response.data.playlists;
        if (playlists) {
          let items = playlists.items;
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
        <StatusBar backgroundColor= {theme.colors.light} barStyle='dark-content'/>
        <NavBar 
          title={'Recomended PlayList'}
          backgroundColor={'#545048'}
          // showRightButton={true}
          // rightButtonIcon={images.time_icon}
          // onNavRightBtnClick={() => {}} 
          />
        <FlatList
          style={styles.listStyle}
          data={this.state.data}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
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
        
        <ProgressView isVisible={this.state.loading} />
      </SafeAreaView>
      <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },
  listStyle: {
    padding: helpers.wp(4),
    overflow: 'hidden',
  },
  loginContainerStyle: {
    width: helpers.wp(70),
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loginInfoStyle: {
    fontSize: helpers.normalize(16),
    paddingVertical: helpers.hp(3),
    color: 'grey',
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    spotify_info: state.main.spotify_info,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveSpotifyToken: token => dispatch(GlobalActions.saveSpotifyToken(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecommendedPlaylists);
