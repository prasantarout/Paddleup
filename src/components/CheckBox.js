import React, {useState, useRef, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, Animated} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/normalize';
import { Colors, Fonts } from '../themes/Themes';

export default function CheckBox(props) {
  const animValue = useRef(new Animated.Value(1)).current;
  const checked = () => {
    Animated.timing(animValue, {
      toValue: normalize(23),
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const unChecked = () => {
    Animated.timing(animValue, {
      toValue: normalize(3),
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (props.active == true) {
      checked();
    } else {
      unChecked();
    }
  }, [props.active]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        props.onChange(!props.active);
      }}
      style={style.container}>
      <View
        style={[
          style.round,
        ]}>
        <Animated.View
          style={[
            style.innerRound,
            props.active == false ? {backgroundColor: '#AAAFB4'} : null,
            {transform: [{translateX: animValue}]},
          ]}>
        
        </Animated.View>
      </View>
      <Text style={style.text}>{props?.text}</Text>
    </TouchableOpacity>
  );
}
CheckBox.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.bool,
};
CheckBox.defaultProps = {
  onChange: () => {},
  active: false,
};
const style = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  round: {
    height: normalize(15),
    width: normalize(35),
    backgroundColor: '#648bc8',
    borderRadius: normalize(32),
    display: 'flex',
    justifyContent: 'center',
  },
  innerRound: {
    height: normalize(10),
    width: normalize(10),
    borderRadius: normalize(32),
    backgroundColor: Colors.themeBlue,
  },
  text:{
    color:'#FFF',
    fontSize:normalize(10),
    marginLeft: normalize(5),
    fontFamily:Fonts.robotoMedium
  }
});
