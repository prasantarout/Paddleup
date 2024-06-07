import {StyleSheet, Text, View, TextInput, Platform, Image, Pressable} from 'react-native';
import React from 'react';
import {Fonts, Colors, Icons, Sizes, Cs} from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Input = props => {
//  console.log(">>",props.onPress)
  return (
    <View style={[props.containerStyle]}>
      {props.title ? (
        <Text style={[styles.titleStyle, props.titleStyle]}>{props.title}</Text>
      ) : null}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={props.flag==1 ? ['#fff','#fff','#fff']:['#4b4190', '#614799', '#623d95']}
        style={[styles.linearGradient, props.inputWrapper]}>
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
          secureTextEntry={props?.secureTextEntry}
          onChangeText={props.onChangeText}
          multiline={props?.multiline}
          textAlignVertical={props?.textAlignVertical}
          fontFamily={Fonts.robotoMedium}
          fontSize={normalize(13)}
          editable={props?.isEditable}
        />
        {props.rightIcon ? (
          <Pressable
            onPress={() => {
              props.isPressableRightIcon ? props?.onPress() : null;
            }}>
            <Image
              source={props.rightIcon}
              style={[styles.rightIconStyle, props.rightIconStyle]}
            />
          </Pressable>
        ) : null}
      </LinearGradient>
    </View>
  );
};

export default Input;

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
    padding:0,
    // paddingVertical: normalize(10),
    borderRadius: normalize(10),
    flex: 1,
   
  },
  linearGradient: {
    paddingHorizontal: normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(10),
  },
  rightIconStyle: {
    width: normalize(15),
    height: normalize(15),
    marginLeft: 5,
    resizeMode: 'contain',
  },
  leftIconStyle: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'contain',
    marginRight: normalize(10),
  },
});
