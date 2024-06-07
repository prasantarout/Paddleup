import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { forgotOTPValidateReq, forgotPasswordReq, reSendOtpReq, verifyEmailReq } from '../redux/reducer/AuthReducer';
import FormHeader from '../components/FormHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
let status = '';
let current = () => { };
const VerifyOtp = props => {
  const [blureffect, setBlureffect] = useState(false);
  const [blureffect1, setBlureffect1] = useState(false);
  const [blureffect2, setBlureffect2] = useState(false);
  const [blureffect3, setBlureffect3] = useState(false);

  const [expireTime, setExpireTime] = useState(props?.route?.params?.otpExpireTime)
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isResendApi, setIsResendApi] = useState(false);

  const dispatch = useDispatch();
  function otpHandle() {
    if (pin1 == '' || pin2 == '' || pin3 == '' || pin4 == '') {
      CustomToast('OTP is required');
      return false;
    }
    let obj = {
      email: props?.route?.params?.email,
      emailOTP: `${pin1}${pin2}${pin3}${pin4}`,
    };
    let obj1 = {
      email: props?.route?.params?.email,
      otp: `${pin1}${pin2}${pin3}${pin4}`,
    };
    props?.route?.params?.forgotOtp ? dispatch(forgotOTPValidateReq(obj1)): dispatch(verifyEmailReq(obj));
  }

  const [timer, setTimer] = useState("")

  const secondPassed = () => {
    const nextDay = moment(expireTime).valueOf();
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
    let now3 = new Date().getTime(),
      distance = nextDay - now3;
    Math.floor(distance / day);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);
    minutes < 0 ? setTimer('Expired') : setTimer(minutes + ':' + seconds);
  }
  const resendOtpFunction = () => {
    let obj = {
      email: props?.route?.params?.email
    }
    console.log(props?.route?.params?.forgotOtp, 'lakdjlklk')
    props?.route?.params?.forgotOtp ? dispatch(forgotPasswordReq(obj)) : dispatch(reSendOtpReq(obj))
  }

  function startTimer() {
    current = setInterval(() => {
      secondPassed()
    }, 1000);
  }

  useEffect(() => {
    // setExpireTime(props?.route?.params?.otpExpireTime)
    if (expireTime != null) {
      startTimer();
    }
    return () => clearInterval(current); // cleanup
  }, [expireTime])

  if (status === '' || AuthReducer.status !== status) {

    switch (AuthReducer.status) {
      case 'Auth/verifyEmailReq':
        status = AuthReducer.status;
        setIsApiCall(true);
        break;
      case 'Auth/verifyEmailSucces':
        status = AuthReducer.status;
        setIsApiCall(false);
        props?.navigation.navigate('Login')
        break;
      case 'Auth/verifyEmailFailure':
        status = AuthReducer.status;
        setIsApiCall(false);
        break;
      case 'Auth/forgotOTPValidateReq':
        status = AuthReducer.status;
        setIsApiCall(true);
        break;
      case 'Auth/forgotOTPValidateSucces':
        status = AuthReducer.status;
        setIsApiCall(false);
        props?.navigation.navigate('CreatePassword', {
          userId: AuthReducer?.forgotOTPValidateRes?.data?._id
        })
        break;
      case 'Auth/forgotOTPValidateFailure':
        status = AuthReducer.status;
        setIsApiCall(false);
        break;
      case 'Auth/reSendOtpReq':
        status = AuthReducer.status;
        setIsResendApi(true);
        break;
      case 'Auth/reSendOtpSucces':
        status = AuthReducer.status;
        setExpireTime(AuthReducer?.reSendOtpRes?.data?.emailOTPExpire)
        setIsResendApi(false);
        break;
      case 'Auth/reSendOtpFailure':
        status = AuthReducer.status;
        setIsResendApi(false);
        break;
      case 'Auth/forgotPasswordReq':
        status = AuthReducer.status;
        setIsResendApi(true);
        break;
      case 'Auth/forgotPasswordSucces':
        status = AuthReducer.status;
        setExpireTime(AuthReducer?.forgotPasswordRes?.data.emailOTPExpire)
        console.log(expireTime,'expsdfsdsd fvgfg')
        setIsResendApi(false);
        break;
      case 'Auth/forgotPasswordFailure':
        status = AuthReducer.status;
        setIsResendApi(false);
        break;
    }
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
                  style={[styles.flexContainer, styles.borderRadius30]}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentCenter}>
                  <FormHeader
                    title="Check your email"
                    subTitle={`We have sent a verification code\nto your email address`}
                    isSocialBtn={false}
                    {...props}
                    marginBottom={normalize(20)}
                  />

                  <View style={styles.optWrapper}>

                    <LinearGradient
                      start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }}
                      style={styles.otpInputWrapper}
                      colors={['#423d8b', '#463e8d', '#4e4391']}
                    >
                      <TextInput
                        ref={inputRef1}
                        value={pin1}
                        keyboardType="numeric"
                        maxLength={1}
                        onBlur={() => {
                          setBlureffect(false);
                        }}
                        onChangeText={val => {
                          setPin1(val);
                          if (!pin1.length > 0) {
                            inputRef2.current.focus();
                          }
                        }}
                        onFocus={() => setBlureffect(true)}
                        style={styles.otpInput}
                      />

                    </LinearGradient>
                    <LinearGradient
                      start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }}
                      style={styles.otpInputWrapper}
                      colors={['#534493', '#5b4898', '#5b4697']}
                    >

                      <TextInput
                        keyboardType="numeric"
                        maxLength={1}
                        ref={inputRef2}
                        value={pin2}
                        onBlur={() => {
                          setBlureffect1(false);
                        }}
                        onFocus={() => setBlureffect1(true)}
                        onChangeText={val => {
                          setPin2(val);
                          if (!pin2.length > 0) {
                            inputRef3.current.focus();
                          } else {
                            inputRef1.current.focus();
                          }
                        }}
                        style={styles.otpInput}
                      />

                    </LinearGradient>
                    <LinearGradient
                      start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }}
                      style={styles.otpInputWrapper}
                      colors={['#604698', '#5f4397', '#5a3e92']}
                    >

                      <TextInput
                        keyboardType="numeric"
                        maxLength={1}
                        ref={inputRef3}
                        value={pin3}
                        onBlur={() => {
                          setBlureffect2(false);
                        }}
                        onFocus={() => setBlureffect2(true)}
                        onChangeText={val => {
                          setPin3(val);
                          if (!pin3.length > 0) {
                            inputRef4.current.focus();
                          } else {
                            inputRef2.current.focus();
                          }
                        }}
                        style={styles.otpInput}
                      />

                    </LinearGradient>
                    <LinearGradient
                      start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }}
                      style={styles.otpInputWrapper}
                      colors={['#5e4296', '#5e4296', '#5e4296']}
                    >

                      <TextInput
                        keyboardType="numeric"
                        maxLength={1}
                        ref={inputRef4}
                        value={pin4}
                        onBlur={() => {
                          setBlureffect3(false);
                        }}
                        onFocus={() => setBlureffect3(true)}
                        onChangeText={val => {
                          setPin4(val);
                          if (!pin4.length > 0) {
                            inputRef4.current.focus();
                          } else {
                            inputRef3.current.focus();
                          }
                        }}
                        style={styles.otpInput}
                      />

                    </LinearGradient>



                  </View>

                  <CustomButton
                    btnText={isApiCall ? 'verifying..' : "verify"}
                    btnBg={Colors.btnBlue}
                    onPress={() => {
                      // props?.navigation.navigate('CreatePassword');
                      isApiCall ? null : otpHandle()
                    }}
                  />
                  <View
                    style={[
                      styles.rowContainer,
                      styles.rowSpace,
                      { marginTop: normalize(20) },
                    ]}>
                    <Text style={styles.questionText}>
                      Code Expires In:{' '}
                      <Text style={styles.actionText}>
                        {/* {minutes}:{seconds} */}
                        {timer}
                      </Text>
                    </Text>
                    <TouchableOpacity onPress={() => {
                      resendOtpFunction()
                    }}>
                      <Text
                        style={[
                          styles.actionText,
                          {
                            textDecorationLine: 'underline',
                          },
                        ]}>
                        {isResendApi ? 'Sending...' : 'Resend Code'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Image style={styles.dashedLine} source={Images.dashedLine} />
                  <TouchableOpacity
                    style={[
                      styles.rowContainer,
                      styles.rowCenter,
                      { marginTop: normalize(20) },
                    ]}
                    onPress={() => {
                      props.navigation.goBack();
                    }}>
                    <Text style={styles.instructionText}>
                      Or try another email address
                    </Text>
                  </TouchableOpacity>
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
    textDecorationLine: 'underline',
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
    zIndex: 999
  },
  optWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    // marginTop: normalize(20),
    marginBottom: normalize(20),
    justifyContent: 'space-between',
    width: '100%',
  },
  otpInputWrapper: {
    height: normalize(55),
    width: '22%',
    backgroundColor: '#463f8e',
    borderRadius: normalize(8),
  },
  otpInput: {
    height: normalize(55),
    width: '100%',
    borderRadius: normalize(8),
    fontSize: normalize(22),
    color: '#FFF',
    textAlign: 'center'
  
  },
  questionText: {
    color: '#FFF',
    fontSize: normalize(12),
    fontFamily: Fonts.robotoMedium,
  },
  dashedLine: {
    height: normalize(2),
    resizeMode: 'contain',
    marginTop: normalize(15),
    marginBottom: normalize(0),
    resizeMode: 'contain',
    width: '100%',
  },
});

export default VerifyOtp;
