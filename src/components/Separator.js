import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts, Colors, Icons, Sizes, Cs} from '../themes/Themes';

const Separator = props => {
  return <View style={[styles.dividerStyle, props.dividerStyle]} />;
};

export default Separator;

const styles = StyleSheet.create({
  dividerStyle: {
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    flex: 1,
    marginVertical: 16,
    opacity: 0.5,
  },
});
