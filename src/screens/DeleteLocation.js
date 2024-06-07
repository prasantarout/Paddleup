import React, {useCallback, useEffect, useState} from 'react';
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
let status = '';
const DeleteLocation = props => {
  const [isPrimary, setIsPrimary] = useState(false);
  const [isApiCall, setIsApiCall] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationTitle, setLocationTitle] = useState(
    props?.route?.params?.item.title,
  );
  console.log(props.route.params.item.locationtype    ,"props");
  const [locationLink, setLocationLink] = useState(
    props?.route?.params?.item.location_link,
  );
  const [address, setAddress] = useState(props?.route?.params?.item.address);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const dispatch = useDispatch();
  console.log(props, 'propspropsprops');
  const [locationArray, setLocationArray] = useState();
  const [state, setState] = useState(props?.route?.params?.item.state);
  const [city, setCity] = useState(props?.route?.params?.item.city);
  const [zip, setZip] = useState(props?.route?.params?.item.zipcode);
  const [lat, setLat] = useState(props?.route?.params?.item.lat);
  const [lon, setLon] = useState(props?.route?.params?.item.long);
  const [country, setCountry] = useState(props?.route?.params?.item.country);

  const CmsReducer = useSelector(state => state.CmsReducer);
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

  const handleAction = () => {
    let obj = {};
    props?.route?.params?.type == 'edit'
      ? null
      : isApiCall
      ? null
      : Alert.alert('PaddleTapp', 'Are you sure want to delete', [
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
              (obj = {
                locationid: props?.route?.params?.item?._id,
              }),
                dispatch(locationDeleteReq(obj));
            },
            style: 'default',
          },
        ]);
  };

  if (status === '' || CmsReducer.status !== status) {
    switch (CmsReducer.status) {
      case 'CMS/locationDeleteReq':
        status = CmsReducer.status;
        setIsApiCall(true);

        break;
      case 'CMS/locationDeleteSucces':
        status = CmsReducer.status;
        setIsApiCall(false);

        props.navigation.goBack();
        break;
      case 'CMS/locationDeleteFailure':
        status = CmsReducer.status;
        setIsApiCall(false);

        break;
      case 'CMS/locationEditReq':
        status = CmsReducer.status;
        setIsApiCall(true);
        break;
      case 'CMS/locationEditSucces':
        status = CmsReducer.status;
        setIsApiCall(false);
        props.navigation.goBack();
        break;
      case 'CMS/locationEditFailure':
        status = CmsReducer.status;
        setIsApiCall(false);
        break;
    }
  }
  var Reg = /^(https?:\/\/)?(www\.)?maps\.google\.com\/?.*/;
  function getaddressdata(data) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${data}&types=geocode&key=AIzaSyBnEo1ETRz7qSJ_m0SDTZQBznPAqSF7ITI`,
      )
      .then(res => {
        setLocationArray(res?.data?.predictions);
      });
  }
  function getFormateAddress(data) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${data}&types=geocode&key=AIzaSyBnEo1ETRz7qSJ_m0SDTZQBznPAqSF7ITI`,
      )
      .then(res => {
        console.log(res, 'Res');
        setLat(res?.data?.result?.geometry?.location?.lat);
        setLon(res?.data?.result?.geometry?.location?.lng);
        res?.data?.result?.address_components?.map((item, index) => {
          if (item?.types[0] == 'administrative_area_level_1') {
            setState(item?.long_name);
          } else if (
            item?.types[0] == 'administrative_area_level_3' ||
            item?.types[0] == 'administrative_area_level_2'
          ) {
            setCity(item?.long_name);
          } else if (item?.types[0] == 'country') {
            setCountry(item?.long_name);
          } else if (item?.types[0] == 'postal_code') {
            setZip(item?.long_name);
          }
        });
      });
  }

  const renderLocation = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.locationSuggestionWrapper}
        onPress={() => {
          getFormateAddress(item?.place_id);
          setAddress(item?.description);
          setLocationArray([]);
        }}>
        <Text style={styles.placeName}>{item?.description}</Text>
      </TouchableOpacity>
    );
  };
  const editLocation = () => {
    if (locationTitle?.trim() == '') {
      CustomToast('Location Name is required');
      return false;
    }

    // if (locationLink?.trim() == '') {
    //   CustomToast('Location Link is required')
    //   return false
    // }

    // if (locationLink) {
    //   if (!Reg.test(locationLink)) {
    //     CustomToast('Location Link is invalid');
    //     return false;
    //   }
    // }

    // if (address?.trim() == '') {
    //   CustomToast('Location Name is required');
    //   return false;
    // }
    // if (zip == undefined) {
    //   CustomToast('Unable to find Zipcode, Please provide specific address')
    //   return false
    // }

    let obj = {
      location_id: props?.route?.params?.item._id,
      locationtype: props?.route?.params?.item.locationtype,
      title: locationTitle,
      location_link: locationLink,
      address: address,
      country: country,
      state: state,
      city: city,
      zipcode: zip,
      lat: lat,
      long: lon,
    };
    console.log(obj, 'jsdksjk');
    dispatch(locationEditReq(obj));
  };

  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const latLng = {
    lat: lat,
    lng: lon,
  };
  //console.log(latLng,"latLng")
  // const label = 'Custom Label';
  // const url = Platform.select({
  //   ios: `${scheme}${label}@${latLng}`,
  //   android: `${scheme}${latLng}(${label})`
  // });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Colors.blue}
        {...props}
        barStyle={'light-content'}
      />
      <SafeAreaView style={styles.SafeAreaView}>
        <Loader visible={CmsReducer.status === 'CMS/locationDeleteReq'} />
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
                  <Text style={styles.screenTitle}>
                    {props?.route?.params?.type == 'edit'
                      ? 'Edit Location'
                      : 'Delete Location'}
                  </Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      // props.navigation.goBack();
                      props?.route?.params?.type == 'edit'
                        ? editLocation()
                        : handleAction();
                    }}>
                    <Text
                      style={[
                        styles.saveActionText,
                        {
                          color:
                            props?.route?.params?.type == 'edit'
                              ? Colors.themeBlue
                              : Colors.btnPink,
                        },
                      ]}>
                      {props?.route?.params?.type == 'edit'
                        ? isApiCall
                          ? 'Wait..'
                          : 'Save'
                        : isApiCall
                        ? 'Wait..'
                        : 'Delete'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              <ScrollView
                style={[styles.flexContainer, css.pt1, styles.ph10]}
                contentContainerStyle={{
                  paddingBottom:
                    isKeyboardVisible === true
                      ? normalize(280)
                      : Platform.isPad
                      ? orientation == 'PORTRAIT'
                        ? normalize(70)
                        : normalize(340)
                      : normalize(100),
                  paddingHorizontal: normalize(20),
                }}
                showsVerticalScrollIndicator={false}>
                <Input
                  title="Location Name"
                  // leftIcon={M_Icons.user}
                  placeholder="Add Location"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3, css.mt2]}
                  value={locationTitle}
                  onChangeText={text => {
                    setLocationTitle(text);
                  }}
                  titleStyle={styles.titleStyle}
                  isEditable={
                    props?.route?.params?.type == 'edit' ? true : false
                  }
                />
                <View style={[css.mb3, {top: normalize(6)}]}>
                  <Text style={styles.titleStyle}>{'Location Link'}</Text>
                  {props?.route?.params?.type == 'edit' ? (
                    <Input
                      // leftIcon={M_Icons.user}
                      placeholder="Location Link"
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.mb3]}
                      value={locationLink}
                      titleStyle={styles.titleStyle}
                      multiline={
                        props?.route?.params?.type == 'edit' ? false : true
                      }
                      onChangeText={text => {
                        setLocationLink(text);
                      }}
                      isEditable={
                        props?.route?.params?.type == 'edit' ? true : false
                      }
                    />
                  ) : (
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={styles.linearGradient}>
                      <Linkify
                        onPress={() => {
                          // if (!Reg.test(locationLink)) {
                          //   CustomToast('Location Link is invalid');
                          //   return false;
                          // } else {
                          props.navigation.navigate('MapViews', {
                            data: latLng,
                          });
                          // }
                        }}>
                        <Text
                          style={styles.inputStyles}
                          multiline={
                            props?.route?.params?.type == 'edit' ? false : true
                          }>
                          {locationLink}
                        </Text>
                      </Linkify>
                    </LinearGradient>
                  )}
                </View>
                <Input
                  title="Address"
                  placeholder="Address"
                  multiline={
                    props?.route?.params?.type == 'edit' ? false : true
                  }
                  style={styles.inputStyling}
                  placeholderTextColor="#ffffff40"
                  containerStyle={[
                    locationArray?.length > 0 ? css.mb0 : css.mb3,
                  ]}
                  value={address}
                  onChangeText={text => {
                    getaddressdata(text);
                    setAddress(text);
                  }}
                  inputWrapper={
                    props?.route?.params?.type == 'edit'
                      ? [
                          locationArray?.length > 0 && {
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                          },
                        ]
                      : null
                  }
                  titleStyle={styles.titleStyle}
                  isEditable={
                    props?.route?.params?.type == 'edit' ? true : false
                  }
                />
                {props?.route?.params?.type == 'edit' ? (
                  <FlatList
                    data={locationArray}
                    renderItem={renderLocation}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.searchDropDown}
                  />
                ) : null}
                <Separator />

              {/* {props?.route?.params?.item.locationtype==="Private" && 
              <CustomButton
                  btnText="Share"
                  titleStyle={[]}
                  onPress={() => {
                    // props.navigation.navigate('GameList');
                  }}
                />
               } */}
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
    height: normalize(17),
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
  Res: {
    top: 10,
  },
});

export default DeleteLocation;
