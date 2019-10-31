import React, {Component} from 'react';
import {StyleSheet,Image,Text} from 'react-native';
import Modal from "react-native-modal";

import {images, fonts, helpers, strings, theme} from './../Resources/index'


class  Exceptions extends Component<Props> {

  constructor(props)
  {
    super(props)
  }

  render() {
    return (
      <Modal style={{justifyContent:'center'}} coverScreen={true} backdropColor={theme.colors.dark} backdropOpacity={0.95} isVisible={this.props.showException}>
        {/* <View style={styles.container}> */}
          <Image resizeMode="contain" style={styles.iconStyle} source={images.alert_icon}></Image>
          <Text style={styles.titleStyle}>
            {'Internet Down'}
          </Text> 
          <Text style={styles.descpStyle}>
            {'Please Check Internet Connectivity'}
          </Text>
      </Modal>
    );
  }
}

export default (Exceptions)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignSelf : 'center',
    justifyContent : 'center',
    marginHorizontal: helpers.normalize(30)
    
  },
  iconStyle : {
    alignSelf:'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleStyle : {
    color: 'white',
    fontWeight: 'bold',
    fontSize: helpers.normalize(22),
    textAlign: 'center',
    marginTop: helpers.normalize(10), 
  },
  descpStyle : {
    color: 'white',
    fontSize: helpers.normalize(14),
    textAlign: 'center',
    marginTop: helpers.normalize(10), 
  },
});
