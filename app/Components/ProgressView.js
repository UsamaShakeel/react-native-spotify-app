import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {images, helpers, theme} from '../Resources/index';
import Modal from "react-native-modal";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default class ProgressView extends Component {
  render() {
    return (
      <View>
        <Modal backdropOpacity={0.4} isVisible={this.props.isVisible}>
          <View style={styles.containerStyle}>
            <View style={styles.cardStyle}>
              <SkypeIndicator size={40} color={theme.colors.primary} />
              <Text style={styles.textStyle}>
                {this.props.title ? this.props.title : 'Loading...'}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardStyle: {
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: helpers.normalize(12),
    padding: helpers.normalize(10),
  },
  textStyle: {
    fontSize: helpers.normalize(14),
    textAlign: 'center',
    color: 'grey',
  },
});
