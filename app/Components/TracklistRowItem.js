/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {images, helpers, theme, strings} from '../Resources/index';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Left,
} from 'native-base';
import {Image} from 'react-native-elements';

export default class TracklistRowItem extends Component {
  constructor(props) {
    super(props);
    let item = this.props.item;
    let artists = item.track.album.artists;
    let artistName = ''
    if (artists.length > 0) {
      artistName = artists[0].name
    }
    let imagesArr = item.track.album.images;
    let imageUrl = '';
    if (imagesArr.length > 0) {
      imageUrl = imagesArr[0].url;
    }
    this.state = {
      title: item.track.name,
      artistName: artistName,
      popularity: item.track.popularity,
      tracksCount: item ? '' : '0',
      image: imageUrl ? {uri: imageUrl} : images.company_logo,
    };
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Card>
          <CardItem>
            <Left>
              <Image
                resizeMode="contain"
                style={styles.trackImageStyle}
                source={this.state.image}
                PlaceholderContent={
                  <ActivityIndicator
                    style={{position: 'absolute', alignSelf: 'center'}}
                  />
                }
              />
              <Body style={{left: 10}}>
                <Text style={styles.titleStyle}>{this.state.title}</Text>
                <Text note style={styles.descpStyle}>
                {strings.artist}: {this.state.artistName}
                </Text>
                <Text note style={styles.descpStyle}>
                  {strings.popularity}: {this.state.popularity}
                </Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  trackImageStyle: {
    alignSelf: 'center',
    width: helpers.wp(20),
    height: helpers.wp(20),
    // borderRadius: helpers.normalize(2),
    overflow: 'hidden',
  },
  titleStyle: {
    fontSize: helpers.normalize(18),
    fontWeight: 'bold',
    color: 'black',
    includeFontPadding: false,
  },
  descpStyle: {
    fontSize: helpers.normalize(12),
    fontWeight: 'normal',
    color: 'grey',
    includeFontPadding: false,
  },
});
