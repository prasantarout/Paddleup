import React, { useCallback, useEffect, useState } from 'react';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';

import Modal from 'react-native-modal';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
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
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  Linking,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import HomeMenu from '../components/HomeMenu';
import Footer from '../components/Footer';
import { getCmsPageContentreq, getRulesReq } from '../redux/reducer/CmsReducer';
import { useDispatch, useSelector } from 'react-redux';
import RenderHTML from 'react-native-render-html';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const cmsScreen = props => {
  const isFocus = useIsFocused()
  const dispatch = useDispatch()

  const CmsReducer = useSelector(state => state.CmsReducer)

  const [showDropDown, setShowDropDown] = useState(false);
  const [isHomeMenu, setIsHomeMenu] = useState(false);
  const [time, setTime] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [type, setType] = useState('history');
  const [orientation, setOrientation] = useState("PORTRAIT");

  console.log(props?.route?.params?.item.link_title, 'propspropsprops')
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
  const navigation = useNavigation();

  const _handleTime = time => {
    console.log('Time', time);
    setTime(time);
  };
  useEffect(() => {
    dispatch(getCmsPageContentreq({ slug: props?.route?.params?.item.link_title == 'Terms Of Use' ? 'terms-and-condition' : 'privacy-policy' }))
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
        <View style={[css.mainScreen]}>
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
                    style={styles.profileWrapper}
                    onPress={() => {
                      props.navigation.goBack();
                    }}>
                    <Image source={Icons.backArrow} style={css.backArrow} />
                  </TouchableOpacity>

                  <Text style={styles.screenTitle}>
                    {props?.route?.params?.item.link_title}
                  </Text>
                  <View />
                </View>
              </LinearGradient>
              <ScrollView
                style={[styles.flexContainer, css.mt3]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(30) : normalize(300)) : normalize(80),
                  paddingHorizontal: normalize(20)
                }}
              >
                <View style={[styles.cardWrapper]}>
                  <RenderHTML
                    contentWidth={'100%'}
                    source={{
                      html: CmsReducer?.getCmsPageContentres?.data?.content
                    }}
                    tagsStyles={{
                      p: styles.rulesPara
                    }}
                  />
                </View>
              </ScrollView>
            </ImageBackground>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>

      <HomeMenu {...props} isHomeMenu={isHomeMenu} />
    </>
  );
};

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    maxHeight: Sizes.height - normalize(100),
    minHeight: Sizes.height - normalize(100),
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
  borderRadius30: {
    borderRadius: normalize(30),
  },
  crossIcon: {
    width: normalize(25),
    height: normalize(25),
    resizeMode: 'contain',
  },
  headerText: {
    color: '#fff',
    fontFamily: Fonts.robotoMedium,
  },
  dropDownStyle: {
    position: 'absolute',
    zIndex: 999,
    right: normalize(25),
    top: normalize(40),
    resizeMode: 'stretch',
    width: Platform?.isPad ? normalize(220) : normalize(200),
    height: Platform?.isPad ? normalize(110) : normalize(100),
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  form: {
    zIndex: -1,
  },
  menuText: {
    color: '#fff',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(12)
  },
  corolrTheme: {
    color: '#F890E7',
  },
  ddInternal: {
    // height: normalize(100),
  },
  menuWrap: {
    height: normalize(49),
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: -19,
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.actionText,
  },
  menuWrap1: {
    height: normalize(49),
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: -19,
  },
  separatorStyle: {
    marginVertical: 0,
  },
  modalBackBtn: {
    width: normalize(25),
    height: normalize(25),
    resizeMode: 'contain',
  },
  modalHeaderText: {
    color: '#fff',
    alignSelf: 'center',
  },
  modalBody: {
    justifyContent: 'center',
    marginTop: normalize(30),
    marginBottom: normalize(20),
  },
  modalBodyText: {
    color: '#fff',
    fontSize: normalize(20),
    fontFamily: Fonts.robotoMedium,
    lineHeight: normalize(30),
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  modalWrap: {
    height: height / 1.5,
  },
  modalContainer: {
    height: '100%',
  },
  playerNameContainer: {
    backgroundColor: '#433c8a',
    paddingVertical: normalize(13),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(8),
    maxWidth: '100%',
  },

  w40Percent: {
    width: '40%',
  },
  toggleIconStyle: {
    width: normalize(7),
    height: normalize(7),
    marginLeft: normalize(10),
    resizeMode: 'contain',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rowContentCenter: {
    alignItems: 'center',
  },
  rowSpaceBetween: {
    justifyContent: 'space-between',
  },
  rowFlexEnd: {
    alignSelf: 'flex-end',
  },

  w20Percent: {
    width: '20%',
  },
  w22Percent: {
    width: '22%',
  },
  itemCenter: {
    alignItems: 'center',
  },

  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  paddleupLogo: {
    height: normalize(35),
    width: normalize(35),
    resizeMode: 'contain',
  },
  menuIcon: {
    height: normalize(28),
    width: normalize(28),
    resizeMode: 'contain',
  },

  screenTitle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(12),
    color: '#FFFF',
  },
  bottomBorder: {
    width: '100%',
    height: normalize(1),
    backgroundColor: '#313370',
    marginTop: normalize(5),
  },

  contentCenter: {
    alignItems: 'center',
  },
  backArrow: {
    height: normalize(28),
    width: normalize(28),
    resizeMode: 'contain',
    borderRadius: normalize(5),
  },
  centerTextTitle: {
    width: width - normalize(45),
    position: 'absolute',
    alignItems: 'center',
  },
  w30Percent: {
    width: '29%',
  },

  w49Percent: {
    width: '49%',
  },
  flex1: {
    flex: 1,
  },
  ph10: {
    paddingHorizontal: normalize(10),
  },
  ruleText: {
    width: '70%',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(12),
    color: '#FFF',
    lineHeight: normalize(18),
  },
  linkBtn: {
    borderWidth: normalize(1),
    borderColor: '#FA8792',
    borderRadius: normalize(50),
    paddingVertical: normalize(5),
    width: '22%',
    alignItems: 'center',
  },
  linkBtnText: {
    color: '#FA8792',
    fontFamily: Fonts.robotoRegular,
    fontSize: normalize(11),
    textTransform: 'uppercase',
    letterSpacing: normalize(1.5),
  },

  rulesTitle: {
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(15),
    textTransform: 'uppercase',
    marginBottom: normalize(5),
  },
  rulesPara: {
    color: '#FFF',
    fontFamily: Fonts.robotoRegular,
    fontSize: normalize(11),
    marginBottom: normalize(20),
    lineHeight: normalize(15),
    padding: 0,
    marginTop: 0
  },
  contentSpaceBetween: {
    justifyContent: 'space-between',
  },
  screenHeader: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(11),
  },
});

export default cmsScreen;
