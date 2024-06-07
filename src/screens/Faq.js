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
import { getFaqReq } from '../redux/reducer/CmsReducer';
import { useDispatch, useSelector } from 'react-redux';
import RenderHTML from 'react-native-render-html';
import Loader from '../components/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomToast from '../utils/helpers/CustomToast';
import { openComposer } from 'react-native-email-link';
import RandomNumber from '../utils/helpers/RandomNumber';

let status = ''

const Faq = props => {

  const isFocus = useIsFocused()
  const dispatch = useDispatch()
  const [faqData, setFaqData] = useState();
  const [activeAnsIndex, setActiveIndex] = useState(undefined);
  const [isApiCall, setIsApiCall] = useState(false);

  const CmsReducer = useSelector(state => state.CmsReducer)
  const ProfileReducer = useSelector(state => state.ProfileReducer)
  console.log(ProfileReducer?.getProfileDetailsRes?.data?.email, 'AuthReducerAuthReducerAuthReducer')

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
    dispatch(getFaqReq())
  }, [isFocus])


  if (status === '' || CmsReducer.status !== status) {
    switch (CmsReducer.status) {
      case 'CMS/getFaqReq':
        status = CmsReducer.status;
        setIsApiCall(true)
        break;
      case 'CMS/getFaqSucces':
        status = CmsReducer.status;
        setFaqData(CmsReducer?.getFaqRes?.data)
        setIsApiCall(false)
        break;
      case 'CMS/getFaqFailure':
        status = CmsReducer.status;
        setIsApiCall(false)
        break;
    }
  }
  const renderFaq = ({ item, index }) => {
    return (

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#4b4190', '#614799', '#623d95']}
        style={styles.faqlinearGradient}>
        <TouchableOpacity
          onPress={() => {
            setActiveIndex(activeAnsIndex == index ? undefined : index)
          }}
          style={[styles.flexContainer, styles.rowContainer, styles.contentCenter, styles.contentSpaceBetween]}
        >
          <Text style={styles.faqQuestion}>{item?.question}</Text>
          <Image
            source={Icons.expandedDown}
            style={[styles.expandedDown,
            activeAnsIndex == index && {
              transform: [{ rotate: '180deg' }],
            }]}
          />
        </TouchableOpacity>
        {
          activeAnsIndex == index && <View style={styles.answerWrapper}>
            {/* <Text style={styles.faqAnswer}>{item?.answer}</Text> */}

            <RenderHTML
              allowedStyles={false}

              contentWidth={'100%'}
              source={{
                html: item?.answer
              }}
              tagsStyles={{
                p: styles.faqAnswer,
                img: {
                  resizeMode: 'contain',
                  width: 300
                },
                ol: {
                  color: "#FFF"
                },
                body: {
                  color: "#FFF",
                  marginTop: normalize(2),
                  width: '100%',
                }
              }}
            />
          </View>
        }

      </LinearGradient>
    )
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
                  <Text style={styles.screenTitle}>Help/FAaQ</Text>
                  <TouchableOpacity
                    style={styles.profileWrapper}
                    onPress={() => {

                      console.log();

                      // Linking.canOpenURL(mailUrl)
                      //   .then((supported) => {
                      //     if (!supported) {
                      //       console.error('Can\'t handle url: ' + mailUrl);
                      //     } else {
                      //       return Linking.openURL(mailUrl)
                      //         .then((data) => console.error("then", data))
                      //         .catch((err) => { throw err; });
                      //     }
                      //   })
                      //   .catch((err) => console.error('An error occurred', err));
                      // setShowDropDown(!showDropDown);
                      // Linking.openURL(mailUrl)


                      ProfileReducer?.getProfileDetailsRes?.data?.email ?
                        props?.navigation.navigate('Compose',{
                          email: ProfileReducer?.getProfileDetailsRes?.data?.email,
                          name: ProfileReducer?.getProfileDetailsRes?.data?.full_name,
                        }) :
                        openComposer({
                          to: "support@paddletapp.com",
                          subject: `CONTACT SUPPORT #${RandomNumber(8, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}`,
                          body: "Message here",
                        }).then((e) => {
                          console.log('sucesssss')
                        });

                      // Linking.openURL('mailto:?to=support@paddletapp.com&subject=CONTACT SUPPORT&body=https://www.paddletapp.com/....')
                    }}>
                    <Image source={Icons.support} style={css.menuIcon} />
                  </TouchableOpacity>
                </View>
              </LinearGradient>

              <ScrollView
                style={[styles.flexContainer]}
                contentContainerStyle={{
                  paddingHorizontal: normalize(20),
                  paddingBottom: Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(30) : normalize(300)) : normalize(10),
                }}
                showsVerticalScrollIndicator={false}>
                {
                  isApiCall ? (
                    <>
                      <Loader {...props} />
                    </>
                  ) :

                    <FlatList
                      data={faqData}
                      contentContainerStyle={{
                        paddingTop: normalize(10),
                        paddingBottom: normalize(20)
                      }}
                      renderItem={renderFaq}
                      keyExtractor={item => item.id}
                    />
                }
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
  faqlinearGradient: {
    paddingHorizontal: normalize(10),
    borderRadius: normalize(15),
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
  expandedDown: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: 'contain'
  },
  faqQuestion: {
    fontFamily: Fonts.robotoRegular,
    marginBottom: normalize(5),
    fontSize: normalize(13),
    color: '#FFF',
    flex: 1
  },

  answerWrapper: {
    borderTopWidth: 0,
    // borderColor: '#625793ab',
    marginTop: normalize(2),
    width: '100%'
  },
  faqAnswer: {
    fontFamily: Fonts.robotoRegular,
    fontSize: normalize(11),
    color: '#FFF',
    margin: 0,
  },
});

export default Faq;
