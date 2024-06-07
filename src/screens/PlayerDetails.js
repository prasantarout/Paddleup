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
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Dimensions,
  Alert,
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';
import Footer from '../components/Footer';
import { useFocusEffect } from '@react-navigation/native';
import constants from '../utils/helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { deletePlayerReq } from '../redux/reducer/CmsReducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


let status = ''
const PlayerDetails = props => {

  const dispatch = useDispatch()

  const CmsReducer = useSelector(state => state.CmsReducer)

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [orientation, setOrientation] = useState("PORTRAIT");
  useFocusEffect(
    useCallback(() => {
      if (Dimensions.get('window').width < Dimensions.get('window')?.height) {
        setOrientation("PORTRAIT")
      } else {
        setOrientation("LANDSCAPE")

      }
      Dimensions.addEventListener('change', ({ window: { width, height } }) => {
        if (width < height) {
          setOrientation("PORTRAIT")
        } else {
          setOrientation("LANDSCAPE")

        }
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


  if (status === '' || CmsReducer.status !== status) {
    switch (CmsReducer.status) {
      case 'CMS/deletePlayerReq':
        status = CmsReducer.status;
        setIsApiCall(true)
        break;
      case 'CMS/deletePlayerSucces':
        status = CmsReducer.status;
        setIsApiCall(false)
        props?.navigation.navigate('PlayerTeams');
        break;
      case 'CMS/deletePlayerFailure':
        status = CmsReducer.status;
        setIsApiCall(false)
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
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={css.mainScreen}>
          <KeyboardAwareScrollView
            scrollEnabled={isKeyboardVisible}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            behavior={'position'}
            keyboardVerticalOffset={-250}
            style={{ flex: 1 }}>
            <ImageBackground
              style={[css.mainContainer, { paddingBottom: normalize(50) }]}
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
                    styles.contentCenter,
                    styles.contentSpaceBetween,
                    // css.mt1,
                    // css.mb2,
                  ]}>
                  <TouchableOpacity
                    style={styles.backArrowWrapper}
                    onPress={() => {
                      props.navigation.goBack();
                    }}>
                    <Image source={Icons.backArrow} style={styles.backArrow} />
                  </TouchableOpacity>

                  {
                    !props?.route?.params?.userData?.self && (
                      <>
                        <Text style={styles.screenTitle}>Delete Player</Text>
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() => {
                            isApiCall ? null :
                              Alert.alert('PaddleTapp', 'Are you sure want to delete', [
                                {
                                  text: 'Cancel',
                                  onPress: () => {
                                    console.log('OK Pressed');
                                  },
                                  style: 'destructive',
                                },
                                {
                                  text: 'Yes',
                                  onPress: () => {
                                    let obj = {
                                      email: props?.route?.params.userData?.email
                                    }
                                    dispatch(deletePlayerReq(obj))
                                  },
                                  style: 'default',
                                },
                              ]);

                          }}>
                          <Text style={styles.saveActionText}>
                            {isApiCall ? 'Wait...' : 'Delete'}

                          </Text>
                        </TouchableOpacity>
                      </>

                    )
                  }
                </View>
              </LinearGradient>

              <ScrollView
                style={[styles.flexContainer]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom:
                    isKeyboardVisible === true
                      ? normalize(340)
                      : Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(20) : normalize(310)) : normalize(100),
                  paddingHorizontal: normalize(20)
                }}>
                <View
                  style={[
                    styles.userInfo,
                    styles.rowContainer,
                    styles.justifyContentCenter,
                    styles.contentCenter,
                  ]}>
                  <Image style={styles.userProfile}

                    source={
                      props?.route?.params.userData?.profile_pic ? { uri: `${constants.Media_Url}/uploads/user/profile_pic/${props?.route?.params.userData?.profile_pic}` }
                        : Images.noUser

                    } />
                </View>
                <View style={[styles.bottomBorder, css.mb3]} />
                <Input
                  title="Full Name"
                  leftIcon={M_Icons.user}
                  placeholder="Full Name"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={props?.route?.params.userData?.full_name}
                  titleStyle={styles.titleStyle}
                  isEditable={false}
                />
                <Input
                  title="PaddleTapp ID"
                  // leftIcon={M_Icons.user}
                  placeholder="PT-4566"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={props?.route?.params.userData?.paddletap_id}
                  titleStyle={styles.titleStyle}
                  isEditable={false}
                />

                <Input
                  title="Self-Rating"
                  placeholder="Self-Rating"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={props?.route?.params.userData?.self_rating ? props?.route?.params.userData?.self_rating : '0.0'}
                  titleStyle={styles.titleStyle}
                  rightIcon={Icons.expandedDown}
                  isEditable={false}
                />
                <Input
                  title="My Hometown"
                  placeholder="My Hometown"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={props?.route?.params.userData?.city}
                  titleStyle={styles.titleStyle}
                  isEditable={false}
                />
                {/* <Input
                  title="Email Address"
                  leftIcon={Icons.email}
                  placeholder="Email Address"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value="johnmorrison@gmail.com"
                  titleStyle={styles.titleStyle}
                /> */}
              </ScrollView>
            </ImageBackground>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: Colors.blue,
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

  borderRadius30: {
    borderRadius: normalize(30),
  },
  backArrow: {
    height: normalize(28),
    width: normalize(28),
    resizeMode: 'contain',
    borderRadius: normalize(5),
  },
  rowContainer: {
    flexDirection: 'row',
  },
  contentCenter: {
    alignItems: 'center',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },

  contentSpaceBetween: {
    justifyContent: 'space-between',
  },
  screenHeader: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(7),
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
  },
  actionText: {
    color: Colors.actionText,
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
    textDecorationLine: 'underline',
  },
  saveActionText: {
    color: Colors.btnPink,
    fontSize: normalize(12),
    fontFamily: Fonts.robotoMedium,
  },
  headerText: {
    color: '#FFF',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
    textTransform: 'capitalize',
  },
  w100Percent: {
    width: '100%',
  },
  ph10: {
    paddingHorizontal: normalize(10),
  },
  pv15: {
    paddingVertical: normalize(15),
  },
  linearGradient: {
    paddingHorizontal: normalize(10),
    borderRadius: normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(10),
    width: '100%',
    paddingVertical: normalize(12),
    marginBottom: normalize(10),
  },
  batIcon: {
    height: normalize(38),
    width: normalize(42),
    resizeMode: 'contain',
  },
  gameTitle: {
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(14),
    marginBottom: normalize(5),
    textTransform: 'uppercase',
  },
  calander: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: 'contain',
  },
  linkIcon: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: 'contain',
  },
  gameDate: {
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(10),
  },
  flex1: {
    flex: 1,
  },
  btnContainer: {
    marginTop: normalize(20),
    marginBottom: normalize(20),
  },
  modalWrap: {
    padding: normalize(10),
    borderRadius: normalize(5),
    resizeMode: 'stretch',
  },

  navText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: normalize(14),
    fontFamily: Fonts.robotoMedium,
  },
  dashedLine: {
    height: normalize(2),
    resizeMode: 'contain',
    marginTop: normalize(20),
    marginBottom: normalize(15),
    resizeMode: 'contain',
    width: '80%',
    alignSelf: 'center',
  },
  crossIcon: {
    height: normalize(15),
    width: normalize(15),
    resizeMode: 'contain',
  },
  crossIconWrapper: {
    alignItems: 'flex-end',
    paddingBottom: 0,
  },

  paddleupLogo: {
    height: normalize(35),
    width: normalize(35),
    resizeMode: 'contain',
  },
  userProfile: {
    width: normalize(140),
    height: normalize(140),
    resizeMode: 'contain',
    borderWidth: normalize(6),
    borderColor: '#6c5e99',
    borderRadius: normalize(140) / 2,
  },
  userInfo: {
    alignSelf: 'center',
    paddingVertical: normalize(15),
  },

  profileName: {
    fontFamily: Fonts.robotoMedium,
    color: '#FFF',
    fontSize: normalize(16),
  },
  userName: {
    fontFamily: Fonts.robotoRegular,
    color: '#FFF',
    fontSize: normalize(12),
  },
  titleStyle: {
    fontFamily: Fonts.robotoRegular,
    marginBottom: normalize(12),
    fontSize: normalize(13),
  },
});

export default PlayerDetails;
