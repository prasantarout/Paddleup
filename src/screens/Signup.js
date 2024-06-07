import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomInput from '../components/CustomInput';
import CustomToast from '../utils/helpers/CustomToast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, userRegisterReq } from '../redux/reducer/AuthReducer';
import FormHeader from '../components/FormHeader';
import CustomButton from '../components/CustomButton';
import { regex } from '../utils/helpers/regex';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
let status = '';
const Signup = props => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isSelected, setisSelected] = useState(false);
  const [isSecure, setSecure] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  function signupFunction() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;


    if (firstName?.trim() == '') {
      CustomToast('First Name is required');
      return false;
    }
    if (regex.WORD.test(firstName) == false) {
      CustomToast('Enter valid First Name');
      return false;
    }

    if (lastName?.trim() == '') {
      CustomToast('Last Name is required');
      return false;
    }
    if (regex.WORD.test(lastName) == false) {
      CustomToast('Enter valid Last Name');
      return false;
    }
    if (email?.trim() == '') {
      CustomToast('Email is required');
      return false;
    }
    if (reg.test(email) === false) {
      CustomToast('Please enter valid email');
      return false;
    }
    if (password == '') {
      CustomToast('Password is required');
      return false;
    }
    if (password?.length < 6) {
      CustomToast('Password must be greater than 6 character');
      return false;
    }

    let obj = {
      email: email,
      password: password,
      full_name: `${firstName} ${lastName}`
    };

    dispatch(userRegisterReq(obj));
  }

  if (status === '' || AuthReducer.status !== status) {
    switch (AuthReducer.status) {
      case 'Auth/userRegisterReq':
        status = AuthReducer.status;
        setIsApiCall(true);
        break;
      case 'Auth/userRegisterSucces':
        status = AuthReducer.status;
        setIsApiCall(false);
        props.navigation.navigate('VerifyOtp', {
          email: email,
          otpExpireTime: AuthReducer?.userRegisterRes?.data?.emailOTPExpire
        })
        break;
      case 'Auth/userRegisterFailure':
        status = AuthReducer.status;
        setIsApiCall(false);
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
                <ScrollView
                  style={[styles.flexContainer, styles.borderRadius30]}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentStyle}>
                  <FormHeader
                    title="Create Account"
                    subTitle="Please create your account"
                    isSocialBtn={true}
                    {...props}
                    marginBottom={normalize(10)}
                    type='signup'
                  />

                  <CustomInput
                    icon={Icons.fullname}
                    placeholderText={'First Name'}
                    value={firstName}
                    onChangeText={val => {
                      setFirstName(val);
                    }}
                    marginBottom={normalize(10)}
                  />

                  <CustomInput
                    icon={Icons.fullname}
                    placeholderText={'Last Name'}
                    value={lastName}
                    onChangeText={val => {
                      setLastName(val);
                    }}
                    marginBottom={normalize(10)}
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

                  <CustomButton
                    btnText={isApiCall ? "PROCESSING..." : "SIGN UP"}
                    btnBg={Colors.btnBlue}
                    onPress={() => {
                      // props?.navigation.navigate('BottomTab');
                      isApiCall ? null : signupFunction()
                    }}
                  />

                  <View
                    style={[
                      styles.rowContainer,
                      styles.rowCenter,
                      { marginTop: normalize(10) },
                    ]}>
                    <Text style={styles.questionText}>Have an account?</Text>
                    <TouchableOpacity
                      onPress={() => {
                        props?.navigation.navigate('Login');
                      }}>
                      <Text style={[styles.actionText, styles.underlineText]}>
                        Sign in
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
  contentStyle: {
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

export default Signup;
