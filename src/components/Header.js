import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import LinearGradient from 'react-native-linear-gradient';

const Header = props => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#1c1854', '#191852', '#1c2c5f']} style={[styles.cardHEader, css.rowBetween]}>
      <TouchableOpacity onPress={() => props?.isBackPress ? props?.backPress() : props?.navigation.goBack()}>
        {props?.showBackArrow ? (
          <Image source={Icons.backArrow} style={[styles.backArrow]} />
        ) : (
          // <Image source={Icons.crossIcon} style={[styles.crossIcon]} />
          null
        )}
      </TouchableOpacity>
      <Text style={[styles.headerText]}>{props.title}</Text>

      {props?.hideMenu ? (
        <TouchableOpacity style={[styles.menuIcon]} onPress={props.onPress}>
          {/* <Image source={Icons.menuIcon} style={[styles.menuIcon]} /> */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={props.onPress}>
          <Image source={Icons.menuIcon} style={[styles.menuIcon]} />
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

export default Header;

const styles = StyleSheet.create({
  crossIcon: {
    width: normalize(20),
    height: normalize(20),
    resizeMode: 'contain',
  },
  backArrow: {
    width: normalize(24),
    height: normalize(24),
    resizeMode: 'contain',
  },
  menuIcon: {
    width: normalize(25),
    height: normalize(25),
    resizeMode: 'contain',
  },
  headerText: {
    color: '#fff',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(11),
  },
  // cardHEader: {
  //   marginBottom: normalize(10),
  //   marginTop: normalize(-5),
  // },

  cardHEader: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
  },
});
