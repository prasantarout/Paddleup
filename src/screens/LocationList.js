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
  Keyboard,
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Separator from '../components/Separator';
import Icons_Manish from '../themes/Icons_Manish';
import Footer from '../components/Footer';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetailsReq } from '../redux/reducer/ProfileReducer';
import constants from '../utils/helpers/constants';
import {
  addToLocationReq,
  addToPlayerReq,
  getPlayerReq,
  locationListReq,
  searchLocationListReq,
  searchPlayerListReq,
  userLocationReq,
} from '../redux/reducer/CmsReducer';
import Loader from '../components/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../components/Input';

let status = '';
const LocationList = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const CmsReducer = useSelector(state => state?.CmsReducer);
  const [isApiCall, setIsApiCall] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterByType] = useState("Public");
  const [searchLocationData, setSearchLocationData] = useState('');
  const [notSearchLocation, setNotSearchLocation] = useState('');
  const [isShow, setIshow] = useState(false);
  const [addresIndex, setAddresIndex] = useState(undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const [orientation, setOrientation] = useState('PORTRAIT');
  useFocusEffect(
    useCallback(() => {
      if (Dimensions.get('window').width < Dimensions.get('window')?.height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
      Dimensions.addEventListener('change', ({ window: { width, height } }) => {
        if (width < height) {
          setOrientation('PORTRAIT');
        } else {
          setOrientation('LANDSCAPE');
        }
      });
    }),
  );

  const [locationData, setLocationData] = useState();

  if (status === '' || CmsReducer.status !== status) {
    switch (CmsReducer.status) {
      case 'CMS/userLocationReq':
        status = CmsReducer.status;
        setIsApiCall(true);
        break;
      case 'CMS/userLocationSucces':
        status = CmsReducer.status;
        setIsApiCall(false);
        setLocationData(CmsReducer?.userLocationListRes?.data);
        console.log(
          CmsReducer?.userLocationListRes?.data,
          'CmsReducer?.getPlayerRes?.data)',
        );
        let tempPlayer = [];
        CmsReducer?.userLocationListRes?.data?.map(item => {
          tempPlayer.push(item?._id);
        });
        setNotSearchLocation(tempPlayer);
        break;
      case 'CMS/userLocationFailure':
        status = CmsReducer.status;
        setIsApiCall(false);
        break;
      case 'CMS/searchLocationListReq':
        status = CmsReducer.status;
        break;
      case 'CMS/searchLocationListSucces':
        status = CmsReducer.status;
        setSearchLocationData(CmsReducer?.searchLocationListres?.data);
        break;
      case 'CMS/searchLocationListFailure':
        status = CmsReducer.status;
        break;
      case 'CMS/addToLocationReq':
        status = CmsReducer.status;
        break;
      case 'CMS/addToLocationSucces':
        status = CmsReducer.status;
        dispatch(userLocationReq());
        let temp = [...searchLocationData];
        temp?.splice(addresIndex, 1);
        setSearchLocationData(temp);

        break;
      case 'CMS/addToLocationFailure':
        status = CmsReducer.status;
        break;
    }
  }
  const renderTeam = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={[styles.userInfo, styles.rowContainer, styles.contentCenter]}
          onPress={() => {
            props.navigation.navigate('DeleteLocation', {
              item: item,
            });
          }}>
          <View style={styles.userMetaInfo}>
            <Text style={styles.profileName}>{item?.title}</Text>
            <Text style={styles.userNames}>{item?.address}</Text>
          </View>
          {item?.locationtype == 'Private' && (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('DeleteLocation', {
                  type: 'edit',
                  item: item,
                });
              }}>
              <Image source={Icons.editIcon} style={styles.editIcon} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        {index + 1 != locationData?.length && (
          <Separator dividerStyle={{ marginVertical: normalize(5) }} />
        )}
      </>
    );
  };
  const ProfileReducer = useSelector(state => state?.ProfileReducer);
  useEffect(() => {
    dispatch(getProfileDetailsReq());
    dispatch(userLocationReq());
  }, [isFocus]);

  const searchPlayerHandle = text => {
    if (text?.trim().length > 0) {
      dispatch(
        searchLocationListReq({
          search_location: text,
          // not_search_location: notSearchLocation,
        }),
      );
      setIshow(true);
    } else {
      setIshow(false);
      // setSearchData([])
    }
  };
  const handleClear = () => {
    setSearchTerm('');
    setSearchLocationData([]);
    setIshow(false);
  };
  const renderSearchData = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.userInfo,
            styles.rowContainer,
            styles.contentCenter,
            styles.playerSearchContentWrapper,
          ]}
          onPress={() => {
            // props.navigation.navigate('PlayerDetails', {
            //   userData: item
            // });
            Keyboard.dismiss();
          }}>
          <View
            style={[
              styles.userMetaInfo,
              styles.rowContainer,
              styles.contentCenter,
              styles.contentSpaceBetween,
            ]}>
            <View style={{
              flex: 1
            }}>
              <Text style={styles.userName}>{item?.title}</Text>
              <Text style={styles.userNames}>{item?.city}</Text>

            </View>
            {
              !item?.is_added_by_user && (
                <TouchableOpacity
                  onPress={() => {


                    dispatch(addToLocationReq({ location_id: item?._id }));
                    setAddresIndex(index)


                  }}
                  style={{
                    // width: 50,
                    // height: 50,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    backgroundColor: Colors.themeBlue,
                    paddingHorizontal: normalize(9),
                    paddingVertical: normalize(2),
                    borderRadius: normalize(5),
                  }}>
                  <Text
                    style={{
                      color: Colors.blue,
                      fontSize: normalize(11),
                      fontFamily: Fonts.robotoMedium,
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              )
            }

          </View>
        </TouchableOpacity>
        {index + 1 != locationData?.length && (
          <Separator dividerStyle={{ marginVertical: normalize(5) }} />
        )}
      </>
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
        <Loader visible={CmsReducer.status === 'CMS/addToLocationReq'} />
        <View style={[css.mainScreen]}>
          <View
          // scrollEnabled={false}
          // behavior={Platform.OS == 'ios' ? 'position' : null}

          >
            <ImageBackground
              style={[
                css.mainContainer,
                //  { paddingBottom: normalize(50) }
              ]}
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
                        ProfileReducer?.getProfileDetailsRes?.data?.profile_pic
                          ? {
                            uri: `${constants.Media_Url}/uploads/user/profile_pic/${ProfileReducer?.getProfileDetailsRes?.data?.profile_pic}`,
                          }
                          : Images.noUser
                      }
                      style={styles.profile}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>

              <ScrollView
                nestedScrollEnabled={true}
                contentContainerStyle={{
                  paddingBottom:
                    Platform.OS == 'android'
                      ? normalize(55)
                      : Platform?.isPad
                        ? normalize(60)
                        : normalize(85),
                  paddingHorizontal: normalize(20),
                }}
                style={[styles.flexContainer]}
                showsVerticalScrollIndicator={false}>
                <View
                  style={[
                    styles.rowContainer,
                    styles.contentSpaceBetween,
                    css.py2,
                    css.mt1,
                  ]}>
                  <Text style={styles.playerTxt}>My Favorite Locations</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddLocation');
                    }}>
                    <Image
                      style={styles.addRound}
                      source={Icons_Manish.addRound}
                    />
                  </TouchableOpacity>
                </View>

                <Input
                  leftIcon={Icons.search}
                  rightIcon={isShow ? Icons.error : null}
                  placeholder="Search Location here.."
                  placeholderTextColor="#ffffff40"
                  // containerStyle={[css.mb3, css.mt3]}

                  containerStyle={[isShow ? css.mb0 : css.mb2, css.mt2]}
                  value={searchTerm}
                  titleStyle={styles.titleStyle}
                  leftIconStyle={styles.leftIconStyle}
                  rightIconStyle={styles.rightIconStyle}
                  isPressableRightIcon={true}
                  onChangeText={text => {
                    setSearchTerm(text);
                    searchPlayerHandle(text);
                  }}
                  onPress={() => {

                    handleClear();
                  }}
                  inputWrapper={[
                    isShow && {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    },
                  ]}
                />
                {isShow && (
                  <FlatList
                    nestedScrollEnabled={true}
                    data={searchLocationData}
                    renderItem={renderSearchData}
                    keyExtractor={item => item?.id}
                    contentContainerStyle={styles.searchDropDown}
                    style={{ maxHeight: 400 }}
                    onPointerLeave={() => {
                      console.log('asjakjsjk');
                    }}
                    ListEmptyComponent={() => {
                      return (
                        <View style={styles.ListEmptyComponentStyle}>
                          <Text style={styles.ListEmptyTextStyle}>
                            No Location Found
                          </Text>
                        </View>
                      );
                    }}
                  />
                )}
                <View style={[styles.rowContainer, styles.rowSpaceBetween, styles.w100Percent]}>
                  <TouchableOpacity
                    style={[
                      styles.filterBox,
                      {
                        backgroundColor:
                          activeIndex == 0 ? '#54d4d2' : '#413a89',
                       flex:1
                      },
                    ]}
                    onPress={() => {
                      setActiveIndex(0);
                      setFilterByType('Public')
                     
                    }}>
                    <Text
                      style={[
                        styles.filtextName,
                        {
                          color: activeIndex == 0 ? '#000000' : '#fff',
                        },
                      ]}>
                      Public
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filterBox,
                      {
                        backgroundColor:
                          activeIndex == 1 ? '#54d4d2' : '#413a89',
                       flex:1,
                       marginLeft: normalize(5)
                      },
                    ]}
                    onPress={() => {
                      setActiveIndex(1);
                      setFilterByType('Private')
                    }}>
                    <Text
                      style={[
                        styles.filtextName,
                        {
                          color: activeIndex == 1 ? '#000000' : '#fff',
                        },
                      ]}>
                      Private
                    </Text>
                  </TouchableOpacity>
                </View>
                <Separator dividerStyle={{ marginVertical: normalize(5) }} />
                {isApiCall ? (
                  <Loader {...props} />
                ) : (
                  <FlatList
                    nestedScrollEnabled={true}
                    data={locationData?.filter(item => item.locationtype == filterBy)}
                    renderItem={item => renderTeam(item)}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                      paddingVertical: normalize(10),
                      paddingBottom: Platform.isPad
                        ? orientation == 'PORTRAIT'
                          ? normalize(20)
                          : normalize(310)
                        : normalize(100),
                    }}
                    ListEmptyComponent={() => {
                      return (
                        <View style={styles.ListEmptyComponentStyle}>
                          <Text style={styles.ListEmptyTextStyle}>
                           {`You haven’t added any ${filterBy} locations yet.`}
                          </Text>
                        </View>
                      );
                    }}
                  />
                )}
              </ScrollView>
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
  filterBox: {
    alignItems: 'center',
    paddingVertical: normalize(8),
    borderRadius: normalize(4),
  },
  filtextName: {
    fontSize: normalize(10),
    fontFamily: Fonts.robotoMedium,
  },
  contentSpaceBetween: {
    justifyContent: 'space-between',
  },
  screenHeader: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(3),
  },
  addRound: {
    height: normalize(21),
    width: normalize(21),
  },
  addRound1: {
    height: normalize(15),
    width: normalize(15),
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
  profileWrapper: {
    height: normalize(40),
    width: normalize(40),
    justifyContent: 'center',
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
  playerTxt: {
    color: '#FFF',
    fontSize: normalize(14),
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
    width: normalize(55),
    height: normalize(55),
    resizeMode: 'contain',
    borderWidth: normalize(2),
    borderColor: '#5f5b99',
    borderRadius: normalize(55) / 2,
  },
  userInfo: {
    alignSelf: 'flex-start',
    paddingVertical: normalize(5),
  },

  profileName: {
    fontFamily: Fonts.robotoMedium,
    color: '#FFF',
    fontSize: normalize(14),
    textTransform: 'capitalize',
  },
  userName: {
    fontFamily: Fonts.robotoRegular,
    color: '#D4D4D4',
    fontSize: normalize(14),
    fontWeight: 'bold'
  },
  userNames: {
    fontFamily: Fonts.robotoRegular,
    color: '#D4D4D4',
    fontSize: normalize(10),
    // fontWeight:'bold'
  },


  userMetaInfo: {
    marginLeft: normalize(8),
    flex: 1,
  },
  leftIconStyle: {
    tintColor: '#FFF',
  },
  rightIconStyle: {
    tintColor: Colors.actionText,
    height: normalize(21),
    width: normalize(21),
    margin: 0,
  },
  playerSearchContentWrapper: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
  },
  searchDropDown: {
    backgroundColor: '#594695',
  },
  playerName: {
    color: '#FFF',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
  },

  ListEmptyComponentStyle: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
  },
  ListEmptyTextStyle: {
    color: '#FFF',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
  },
  editIcon: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: 'contain'
  }

});

export default LocationList;
