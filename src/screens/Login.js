import React, { useEffect, useState } from 'react';
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
import { loginRequest } from '../redux/reducer/AuthReducer';
import FormHeader from '../components/FormHeader';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '../components/CheckBox';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { regex } from '../utils/helpers/regex';

import constants from '../utils/helpers/constants';

let status = '';

const Login = props => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isSelected, setisSelected] = useState(false);
  const [isSecure, setSecure] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();



  function loginFun() {
    
    if (email?.trim() == '' || email == null) {
      CustomToast('Email is required');
      return false;
    }
    if (regex.EMAIL.test(email) === false) {
      CustomToast('Please enter valid email');
      return false;
    }
    if (password?.trim() == '' || password == null) {
      CustomToast('password is required');
      return false;
    }

    let obj = {
      email: email,
      password: password,
      isRemember: isSelected
    };
    dispatch(loginRequest(obj));
  }
  if (status === '' || AuthReducer.status !== status) {
    switch (AuthReducer.status) {
      case 'Auth/loginRequest':
        status = AuthReducer.status;
        setIsApiCall(true);
        break;
      case 'Auth/loginSuccess':
        status = AuthReducer.status;
        setIsApiCall(false);
        break;
      case 'Auth/emailExistSuccess':
        status = AuthReducer.status;
        setIsApiCall(false);
        props.navigation.navigate('VerifyOtp', {
          email: email,
          otpExpireTime: AuthReducer?.emailExitRes?.data.emailOTPExpire
        })
        break;
      case 'Auth/loginFailure':
        status = AuthReducer.status;
        setIsApiCall(false);
        break;
    }
  }

  const readData = async () => {
    try {
      const uEmail = await AsyncStorage.getItem('uEmail');
      const uPass = await AsyncStorage.getItem('uPass');
      setEmail(uEmail)
      setPassword(uPass)
      console.log('fetch the input from storage', uEmail, uPass);
      if (uEmail != null) {
        setisSelected(true)
      }

    } catch (e) {
      console.log('Failed to fetch the input from storage');
      setisSelected(false)
    }
  };

  useEffect(() => {
    readData();
  }, []);

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
                <ScrollView
                  style={[styles.flexContainer, styles.borderRadius30]}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentCenter}>
                  <FormHeader
                    title="Welcome Back"
                    subTitle="Please sign in to your account"
                    isSocialBtn={true}
                    {...props}
                    marginBottom={normalize(0)}
                    type='login'
                  />

                  <CustomInput
                    icon={Icons.email}
                    placeholderText={'Email Address'}
                    value={email}
                    onChangeText={val => {
                      setEmail(val);
                    }}
                    marginBottom={normalize(10)}
                  />
                  <CustomInput
                    icon={Icons.lock}
                    placeholderText={'Password'}
                    value={password}
                    onChangeText={val => {
                      setPassword(val);
                    }}
                    secureTextEntry={isSecure}
                    isSecureShow
                    onPress={() => {
                      setSecure(!isSecure);
                    }}
                    marginBottom={normalize(10)}
                  />

                  <View style={[styles.rowContainer, styles.rowSpace]}>
                    <CheckBox
                      onChange={value => setisSelected(value)}
                      active={isSelected}
                      text="Remember Me"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        props?.navigation.navigate('ForgotPassword');
                      }}>
                      <Text style={styles.actionText}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                  <CustomButton
                    btnText={isApiCall ? 'signing in...' : "SIGN IN"}
                    btnBg={Colors.btnBlue}
                    marginTop={normalize(20)}
                    onPress={() => {
                      // props?.navigation.navigate('BottomTab');
                      isApiCall ? null : loginFun()
                    }}
                  />

                  <View
                    style={[
                      styles.rowContainer,
                      styles.rowCenter,
                      { marginTop: normalize(10) },
                    ]}>
                    <Text style={styles.questionText}>
                      Don’t have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        props?.navigation.navigate('Signup');
                      }}>
                      <Text style={[styles.actionText, styles.underlineText]}>
                        Sign up
                      </Text>
                    </TouchableOpacity>
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
    paddingVertical: normalize(10),
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
  questionText: {
    color: '#FFF',
    fontSize: normalize(12),
    fontFamily: Fonts.robotoMedium,
    marginRight: normalize(5),
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});

export default Login;
