import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Fonts, Colors, Icons, Sizes, css, M_Icons} from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import LinearGradient from 'react-native-linear-gradient';

const NumberInput = props => {
  return (
    <View style={props.containerStyle}>
      {props.title ? (
        <Text style={[styles.titleStyle, props.titleStyle]}>{props.title}</Text>
      ) : null}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#4b4190', '#614799', '#623d95']}
        style={[styles.linearGradient, props.gradientStyle]}>
        {props.leftIcon ? (
          <Image
            source={props.leftIcon}
            style={[styles.leftIconStyle, props.leftIconStyle]}
          />
        ) : null}
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
          style={[styles.inputStyle, props.inputStyle]}
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType="numeric"
        />

        <View>
          <TouchableOpacity onPress={props.onPressUp}>
            <Image
              source={M_Icons.toggleUp}
              style={[styles.toggleIconStyle, props.toggleIconStyle, css.mb1]}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={props.onPressDown}>
            <Image
              source={M_Icons.toggleDown}
              style={[styles.toggleIconStyle, props.toggleIconStyle]}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  titleStyle: {
    color: '#fff',
    fontFamily: Fonts.robotoMedium,
    fontSize: Platform.OS === 'android' ? normalize(14) : normalize(12),
    marginBottom: normalize(10),
  },
  inputStyle: {
    height: normalize(40),
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#FFFF',
    padding: 0,
    borderRadius: normalize(10),
    flex: 1,
  },
  linearGradient: {
    paddingHorizontal: normalize(15),
    borderRadius: normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(10),
  },
  toggleIconStyle: {
    width: normalize(7),
    height: normalize(7),
    marginLeft: 5,
    resizeMode: 'contain',
  },
});
