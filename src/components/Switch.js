import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import normalize from '../utils/helpers/normalize';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated
} from 'react-native';

export default function Switch(props) {
  const animValue = useRef(new Animated.Value(1)).current;
  const animText = useRef(new Animated.Value(1)).current;
  const [hideText, setHideText] = useState(false);
  const checked = () => {
    Animated.timing(animValue, {
      toValue: normalize(9),
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(animText, {
      toValue: normalize(12),
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const unChecked = () => {
    Animated.timing(animValue, {
      toValue: normalize(-9),
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(animText, {
      toValue: normalize(22),
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (props.active == true) {
      checked();
      setHideText(props?.activeTxt);
    } else {
      unChecked();
      setHideText(props?.inActiveTxt);
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
          props.active == false
            ? {
              backgroundColor: '#613D94',
              // borderColor: '#E8E5F1',
              // borderWidth: normalize(1),
            }
            : null,
        ]}>

        <Animated.Text
          style={{
            transform: [{ translateX: animText }],
            fontSize: normalize(10),
          }}>
          {hideText}
        </Animated.Text>
        <Animated.View
          style={[
            style.innerRound,
            props.active == false ? { backgroundColor: '#AAAFB4' } : null,
            { transform: [{ translateX: animValue }] },
          ]}></Animated.View>
      </View>
    </TouchableOpacity>
  );
}
Switch.propTypes = {
  onChange: PropTypes.func,
  active: PropTypes.bool,
};
Switch.defaultProps = {
  onChange: () => { },
  active: false,
};
const style = StyleSheet.create({
  container: {
    display: 'flex',
  },
  round: {
    height: normalize(15),
    width: normalize(35),
    // backgroundColor: Colors.themeBlue,
    backgroundColor: "#613D94",
    borderRadius: normalize(32),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerRound: {
    height: normalize(14),
    width: normalize(14),
    borderRadius: normalize(32),
    backgroundColor: Colors.themeBlue,
  },
});
