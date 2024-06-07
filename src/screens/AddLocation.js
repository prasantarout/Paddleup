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
} from 'react-native';
import {Fonts, Colors, Icons, Sizes, css, M_Icons} from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import {Images} from '../themes/Themes';

import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import CheckBox from '../components/CheckBox';
import Footer from '../components/Footer';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import CustomToast from '../utils/helpers/CustomToast';
import {regex} from '../utils/helpers/regex';
import {useDispatch, useSelector} from 'react-redux';
import {addLocationReq} from '../redux/reducer/CmsReducer';

let status = '';
const AddLocation = props => {
  const [isApiCall, setIsApiCall] = useState(false);

  const CmsReducer = useSelector(state => state.CmsReducer);

  const [isSelected, setisSelected] = useState(false);
  const [isSelected1, setisSelected1] = useState(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationLink, setLocationLink] = useState('');
  const [selectLocationLink, setSelectLocationLink] = useState('');
  const [locationArray, setLocationArray] = useState();
  const [locationArray1, setLocationArray1] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [country, setCountry] = useState();
  console.log(CmsReducer?.userLocationListRes?.data, 'dataVBalue');
  const dispatch = useDispatch();
  const [orientation, setOrientation] = useState('PORTRAIT');
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

  function getaddressdata(data) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${data}&key=AIzaSyBnEo1ETRz7qSJ_m0SDTZQBznPAqSF7ITI`,
      )
      .then(res => {
        setLocationArray(res?.data?.predictions);
        console.log(res?.data?.predictions,'alsdjksjdksj')
      });
  }
  function getaddressdata1(data) {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${data}&key=AIzaSyBnEo1ETRz7qSJ_m0SDTZQBznPAqSF7ITI`,
      )
      .then(res => {
        setLocationArray1(res?.data?.predictions);
      });
  }
  function getFormateAddress(data) {
   
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${data}&types=geocode&key=AIzaSyBnEo1ETRz7qSJ_m0SDTZQBznPAqSF7ITI`,
      )
      .then(res => {
        setSelectLocationLink(res?.data?.result?.url);
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

  const handleSaveLocation = () => {
   
    let reg = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    if (locationName?.trim() == '') {
      CustomToast('Location Name is required');
      return false;
    }
    let obj = {
      title: isSelected == true ? address : locationName,
      locationtype: isSelected ? 'Public' : 'Private',
      location_link: isSelected == true ? selectLocationLink : locationLink,
      address: isSelected == true ? address2 : address1,
      country: country,
      state: state,
      city: city,
      zipcode: zip,
      lat: lat,
      long: lon,
    };
    const existingLocation = CmsReducer?.userLocationListRes?.data?.find(
      item => item.title === address,
    );
    if (existingLocation) {
      CustomToast('Location already exists');
    } else {
      dispatch(addLocationReq(obj));
    }
  };

  if (status === '' || CmsReducer.status !== status) {
    switch (CmsReducer.status) {
      case 'CMS/addLocationReq':
        status = CmsReducer.status;
        setIsApiCall(true);
        break;
      case 'CMS/addLocationSucces':
        status = CmsReducer.status;
        setIsApiCall(false);
        setisSelected;
        setAddress('');
        setLocationName('');
        setLocationLink('');
        setState('');
        setCity('');
        setZip('');
        setLat('');
        setLon('');
        setCountry('');
        setSelectLocationLink('');
        props?.navigation.navigate('LocationList');
        break;
      case 'CMS/addLocationFailure':
        status = CmsReducer.status;
        setIsApiCall(false);
        break;
    }
  }
  const renderLocation = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.locationSuggestionWrapper}
        onPress={() => {
          getFormateAddress(item?.place_id);
          setAddress(item?.structured_formatting?.main_text);
          setAddress2(item?.description);
          setLocationArray([]);
        }}>
        <Text style={styles.placeName}>{item?.description}</Text>
      </TouchableOpacity>
    );
  };
  const renderLocation1 = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.locationSuggestionWrapper}
        onPress={() => {
          getFormateAddress(item?.place_id);
          setAddress1(item?.description);

          setLocationArray1([]);
        }}>
        <Text style={styles.placeName}>{item?.description}</Text>
      </TouchableOpacity>
    );
  };
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
          <View
            // scrollEnabled={false}
            // behavior={'position'}
            // keyboardVerticalOffset={-250}
            style={{flex: 1}}>
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
                  <Text style={styles.screenTitle}>Add New Location</Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      // props?.navigation.navigate('PlayerTeams')
                    }}>
                    {/* <Text style={styles.saveActionText}>Share</Text> */}
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              <KeyboardAwareScrollView
                style={[styles.flexContainer, css.pt1, styles.ph10]}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                scrollEnabled={true}
                contentContainerStyle={{
                  paddingBottom:
                    isKeyboardVisible === true
                      ? normalize(350)
                      : Platform.isPad
                      ? orientation == 'PORTRAIT'
                        ? normalize(70)
                        : normalize(340)
                      : normalize(100),
                  paddingHorizontal: normalize(20),
                }}>
                <View style={styles.switchActionWrapper}>
                  <View
                    style={[
                      css.mb2,
                      styles.rowContainer,
                      ,
                      //  / styles.contentCenter,
                      // styles.contentSpaceBetween,
                      {
                        padding: normalize(9),
                        borderRadius: normalize(30),
                        width: normalize(160),
                        borderWidth: 1,
                        borderColor: '#614799',
                        justifyContent: 'center',

                        //elevation:2
                      },
                    ]}>
                    <Text style={[styles.switchTitle, {right: 6}]}>
                      Private
                    </Text>
                    <View style={{left: normalize(2)}}>
                      <CheckBox
                        onChange={value => {
                          setisSelected(value), setisSelected1(false);
                        }}
                        active={isSelected}
                      />
                    </View>
                    <Text style={[styles.switchTitle, {left: normalize(5)}]}>
                      Public
                    </Text>
                  </View>

                  <Text style={styles.publicDesText}>
                  Enabling “Public” will allow other users in the 
                  application to select this newly saved location 
                  for their sessions as well.
                  </Text>
                  <View style={[styles.bottomBorder, css.mb3]} />
                </View>
                <View style={{bottom: normalize(15)}}>
                  <Input
                    title="Location Name"
                    // leftIcon={M_Icons.user}
                    placeholder="Location"
                    placeholderTextColor="#ffffff40"
                    containerStyle={
                      isSelected == true
                        ? [locationArray?.length > 0 ? css.mb0 : css.mb3]
                        : [css.mb0, css.mb3]
                    }
                    value={isSelected == true ? address : locationName}
                    titleStyle={styles.titleStyle}
                    inputStyle={[styles.inputStyle]}
                    textAlignVertical="top"
                    inputWrapper={
                      isSelected == true
                        ? [
                            locationArray?.length > 0 && {
                              borderBottomLeftRadius: 0,
                              borderBottomRightRadius: 0,
                            },
                          ]
                        : null
                    }
                    onChangeText={text => {
                      if (isSelected == true) {
                        getaddressdata(text);
                        setAddress(text);
                      }
                      setLocationName(text);
                    }}
                  />
                  {isSelected == true && (
                    <FlatList
                      data={locationArray}
                      renderItem={renderLocation}
                      keyExtractor={item => item.id}
                      contentContainerStyle={styles.searchDropDown}
                    />
                  )}

                  <Input
                    title="Location Link"
                    placeholder="Location Link"
                    placeholderTextColor="#ffffff40"
                    containerStyle={[css.mb3]}
                    value={
                      isSelected == true ? selectLocationLink : locationLink
                    }
                    titleStyle={styles.titleStyle}
                    onChangeText={text => {
                      setLocationLink(text);
                    }}
                    isEditable={isSelected == true ? false : true}
                  />
                  <Input
                    title="Address"
                    placeholder="Enter Address"
                    placeholderTextColor="#ffffff40"
                    // containerStyle={[
                    //   locationArray1?.length > 0 ? css.mb0 : css.mb3,
                    // ]}
                    value={isSelected == true ? address2 : address1}
                    titleStyle={styles.titleStyle}
                    inputStyle={[styles.inputStyle]}
                    // inputWrapper={[
                    //   locationArray1?.length > 0 && {
                    //     borderBottomLeftRadius: 0,
                    //     borderBottomRightRadius: 0,
                    //   },
                    // ]}
                    // multiline={true}
                    textAlignVertical="top"
                    onChangeText={text => {
                      getaddressdata1(text);
                      setAddress1(text);
                    }}
                    isEditable={isSelected == true ? false : true}
                  />

                  {/* {isSelected !== true && (
                    <FlatList
                      data={locationArray1}
                      renderItem={renderLocation1}
                      keyExtractor={item => item.id}
                      contentContainerStyle={styles.searchDropDown}
                    />
                  )} */}
                </View>

                <View style={[css.mb2, {top: normalize(20)}]}>
                  <CustomButton
                    btnText={isApiCall ? 'Processing...' : 'Add Location'}
                    btnBg={Colors.btnBlue}
                    onPress={() => {
                      // props?.navigation.navigate('LocationList');
                      isApiCall ? null : handleSaveLocation();
                    }}
                  />
                </View>
              </KeyboardAwareScrollView>
            </ImageBackground>
          </View>
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
    fontSize: normalize(12),
    color: '#FFFF',
  },
  publicDesText: {
    fontFamily: Fonts.robotoLightItalic,
    fontSize: normalize(11),
    marginBottom: normalize(10),
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
  inputStyle: {
    // height: normalize(80),
    paddingTop: Platform.OS == 'android' ? normalize(10) : normalize(1),
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
});

export default AddLocation;
