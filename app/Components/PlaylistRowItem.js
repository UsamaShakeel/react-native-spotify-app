import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {images, helpers, theme, strings} from '../Resources/index';
import {Container, Header, Content, Card, CardItem, Body} from 'native-base';

import LinearGradient from 'react-native-linear-gradient';

export default class PlaylistRowItem extends Component {
  constructor(props) {
    super(props);
    let item = this.props.item;
    let imagesArr = item.images;
    let imageUrl = '';
    if (imagesArr.length > 0) {
      imageUrl = imagesArr[0].url;
    }
    this.state = {
      title: item ? item.name : 'Title Here',
      tracksCount: item ? item.tracks.total : '0',
      image: imageUrl ? {uri: imageUrl} : images.company_logo,
    };
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Card style={{overflow: 'hidden', borderRadius: 6}}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={this.state.image}
          />
          <View style={styles.descpStyleStyle}>
            <LinearGradient
              colors={[
                '#1d1d1d',
                '#2a2a2a',
                '#363636',
                '#434343',
                '#505050',
                '#5d5d5d',
              ]}
              start={{x: 0.0, y: 1.0}}
              end={{x: 0.0, y: 0.0}}
              style={styles.gradientStyle}
            />
            <View style={styles.descpStyle}>
              <Text style={styles.titleStyle}>{this.state.title}</Text>
              <Text style={styles.tracksCountStyle}>
                {strings.tracks}: {this.state.tracksCount}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  descpStyleStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flexDirection: 'column-reverse',
  },
  gradientStyle: {
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  descpStyle: {
    alignSelf: 'baseline',
    padding: helpers.normalize(8),
  },
  titleStyle: {
    fontSize: helpers.normalize(20),
    fontWeight: 'bold',
    color: 'white',
    // alignSelf: 'left',
    includeFontPadding: false,
  },
  tracksCountStyle: {
    fontSize: helpers.normalize(14),
    fontWeight: 'normal',
    color: 'white',
    // alignSelf: 'left',
    includeFontPadding: false,
  },
});
