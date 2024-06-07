import React, {useCallback, useEffect, useState, useRef} from 'react';
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
  Linking,
} from 'react-native';
import {Fonts, Colors, Icons, Sizes, css, M_Icons} from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import {Images} from '../themes/Themes';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CheckBox from '../components/CheckBox';
import Separator from '../components/Separator';
import Footer from '../components/Footer';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {locationDeleteReq, locationEditReq} from '../redux/reducer/CmsReducer';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {regex} from '../utils/helpers/regex';
import CustomToast from '../utils/helpers/CustomToast';
import Loader from '../components/Loader';
import Linkify from 'react-native-linkify';
import {mapStyle} from '../utils/mapStyles';
let status = '';
const {height, width} = Dimensions.get('window');
const MapViews = props => {
  const [isPrimary, setIsPrimary] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {data} = props.route.params;
  const DEFAULT_PADDING = {top: 30, bottom: 150, left: 30, right: 30};
  const mapRef = useRef();
  console.log(data, 'data');
  const [orientation, setOrientation] = useState('PORTRAIT');
  const dispatch = useDispatch();
  const [position, setPosition] = useState({
    latitude:Number(data.lat) ? Number(data.lat) : 13.009598,
    longitude: Number(data.lng) ? Number(data.lng) : 77.54346833333334,
    latitudeDelta: 0.909,
    longitudeDelta: 0.902,
  });
  console.log(position,"position")
  useFocusEffect(
    useCallback(() => {
      if (Dimensions.get('window').width < Dimensions.get('window')?.height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
      const subscription = Dimensions.addEventListener(
        'change',
        ({window: {width, height}}) => {
          if (width < height) {
            setOrientation('PORTRAIT');
          } else {
            setOrientation('LANDSCAPE');
          }
          return () => subscription?.remove();
        },
      );
    }),
  );
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
            // scrollEnabled={isKeyboardVisible}
            enableOnAndroid={true}
            enableAutomaticScroll={true}>
            <ImageBackground
              style={[css.mainContainer, {paddingBottom: normalize(50)}]}
              resizeMode="stretch"
              source={Images.bg2}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#1c1854', '#191852', '#1c2c5f']}
                style={styles.screenHeader}>
                <View
                  style={[
                    styles.rowContainer,
                    styles.contentCenter,
                    styles.contentSpaceBetween,
                    css.mt1,
                    css.mb2,
                  ]}>
                  <TouchableOpacity
                    style={styles.backArrowWrapper}
                    onPress={() => {
                      props.navigation.goBack();
                    }}>
                    <Image source={Icons.backArrow} style={styles.backArrow} />
                  </TouchableOpacity>
                  <Text style={styles.screenTitle}>Location Details</Text>
                  <View />
                </View>
              </LinearGradient>

              <View style={{flex: 1}}>
                <MapView
                
                  provider={PROVIDER_GOOGLE}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: width,
                    height: height,
                  }}
                  ref={mapRef}
                  // initialRegion={position}
                  region={position}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  followsUserLocation={true}
                  showsCompass={true}
                  scrollEnabled={true}
                  zoomEnabled={true}
                  pitchEnabled={true}
                  showsBuildings={true}
                  // mapType='satellite'
                  rotateEnabled={true}
                  customMapStyle={mapStyle}
                  mapPadding={DEFAULT_PADDING}>
                  <Marker coordinate={position} pinColor="#000000">
                    {/* <View style={styles.container_wrapper}> */}
                    {/* <TouchableOpacity>
                        <View style={styles.bubble}>
                          <Text numberOfLines={1} style={styles.textInput}>
                            hello
                          </Text>
                        </View>
                      </TouchableOpacity> */}
                    <Image
                      source={Icons.oval}
                      style={{height: normalize(40), width: normalize(40)}}
                    />
                    {/* </View> */}
                  </Marker>
                </MapView>
              </View>
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
    // flex: 1,
    width: '100%',
  },
  inputStyles: {
    height: normalize(15),
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#FFFF',
    padding: 0,
    borderRadius: normalize(10),
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
    fontSize: normalize(12),
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
  linearGradients: {
    // paddingHorizontal: normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(10),
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
  titleStyle: {
    color: '#fff',
    fontFamily: Fonts.robotoMedium,
    fontSize: Platform.OS === 'android' ? normalize(14) : normalize(12),
    marginBottom: normalize(10),
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

  inputStyle: {
    height: normalize(80),
    paddingTop: normalize(10),
  },
  switchTitle: {
    color: '#FFF',
    fontSize: normalize(13),
    fontFamily: Fonts.robotoMedium,
  },
  switchActionWrapper: {
    marginTop: normalize(15),
    marginBottom: normalize(10),
  },
  searchDropDown: {
    backgroundColor: '#594695',
  },
  locationSuggestionWrapper: {
    paddingHorizontal: normalize(5),
    paddingVertical: normalize(10),
  },
  placeName: {
    color: '#FFF',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'black',
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 0.5,
    width: 220,
    elevation: 50,
  },
  textInput: {
    padding: 1,
    paddingStart: normalize(10),
    width: width * 0.9,
    height: normalize(25),
    marginTop: normalize(8),
    right: normalize(0),
    borderRadius: normalize(10),
    color: Colors.white,
  },
  container_wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MapViews;
