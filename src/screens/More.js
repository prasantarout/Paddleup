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
  Dimensions,
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import Separator from '../components/Separator';
import Icons_Manish from '../themes/Icons_Manish';
import Footer from '../components/Footer';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../redux/reducer/AuthReducer';
import { getProfileDetailsReq } from '../redux/reducer/ProfileReducer';
import constants from '../utils/helpers/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const More = props => {
  const isFocus = useIsFocused()
  const dispatch = useDispatch()


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

  const logoOutHndle = () => {
    GoogleSignin.signOut()
    dispatch(logoutRequest())
  }
  const ProfileReducer = useSelector(state => state.ProfileReducer)
  useEffect(() => {
    dispatch(getProfileDetailsReq())
  }, [isFocus])
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
            scrollEnabled={false}
            behavior={Platform.OS == 'ios' ? 'position' : null}>
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
                  ]}>
                  <Text style={styles.screenTitle}>PaddleTapp</Text>
                  <TouchableOpacity
                    style={styles.profileWrapper}
                    onPress={() => {
                      props.navigation.navigate('Profile');
                    }}>
                    <Image
                      source={
                        ProfileReducer?.getProfileDetailsRes?.data?.profile_pic ? { uri: `${constants.Media_Url}/uploads/user/profile_pic/${ProfileReducer?.getProfileDetailsRes?.data?.profile_pic}` }
                          : Images.noUser}

                      style={styles.profile} />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              <ScrollView
                style={[styles.flexContainer]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(80) : normalize(360)) : normalize(90)
                }}

              >
                <View
                  style={[
                    styles.rowContainer,
                    css.py2,
                    css.mt2,
                    {
                      marginHorizontal: normalize(10),
                      paddingHorizontal: normalize(10),
                    },
                  ]}>
                  <View>
                    <Image style={styles.addRound} source={Icons.leaderBoard} />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      props?.navigation.navigate('Leaderboard');
                    }}>
                    <Text style={styles.playerTxt}>Leaderboard</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    marginVertical: normalize(10),
                    backgroundColor: '#ffffff',
                    opacity: 0.1,
                  }}
                />

                <View
                  style={[
                    styles.rowContainer,
                    css.py2,
                    {
                      marginHorizontal: normalize(10),
                      paddingHorizontal: normalize(10),
                    },
                  ]}>
                  <View>
                    <Image
                      style={styles.addRound}
                      source={Icons.sessionHistory}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      props?.navigation.navigate('SessionHistory');
                    }}>
                    <Text style={styles.playerTxt}>Sessions</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    marginVertical: normalize(10),
                    backgroundColor: '#ffffff',
                    opacity: 0.1,
                  }}
                />

                <View
                  style={[
                    styles.rowContainer,
                    css.py2,
                    {
                      marginHorizontal: normalize(10),
                      paddingHorizontal: normalize(10),
                    },
                  ]}>
                  <View>
                    <Image
                      style={styles.addRound}
                      source={Icons.officialRules}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      props?.navigation.navigate('OfficialRule');
                    }}>
                    <Text style={styles.playerTxt}>Official Rules</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    marginVertical: normalize(10),
                    backgroundColor: '#ffffff',
                    opacity: 0.1,
                  }}
                />

                <View
                  style={[
                    styles.rowContainer,
                    css.py2,
                    {
                      marginHorizontal: normalize(10),
                      paddingHorizontal: normalize(10),
                    },
                  ]}>
                  <View>
                    <Image style={styles.addRound} source={Icons.help} />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      props?.navigation.navigate('Faq');
                    }}>
                    <Text style={styles.playerTxt}>Help/FAQ</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    marginVertical: normalize(10),
                    backgroundColor: '#ffffff',
                    opacity: 0.1,
                  }}
                />
                <View
                  style={[
                    styles.rowContainer,
                    css.py2,
                    {
                      marginHorizontal: normalize(10),
                      paddingHorizontal: normalize(10),
                    },
                  ]}>
                  <View>
                    <Image style={[styles.addRound,{
                      tintColor:'#0BD3D3'
                    }]} source={Icons.settings} />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      props?.navigation.navigate('Setting');
                    }}>
                    <Text style={styles.playerTxt}>Settings</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    marginVertical: normalize(10),
                    backgroundColor: '#ffffff',
                    opacity: 0.1,
                  }}
                />

                <View
                  style={[
                    styles.rowContainer,
                    css.py2,
                    {
                      marginHorizontal: normalize(10),
                      paddingHorizontal: normalize(10),
                    },
                  ]}>
                  <View>
                    <Image
                      style={styles.addRound}
                      source={Icons.paddleTapLogo}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {

                      //   props?.navigation.navigate('OfficialRule');
                    }}>
                    <Text style={styles.playerTxt}>Upgrade PaddleTapp</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    marginVertical: normalize(10),
                    backgroundColor: '#ffffff',
                    opacity: 0.1,
                  }}
                />

                <View
                  style={[
                    styles.rowContainer,
                    css.py2,
                    {
                      marginHorizontal: normalize(10),
                      paddingHorizontal: normalize(10),
                    },
                  ]}>
                  <View>
                    <Image style={styles.addRound} source={Icons.about} />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      props?.navigation.navigate('About');
                    }}>
                    <Text style={styles.playerTxt}>About</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderStyle: 'dotted',
                    borderWidth: 1,
                    marginVertical: normalize(10),
                    backgroundColor: '#ffffff',
                    opacity: 0.1,
                  }}
                />

                <View
                  style={[
                    styles.rowContainer,
                    css.py2,
                    {
                      marginHorizontal: normalize(10),
                      paddingHorizontal: normalize(10),
                    },
                  ]}>
                  <View>
                    <Image style={styles.addRound} source={Icons.logout} />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      logoOutHndle()
                    }}>
                    <Text style={styles.playerTxt}>Logout</Text>
                  </TouchableOpacity>
                </View>
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
    minHeight: Sizes.height - normalize(200),
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

  contentSpaceBetween: {
    justifyContent: 'space-between',
  },
  screenHeader: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(3),

  },
  profileWrapper: {
    height: normalize(40),
    width: normalize(40),
    justifyContent: 'center'
  },
  profile: {
    height: normalize(38),
    width: normalize(38),
    borderRadius: normalize(38) / 2,
    resizeMode: 'cover',
    borderWidth: normalize(2),
    borderColor: '#303a6a',
    borderRadius: normalize(40) / 2,
  },
  screenTitle: {
    fontFamily: Fonts.RighteousRegular,
    fontSize: normalize(14),
    color: '#FFFF',
  },
  playerTxt: {
    color: '#FFF',
    fontSize: normalize(14),
    fontFamily: Fonts.robotoMedium,
    marginLeft: normalize(20),
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
    width: normalize(55),
    height: normalize(55),
    resizeMode: 'contain',
    borderWidth: normalize(2),
    borderColor: '#5f5b99',
    borderRadius: normalize(55) / 2,
  },
  userInfo: {
    alignSelf: 'flex-start',
    paddingVertical: normalize(12),
  },

  addressTitle: {
    fontFamily: Fonts.robotoMedium,
    color: '#FFF',
    fontSize: normalize(14),
    textTransform: 'capitalize',
    marginBottom: normalize(5),
  },
  address: {
    fontFamily: Fonts.robotoRegular,
    color: '#D4D4D4',
    fontSize: normalize(10),
  },
  userMetaInfo: {
    marginLeft: normalize(8),
  },
  addRound: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: 'contain',
  },
});

export default More;
