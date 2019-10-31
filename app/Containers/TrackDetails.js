/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, SafeAreaView, View, Image, Text, StatusBar} from 'react-native';
import {images, fonts, helpers, strings,theme} from '../Resources/index';
import {NavBar, PlaylistRowItem, ProgressView} from '../Components/index';

import LinearGradient from 'react-native-linear-gradient'

export default class TrackDetails extends Component<Props> {
  constructor(props) {
    super(props);
    let item = this.props.navigation.getParam('item', null);
    let artists = item.track.album.artists;
    let artistName = '';
    if (artists.length > 0) {
      artistName += artists[0].name;
    }
    let duration = helpers.msToTime(item.track.duration_ms);
    let imagesArr = item.track.album.images;
    let imageUrl = '';
    if (imagesArr.length > 0) {
      imageUrl = imagesArr[0].url;
    }
    this.state = {
      title: item.track.name,
      artistName: artistName,
      albumName: item.track.album.name,
      duration: duration,
      image: imageUrl ? {uri: imageUrl} : images.company_logo,
    };
  }
  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor= {theme.colors.light} barStyle='dark-content'/>
        <NavBar 
          title={'Track Details'}
          tintColor={theme.colors.light}
          backgroundColor={'#545048'}
          showLeftButton={true}
          leftButtonIcon={images.back_icon}
          onNavLeftBtnClick={() => {this.props.navigation.goBack(null)}} 
          />
        <Image resizeMode='contain' style={styles.imageStyle} source={this.state.image}></Image>
        <View style={styles.descpStyleStyle}>
          <View style={styles.descpStyle}>
            <Text style={styles.titleStyle}>{this.state.title}</Text>
            <Text style={styles.albumDurationStyle}>
              {strings.track_duration}: {this.state.duration}
            </Text>
            <Text style={styles.artistNameStyle}>
              {strings.album}: {this.state.albumName}
            </Text>
            <Text style={styles.artistNameStyle}>
              {strings.artist}: {this.state.artistName}
            </Text>
          </View>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.light,
  },
  imageStyle: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  descpStyleStyle: {
    width: '100%',
    // height: '100%',
    // position: 'absolute',
    // justifyContent: 'space-evenly',
    // alignItems: 'center'
  },
  gradientStyle: {
    // alignItems: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  descpStyle: {
    flexDirection:'column',
    padding: helpers.normalize(10),
    position: 'absolute'
  },
  titleStyle: {
    fontSize: helpers.normalize(28),
    fontWeight: 'bold',
    color: theme.colors.dark,
    textAlign: 'left',
    includeFontPadding: false,
    marginVertical: helpers.normalize(2)
  },
  artistNameStyle: {
    fontSize: helpers.normalize(16),
    fontWeight: 'normal',
    color: theme.colors.dark,
    textAlign: 'left',
    includeFontPadding: false,
    marginVertical: helpers.normalize(2),
  },
  albumDurationStyle: {
    fontSize: helpers.normalize(16),
    fontWeight: 'normal',
    color: theme.colors.dark,
    textAlign: 'left',
    includeFontPadding: false,
    marginVertical: helpers.normalize(2)
  },
  
});
