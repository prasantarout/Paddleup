import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Fonts } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';

const CustomButton = props => {

  return (
    <TouchableOpacity
      style={[
        styles.commonBtn,
        props.containerStyle,
        {
          marginTop: props?.marginTop ? props?.marginTop : 0,
          backgroundColor: props?.value1 === props.value2 ? Colors.themeBlue : 'grey',
        },
      ]}
      onPress={() => {
        props?.onPress();
      }}>
      <Text style={[styles.btnText, props.titleStyle]}>{props?.btnText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  commonBtn: {
    alignItems: 'center',
    padding: normalize(10),
    borderRadius: normalize(100),
  },
  btnText: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(14),
    color: '#000000',
    textTransform: 'uppercase',
  },
});

export default CustomButton;
