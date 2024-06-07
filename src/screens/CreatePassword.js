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
import { loginRequest, resetPasswordReq } from '../redux/reducer/AuthReducer';
import FormHeader from '../components/FormHeader';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '../components/CheckBox';
import CustomButton from '../components/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
let status = '';
const CreatePassword = props => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isSelected, setisSelected] = useState(false);
  const [isSecure, setSecure] = useState(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function resetPasswordFun() {
    if (newPassword == '') {
      CustomToast('New password is required');
      return false;
    }
    if (newPassword?.length <6) {
      CustomToast('Password must be greater than 6 character');
      return false;
    }

    if (password == '') {
      CustomToast('Confirm password is required');
      return false;
    }
    if (password != newPassword) {
      CustomToast('Two password does not match');
      return false;
    }


    let obj = {
      password: newPassword,
      confirm_password: password,
      user_id: props?.route?.params?.userId
    };
    dispatch(resetPasswordReq(obj));
  }

  if (status === '' || AuthReducer.status !== status) {
    switch (AuthReducer.status) {
      case 'Auth/resetPasswordReq':
        status = AuthReducer.status;
        setIsApiCall(true);
        break;
      case 'Auth/resetPasswordSucces':
        status = AuthReducer.status;
        setIsApiCall(false);
        props?.navigation.navigate('Login');
        break;
      case 'Auth/resetPasswordFailure':
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
             scrollEnabled
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
                    title="Reset Password"
                    subTitle={`Your new password must be different\nfrom previously used passwords`}
                    isSocialBtn={false}
                    {...props}
                    marginBottom={normalize(20)}
                  />

                  <CustomInput
                    icon={Icons.lock}
                    placeholderText={'New Password'}
                    secureTextEntry={isSecure}
                    onChangeText={val => {
                      setNewPassword(val);
                    }}
                    value={newPassword}
                    isSecureShow
                    onPress={() => {
                      setSecure(!isSecure);
                    }}
                    marginBottom={normalize(20)}
                  />
                  <CustomInput
                    icon={Icons.lock}
                    placeholderText={'Confirm Password'}
                    value={password}
                    onChangeText={val => {
                      setPassword(val);
                    }}
                    secureTextEntry={isSecureConfirm}
                    isSecureShow
                    onPress={() => {
                      setIsSecureConfirm(!isSecureConfirm);
                    }}
                    marginBottom={normalize(20)}
                  />

                  <CustomButton
                    btnText={isApiCall ? 'Processing..' : "RESET PASSWORD"}
                    btnBg={Colors.btnBlue}
                    onPress={() => {

                      isApiCall ? null : resetPasswordFun()
                    }}
                  />
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
  questionText: {
    color: '#FFF',
    fontSize: normalize(12),
    fontFamily: Fonts.robotoMedium,
    marginRight: normalize(5),
  },
});

export default CreatePassword;
