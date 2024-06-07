import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomInput from '../components/CustomInput';
import CustomToast from '../utils/helpers/CustomToast';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordReq, loginRequest } from '../redux/reducer/AuthReducer';
import FormHeader from '../components/FormHeader';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '../components/CheckBox';
import CustomButton from '../components/CustomButton';
import { regex } from '../utils/helpers/regex';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
let status = '';
const ForgotPassword = props => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [isApiCall, setIsApiCall] = useState(false);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();


  if (status === '' || AuthReducer.status !== status) {
    switch (AuthReducer.status) {
      case 'Auth/forgotPasswordReq':
        status = AuthReducer.status;
        setIsApiCall(true);
        break;
      case 'Auth/forgotPasswordSucces':
        status = AuthReducer.status;
        setIsApiCall(false);
        props?.navigation.navigate('VerifyOtp', {
          email: email,
          forgotOtp: true,
          otpExpireTime: AuthReducer?.forgotPasswordRes?.data?.emailOTPExpire
        });
        break;
      case 'Auth/forgotPasswordFailure':
        status = AuthReducer.status;
        setIsApiCall(false);
        break;
    }
  }


  const handleSendOtp = () => {
    if (email == '') {
      CustomToast('Email is required');
      return false;
    }
    if (regex.EMAIL.test(email) === false) {
      CustomToast('Please enter valid email');
      return false;
    }
    let obj ={
      email: email
    }
    dispatch(forgotPasswordReq(obj))
  }
  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Colors.blue}
        {...props}
        barStyle={'light-content'}
      />
      <ImageBackground
        style={{ height: '100%', width: '100%' }}
        resizeMode="stretch"
        source={Images.splash}>
        <SafeAreaView style={styles.SafeAreaView}>
          <View style={css.mainPage}>
            <KeyboardAwareScrollView
            scrollEnabled={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1
            }}
              behavior={Platform.OS == 'ios' ? 'position' : null}>
              <ImageBackground
                style={styles.mainContainer}
                resizeMode="stretch"
                source={Images.mainContainer}>
                <TouchableOpacity
                  style={styles.crossIconWrapper}
                  onPress={() => {
                    props.navigation.goBack();
                  }}>
                  <Image source={Icons.crossIcon} style={styles.crossIcon} />
                </TouchableOpacity>
                <ScrollView
                  style={[styles.flexContainer]}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentCenter}>
                  <FormHeader
                    title="Forgot Password"
                    subTitle="Lorem Ipsum is simply dummy"
                    isSocialBtn={false}
                    {...props}
                    marginBottom={normalize(20)}
                  />

                  <CustomInput
                    icon={Icons.email}
                    placeholderText={'Email Address'}
                    value={email}
                    onChangeText={val => {
                      setEmail(val);
                    }}
                    marginBottom={normalize(20)}
                  />

                  <CustomButton
                    btnText={isApiCall ? 'SENDING..' : "SEND"}
                    btnBg={Colors.btnBlue}
                    onPress={() => {
                      isApiCall ? null : handleSendOtp()
                      // props?.navigation.navigate('VerifyOtp');
                    }}
                  />

                  <View
                    style={[
                      styles.rowContainer,
                      styles.rowCenter,
                      { marginTop: normalize(20) },
                    ]}>
                    <Text style={styles.instructionText}>
                      Enter your registered email above {'\n'} to receive
                      password reset instructions
                    </Text>
                  </View>
                </ScrollView>
              </ImageBackground>
            </KeyboardAwareScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    maxHeight: Sizes.height - normalize(100),
    width: '100%',
    borderRadius: normalize(30),
    paddingVertical: normalize(10),
  },
  mainPage: {
    height: Sizes.height - normalize(100),
    width: Sizes.width - normalize(40),
    borderRadius: normalize(30),
    justifyContent: 'center',
  },
  flexContainer: {
    // flex: 1,
    width: '100%',
  },
  contentCenter: {
    paddingHorizontal: normalize(20),
    paddingTop: normalize(40),
    paddingBottom: normalize(25),
  },
  borderRadius30: {
    borderRadius: normalize(30),
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpace: {
    justifyContent: 'space-between',
  },
  rowCenter: {
    justifyContent: 'center',
  },
  actionText: {
    color: Colors.actionText,
    fontSize: normalize(12),
    fontFamily: Fonts.robotoMedium,
  },
  instructionText: {
    color: '#FFF',
    fontSize: normalize(12),
    fontFamily: Fonts.robotoMedium,
    marginRight: normalize(5),
    textAlign: 'center',
    lineHeight: normalize(18),
    paddingHorizontal: normalize(10),
  },
  crossIcon: {
    height: normalize(15),
    width: normalize(15),
    resizeMode: 'contain',
  },
  crossIconWrapper: {
    padding: normalize(10),
    paddingBottom: 0,
    position: 'absolute',
    right: 0,
    zIndex: 9999
  },
});

export default ForgotPassword;
