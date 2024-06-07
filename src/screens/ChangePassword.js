import React, { useCallback, useEffect, useState } from 'react';
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
  Keyboard,
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomInput from '../components/CustomInput';
import CustomToast from '../utils/helpers/CustomToast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../redux/reducer/ProfileReducer';
import FormHeader from '../components/FormHeader';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '../components/CheckBox';
import CustomButton from '../components/CustomButton';
import Footer from '../components/Footer';
import { useFocusEffect } from '@react-navigation/native';
import ProfileReducer, { changePassswordReq } from '../redux/reducer/ProfileReducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
let status = '';
const ChangePassword = props => {
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isSelected, setisSelected] = useState(false);
  const [isSecure, setSecure] = useState(true);
  const [isSecureConfirm, setIsSecureConfirm] = useState(true);
  const [isSecureOld, setIsSecureOld] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [orientation, setOrientation] = useState("PORTRAIT");
  useFocusEffect(
    useCallback(() => {
      if (Dimensions.get('window').width < Dimensions.get('window')?.height) {
        setOrientation("PORTRAIT")
      } else {
        setOrientation("LANDSCAPE")

      }
      const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
        if (width < height) {
          setOrientation("PORTRAIT")
        } else {
          setOrientation("LANDSCAPE")

        }
        return () => subscription?.remove();
      });
    })
  )
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        console.log('open');
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        console.log('closed');
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const dispatch = useDispatch();
  function changePasswordHandle() {


    if (oldPassword == '') {
      CustomToast('Old password is required');
      return false;
    }

    if (newPassword == '') {
      CustomToast('New password is required');
      return false;
    }
    if (newPassword?.length <6) {
      CustomToast('Password must be 6 character long');
      return false;
    }

    if (password == '') {
      CustomToast('Confirm password is required');
      return false;
    }
    if (newPassword != password) {
      CustomToast('Two password does not match');
      return false;
    }

    let obj = {
      old_password: oldPassword,
      new_password: newPassword,
    };
    dispatch(changePassswordReq(obj));
  }

  if (status === '' || ProfileReducer.status !== status) {

    console.log( ProfileReducer.status, ' ProfileReducer.status ProfileReducer.status')
    switch (ProfileReducer.status) {
      case 'Profile/changePassswordReq':
        status = ProfileReducer.status;
        setIsApiCall(true);
        break;
      case 'Profile/changePassswordSucces':
        status = ProfileReducer.status;
        setIsApiCall(false);
        props?.navigation.navigate('EditProfile');
        break;
      case 'Profile/changePassswordFailure':
        status = ProfileReducer.status;
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
          <View style={[css.mainScreen]}>
            <KeyboardAwareScrollView 
             contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1
            }}
            scrollEnabled={isKeyboardVisible}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
              behavior={Platform.OS == 'ios' ? 'position' : null}>
              <ImageBackground
                style={[css.mainContainer, { paddingBottom: normalize(20) }]}
                resizeMode="stretch"
                source={Images.bg2}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#1c1854', '#191852', '#1c2c5f']}
                  style={styles.screenHeader}>
                  <View
                    style={[
                      styles.rowContainer,
                      styles.contentSpaceBetween,
                      css.mt1,
                      css.mb2,
                    ]}>
                    <TouchableOpacity
                      style={styles.backArrowWrapper}
                      onPress={() => {
                        props.navigation.goBack();
                      }}>
                      <Image
                        source={Icons.backArrow}
                        style={styles.backArrow}
                      />
                    </TouchableOpacity>
                    <Text style={styles.screenTitle}>Change Password</Text>
                    <TouchableOpacity
                      style={styles.saveActionText}
                      onPress={() => {
                        // props?.navigation.navigate('Profile')
                      }}>
                      {/* <Text style={styles.saveActionText}>Save</Text> */}
                    </TouchableOpacity>
                  </View>
                </LinearGradient>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={css.mt4}
                  contentContainerStyle={{
                    paddingHorizontal: normalize(20),
                    paddingBottom:
                      isKeyboardVisible === true
                        ? Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(100) : normalize(200)) : normalize(350)
                        : Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(60) : normalize(360)) : normalize(100),
                  }}>
                  <FormHeader
                    title="Change Password"
                    subTitle={`Your new password must be different\nfrom previously used passwords`}
                    isSocialBtn={false}
                    {...props}
                    marginBottom={normalize(20)}
                  />

                  <CustomInput
                    icon={Icons.lock}
                    placeholderText={'Old Password'}
                    secureTextEntry={isSecureOld}
                    onChangeText={val => {
                      setOldPassword(val);

                    }}
                    value={oldPassword}
                    isSecureShow
                    onPress={() => {
                      setIsSecureOld(!isSecureOld);
                    }}
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
                    btnText="CHANGE PASSWORD"
                    btnBg={Colors.btnBlue}
                    onPress={() => {
                      changePasswordHandle()
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

  screenHeader: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(3),
  },
  menuIcon: {
    height: normalize(28),
    width: normalize(28),
    resizeMode: 'contain',
  },
  screenTitle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(14),
    color: '#FFFF',
  },
  bottomBorder: {
    width: '100%',
    height: normalize(1),
    backgroundColor: '#313370',
    marginTop: normalize(5),
    marginBottom: normalize(10),
  },
  actionText: {
    color: Colors.actionText,
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
    textDecorationLine: 'underline',
  },
  saveActionText: {
    color: Colors.themeBlue,
    fontSize: normalize(12),
    fontFamily: Fonts.robotoMedium,
  },
  headerText: {
    color: '#FFF',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
    textTransform: 'capitalize',
  },

  justifyContentCenter: {
    justifyContent: 'center',
  },

  contentSpaceBetween: {
    justifyContent: 'space-between',
  },

  backArrow: {
    height: normalize(28),
    width: normalize(28),
    resizeMode: 'contain',
    borderRadius: normalize(5),
  },
});

export default ChangePassword;
