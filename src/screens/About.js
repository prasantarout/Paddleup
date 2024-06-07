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
  Linking,
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';

import Input from '../components/Input';
import Separator from '../components/Separator';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getAboutReq } from '../redux/reducer/CmsReducer';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../utils/helpers/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const About = props => {

  const isFocus = useIsFocused()
  const dispatch = useDispatch()
  const [homeModal, setHomeModal] = useState(false);

  const CmsReducer = useSelector(state => state.CmsReducer)


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
    dispatch(getAboutReq())
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
                  <TouchableOpacity
                    style={styles.backArrowWrapper}
                    onPress={() => {
                      props.navigation.goBack();
                    }}>
                    <Image source={Icons.backArrow} style={styles.backArrow} />
                  </TouchableOpacity>
                  <Text style={styles.screenTitle}>About</Text>
                  <View />
                </View>
              </LinearGradient>

              <ScrollView
                style={[styles.flexContainer]}
                contentContainerStyle={{
                  marginTop: normalize(50),
                  paddingHorizontal: normalize(20),
                  paddingBottom: Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(30) : normalize(300)) : normalize(10),
                }}
                showsVerticalScrollIndicator={false}>
                <View
                  style={[
                    styles.userInfo,
                    styles.rowContainer,
                    styles.justifyContentCenter,
                    styles.contentCenter,
                  ]}>

                  <Image
                    style={styles.paddleupLogo}
                    source={{ uri: `${constants.Media_Url}/uploads/about/${CmsReducer?.getAboutRes?.data?.image}` }}
                  />
                </View>
                <View style={{ width: '85%', alignSelf: 'center' }}>
                  <Separator dividerStyle={{ borderTopColor: 'gray' }} />

                  <View
                    style={[
                      styles.rowContainer,
                      styles.contentSpaceBetween,
                      styles.contentCenter,
                      css.mb4,
                    ]}>
                    <Text style={styles.versionData}>
                      {CmsReducer?.getAboutRes?.data?.version_title}
                      {' '}{CmsReducer?.getAboutRes?.data?.version_number}</Text>
                    {/* <Text style={styles.versionData}> 1.0.0</Text> */}
                  </View>
                  {
                    CmsReducer?.getAboutRes.data?.linkarr?.map(item => {
                      return <TouchableOpacity
                        onPress={() => {
                          // Linking.openURL(item?.link_url)
                          props?.navigation?.navigate('cmsScreen', {
                            item: item
                          })
                        }} >
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#4b4190', '#614799', '#623d95']}
                          style={styles.linearGradient}

                        >

                          <Text style={styles.linkText}>{item?.link_title}</Text>

                          <View style={styles.linkIcon} />
                        </LinearGradient>
                      </TouchableOpacity>
                    })
                  }

                  {/* <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={styles.linearGradient}>
                    <TouchableOpacity>
                      <Text style={styles.linkText}>Legal</Text>
                    </TouchableOpacity>
                    <View style={styles.linkIcon} />
                  </LinearGradient> */}

                  <Separator dividerStyle={{ borderTopColor: 'gray' }} />
                  <Text style={styles.copyWriteText}>
                    @2023-2024 Paddle Tapp
                  </Text>
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
    flex: 1
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
    width: '100%',
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
    paddingVertical: normalize(11),
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
    marginLeft: normalize(-20),
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
    justifyContent: 'space-between',
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
    height: normalize(22),
    width: normalize(22),
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
    width: normalize(140),
    height: normalize(140),
    resizeMode: 'contain',
    borderRadius: normalize(140) / 2,
    backgroundColor: '#625793'
  },
  userInfo: {
    alignSelf: 'center',
    paddingVertical: normalize(15),
  },

  versionData: {
    fontFamily: Fonts.robotoRegular,
    color: '#FFF',
    fontSize: normalize(15),
  },
  linkText: {
    fontFamily: Fonts.robotoRegular,
    color: '#FFF',
    fontSize: normalize(12),
  },
  copyWriteText: {
    fontFamily: Fonts.robotoRegular,
    color: '#FFF',
    fontSize: normalize(12),
    textAlign: 'center',
    marginBottom: normalize(5),
  },
  titleStyle: {
    fontFamily: Fonts.robotoRegular,
    marginBottom: normalize(5),
    fontSize: normalize(13),
  },
  absoluteView: {
    position: 'absolute',
    alignItems: 'center',
    width: Sizes.width - normalize(40),
  },
});

export default About;
