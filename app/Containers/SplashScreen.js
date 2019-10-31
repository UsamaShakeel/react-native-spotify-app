/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Linking, View, Image} from 'react-native';
import {images, fonts, helpers, strings, constants} from '../Resources/index';
import NetInfo from "@react-native-community/netinfo";
import DropdownAlert from 'react-native-dropdownalert';

import {Exceptions} from '../Components/index';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {GlobalActions} from '../Actions/index';
import axios from 'axios';
const queryString = require('query-string');

class SplashScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: "false",
    }
  }
  componentDidMount() {

    // internet connectivity Check
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );

    this.didBlurSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        setTimeout(() => {
          AsyncStorage.getItem(constants.storage.spotify_token).then(value => {
            if (value) {
              let info = JSON.parse(value);

              let loginDate = new Date(info.login_date);
              let currentDate = new Date();
              let difference = (currentDate - loginDate) / 1000;
              let expires_in = info.expires_in;
              if (difference > expires_in - 5) {
                this.getToken();
              } else {
                this.props.saveSpotifyToken(info);
                this.props.navigation.navigate('RecommendedPlaylists');
              }
            } else {
              this.getToken();
            }
          });
        }, 1500);
      },
    );
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    this.didBlurSubscription.remove();
  }
  handleConnectionChange = (isConnected) => {
    this.setState({ status: isConnected},()=>{
      // console.warn('isConnected:',isConnected)
    });
  }
  getToken = () => {
    axios
      .post(
        constants.spotify.get_token,
        queryString.stringify({grant_type: 'client_credentials'}),
        {
          headers: {
            Authorization:
              'Basic ' +
              helpers.encodeBase64(
                constants.spotify.client_id +
                  ':' +
                  constants.spotify.client_secret,
              ),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then(response => {
        if (response.data) {
          let info = response.data;
          let loginDate = new Date();
          info.login_date = loginDate.toISOString();
          this.props.saveSpotifyToken(info);
          this.props.navigation.navigate('RecommendedPlaylists');
        }
      })
      .catch(error => {
        console.log(error);
        this.dropDownAlertRef.alertWithType('error', 'Error', error);
      })
      .finally(() => {
        // always executed
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={images.company_logo} />
        </View>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
        {!this.state.status &&
          <Exceptions showException={!this.state.status}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    spotify_token: state.main.spotify_token,
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
)(SplashScreen);
