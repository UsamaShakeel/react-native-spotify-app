import {Dimensions, PixelRatio} from 'react-native';
import base64 from 'react-native-base64';
import moment from 'moment';

const helpers = {
  normalize: size => {
    const scale = Dimensions.get('window').width / 375;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  },
  wp: value => {
    return (Dimensions.get('window').width * value) / 100;
  },
  hp: value => {
    return (Dimensions.get('window').height * value) / 100;
  },
  getQueryParams: qs => {
    qs = qs.split('+').join(' ');
    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;
    while ((tokens = re.exec(qs))) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
  },
  encodeBase64: input => {
    return base64.encode(input);
  },
  msToTime: s => {
    if (s === 0) {
      return 'Not Set';
    } else {
      let date = moment(new Date(s));
      return date.format('hh:mm:ss');
    }
  },
};

export default helpers;
