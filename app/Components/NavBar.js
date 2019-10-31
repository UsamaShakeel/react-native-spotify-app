import React, { Component } from 'react';
import { StyleSheet, Image, View, SafeAreaView, TouchableOpacity ,Text} from 'react-native';
import { Left, Right, Input, Button as BButton, Icon as IIcon, Body } from 'native-base';
import {Icon, Button, Badge } from 'react-native-elements'

import {images, helpers, theme} from '../Resources/index';



export default class  NavBar extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
 
      bgColor: this.props.backgroundColor ? this.props.backgroundColor : 'white',
      tintColor: this.props.tintColor ? this.props.tintColor : 'white',
      leftButtonIcon: this.props.leftButtonIcon ? this.props.leftButtonIcon : images.back_icon,
      showLeftButton: this.props.showLeftButton ? this.props.showLeftButton : false,
      rightButtonIcon: this.props.rightButtonIcon ? this.props.rightButtonIcon : images.icon_search,
      showRightButton: this.props.showRightButton ? this.props.showRightButton : false,
      isSearchEnable: this.props.isSearchEnable ? this.props.isSearchEnable : false,
      showSearchInput: false,
      searchText: '',
      navbar_icon_tintColor: this.props.backgroundColor && this.props.backgroundColor == 'transparent' ? 'white' : this.props.tintColor,
      
      type: this.props.type,

      title: this.props.title ? this.props.title : "",
      showBackButton: this.props.showBackButton ? this.props.showBackButton : true,
      showSearchButton: this.props.showSearchButton ? this.props.showSearchButton : false,
    }
  }

  _navBar = () => {
    return(
     <SafeAreaView>
       <View style={[styles.navBarStyle, { backgroundColor: this.state.bgColor, justifyContent: 'space-around' }]}>
         {this.state.showLeftButton &&
           <Left style={{ flex: 1 }}>
             <BButton transparent onPress={this.props.onNavLeftBtnClick}>
               <Image style={[styles.navButtonStyle,{tintColor:this.state.navbar_icon_tintColor}]} resizeMode="contain" source={this.state.leftButtonIcon} />
             </BButton>
           </Left>
         }
         <Body style={{ flex: 8 ,alignItems: 'flex-start',justifyContent:'center'}}>
           <Text style={[styles.titleStyle, {color: this.state.bgColor == 'transparent' ? 'white' : this.state.tintColor}]}>{this.state.title}</Text>
         </Body>
         {this.state.showRightButton &&
           <Right style={{ flex: 1 }}>
             <BButton transparent onPress={this.state.isSearchEnable ? this.ShowHideSearchButton : this.props.onNavRightBtnClick} style={{ flex: 1 }}>
               <Image style={[styles.navButtonStyle,{tintColor:this.state.navbar_icon_tintColor}]} resizeMode="contain" source={this.state.rightButtonIcon} />
             </BButton>
           </Right>
         }
       </View>
     </SafeAreaView>
    ) 
   }

  render() {
    return (
      this._navBar()
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'transparent',
    zIndex: 200,
  },
  navBarStyle: {
    backgroundColor: 'transparent',
    width: "100%",
    height: helpers.normalize(65),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: helpers.normalize(20)
  },
  companyLogoStyle: {
    width: "15%",
    alignSelf: 'center',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    includeFontPadding: false,
    fontSize: helpers.normalize(21),
    textAlign: 'center',
    
  },
  leftBtnStyle: {
    backgroundColor: 'transparent',
  },
  rightBtnStyle: {
    // backgroundColor: 'red',
    // elevation: 0
  },
  navButtonStyle: {
    height: helpers.normalize(24),
    justifyContent: 'center',
    padding: 0,
  },
  navButtonTextStyle: {
    fontSize: helpers.normalize(14),
    fontWeight: '600',
    color: '#ffffff',
    alignSelf: 'center',
    paddingHorizontal: helpers.normalize(8),
    includeFontPadding: false,
  },
});
