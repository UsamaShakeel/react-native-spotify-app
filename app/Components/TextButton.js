/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {images, helpers, theme} from '../Resources/index';

export default class MyButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.buttonStyle,
          this.props.bordered
            ? {
                borderWidth: helpers.normalizeW(2),
                backgroundColor: 'transparent',
              }
            : {},
          this.props.style,
        ]}>
        <Text style={[styles.textStyle, this.props.textStyle]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: helpers.normalize(4),
    borderColor: theme.colors.primary,
  },
  textStyle: {
    fontSize: helpers.normalize(16),
    textAlign: 'center',
    paddingVertical: helpers.normalize(8),
    color: 'white',
  },
});
