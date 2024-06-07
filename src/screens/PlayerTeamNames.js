import React, { useCallback, useEffect, useState } from 'react';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';
import Input from '../components/Input';
import NumberInput from '../components/NumberInput';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
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
  Keyboard,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayerReq, searchPlayerListReq } from '../redux/reducer/CmsReducer';
import { FlatList } from 'react-native-gesture-handler';
import constants from '../utils/helpers/constants';
import Loader from '../components/Loader';
import CustomToast from '../utils/helpers/CustomToast';
import {
  addSessionDetailsReq,
  addCourtsDetailsReq,
} from '../redux/reducer/SessionReducer';
import LinearGradient from 'react-native-linear-gradient';
import { MultiSelect } from 'react-native-element-dropdown';
import CustomNoButton from '../components/CustomNoButton';
let status = '';
let status1 = '';
const PlayerTeamNames = props => {
  console.log(selectedPlayer, 'data');
  let propsData = props?.route.params?.propsData
  const CmsReducer = useSelector(state => state.CmsReducer);

  const SessionReducer = useSelector(state => state.SessionReducer);

  const [searchData, setSearchData] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [time, setTime] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isShow, setIshow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notSearchUser, setNotSearchUser] = useState('');
  const [isPlyerModal, setIsPlyerModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(propsData ? propsData?.players : []);
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [isApiCall, setIsApiCall] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [location, setLocation] = useState('');
  const [playerData, setPlayerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  var flags;
  const { dataItem } = props?.route?.params;

  console.log(propsData?.players, 'propsDatapropsData')
  let flag = dataItem?.noofplayer;
  console.log(dataItem, 'dataItem', flag);

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    setSelectedPlayer([...array]);
    // return array;
  }

  useFocusEffect(
    useCallback(() => {
      if (Dimensions.get('window').width < Dimensions.get('window')?.height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
      const subscription = Dimensions.addEventListener(
        'change',
        ({ window: { width, height } }) => {
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
  useEffect(() => {
    dispatch(getPlayerReq());
    dispatch(addCourtsDetailsReq({ locationid: dataItem?.locationid }));
    // RemovePlayerOnSelectNew();
  }, [isFocus]);

  if (status === '' || CmsReducer.status !== status) {
    switch (CmsReducer.status) {
      case 'CMS/getPlayerReq':
        status = CmsReducer.status;
        setIsApiCall(true);
        break;
      case 'CMS/getPlayerSucces':
        status = CmsReducer.status;
        setIsApiCall(false);
        setPlayerData(CmsReducer?.getPlayerRes?.data);

        console.log(
          CmsReducer?.getPlayerRes?.data,
          'CmsReducer?.getPlayerRes?.data)',
        );
        let tempPlayer = [];
        CmsReducer?.getPlayerRes?.data?.map(item => {
          tempPlayer.push(item?.paddletap_id);
        });
        setNotSearchUser(tempPlayer);
        break;
      case 'CMS/getPlayerFailure':
        status = CmsReducer.status;
        setIsApiCall(false);
        break;
      case 'CMS/searchPlayerListReq':
        status = CmsReducer.status;
        break;
      case 'CMS/searchPlayerListSucces':
        status = CmsReducer.status;
        setSearchData(CmsReducer?.searchPlayerListRes?.data);
        break;
      case 'CMS/searchPlayerListFailure':
        status = CmsReducer.status;
        break;
      case 'CMS/addToPlayerReq':
        status = CmsReducer.status;
        break;
      case 'CMS/addToPlayerSucces':
        status = CmsReducer.status;
        dispatch(getPlayerReq());
        break;
      case 'CMS/addToPlayerFailure':
        status = CmsReducer.status;
        break;
    }
  }
  if (status1 === '' || SessionReducer.status !== status1) {
    switch (SessionReducer.status) {
      case 'Session/addSessionDetailsReq':
        status1 = SessionReducer.status;
        // setIsApiCall(true);
        break;
      case 'Session/addSessionDetailsSuccess':
        status1 = SessionReducer.status;
        props?.navigation?.navigate('BottomTab', {
          screen: 'HomeStackScreen',
          params: {
            screen: 'Home',
          },
        })
        break;
      case 'Session/addSessionDetailsFailure':
        status1 = SessionReducer.status;
        break;
    }
  }

  const searchPlayerHandle = text => {
    if (text?.trim().length > 0) {
      dispatch(
        searchPlayerListReq({
          search_user: text,
          not_search_user: selectedPlayer?.map(item => item?.paddletap_id),
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
    setSearchData([]);
    setIshow(false);
  };
  const handleClear1 = () => {
    setSelectedPlayer('');
    navigation.navigate('Home');
  };

  const navigateToNext = () => {
    if (selectedPlayer.length === 0) {
      CustomToast('Please select players');
      return false;
    } else if (selectedPlayer.length < dataItem?.noofplayer) {
      const playersToAdd = dataItem?.noofplayer - selectedPlayer.length;
      CustomToast(
        `Please add ${playersToAdd} more player${playersToAdd !== 1 ? 's' : ''
        }`,
      );
      return false;
    } else if (selectedPlayer.length > dataItem?.noofplayer) {
      const playersToRemove = selectedPlayer?.length - dataItem?.noofplayer;
      CustomToast(
        `Please remove ${playersToRemove} player${playersToRemove !== 1 ? 's' : ''
        }`,
      );
      return false;
    }

    let data = {
      action_type: 'add',
      gametypeid: dataItem?.gametypeid,
      noofcourt: dataItem?.noofcourt,
      noofplayer: dataItem?.noofplayer,
      locationid: dataItem?.locationid,
      location_link: dataItem?.location_link,
      date: dataItem?.date,
      time_format: dataItem?.time_format,
      time: dataItem?.time,
      players: selectedPlayer,
      session_type: 'player',
    };

    navigation.navigate('CourtNumberName',
      {
        dataItemValue: data,
        propsData: propsData
      }
    );
  };

  const SaveSessionResponse = () => {
    let tempArr = [];
    selectedPlayer.map(item => {
      let obj = {
        _id: item._id,
      };
      tempArr.push(obj);
    });

    if (selectedPlayer.length === 0) {
      setTimeout(() => {
        CustomToast('Please select players');
      }, 1000);
      return false;
    } else if (selectedPlayer.length < dataItem?.noofplayer) {
      const playersToAdd = dataItem?.noofplayer - selectedPlayer.length;
      setTimeout(() => {
        CustomToast(
          `Please add ${playersToAdd} more player${playersToAdd !== 1 ? 's' : ''
          }`,
        );
      }, 1000);
      return false;
    } else if (selectedPlayer.length > dataItem?.noofplayer) {
      const playersToRemove = selectedPlayer?.length - dataItem?.noofplayer;
      setTimeout(() => {
        CustomToast(
          `Please remove ${playersToRemove} player${playersToRemove !== 1 ? 's' : ''
          }`,
        );
      }, 1000);
      return false;
    } else {
      let obj = {}

      propsData ? (
        obj = {
          action_type: 'edit',
          gametypeid: dataItem?.gametypeid,
          noofcourt: dataItem?.noofcourt,
          noofplayer: dataItem?.noofplayer,
          locationid: dataItem?.locationid,
          location_link: dataItem?.location_link,
          date: dataItem?.date,
          time_format: dataItem?.time_format,
          time: dataItem?.time,
          players: tempArr,
          session_type: 'player',
          session_id: propsData?._id
        }
      ) : (
        obj = {
          action_type: 'add',
          gametypeid: dataItem?.gametypeid,
          noofcourt: dataItem?.noofcourt,
          noofplayer: dataItem?.noofplayer,
          locationid: dataItem?.locationid,
          location_link: dataItem?.location_link,
          date: dataItem?.date,
          time_format: dataItem?.time_format,
          time: dataItem?.time,
          players: tempArr,
          session_type: 'player',
        }
      )



      dispatch(addSessionDetailsReq(obj));
    }
  };

  //add player
  const selectPlayer = player => {
    const updatedPlayers = [...selectedPlayer, player];
    setSelectedPlayer(updatedPlayers);
    AsyncStorage.setItem('selectedPlayers', JSON.stringify(updatedPlayers))
      .then(() => {
        // console.log('Player added to AsyncStorage:', player);
      })
      .catch(error => {
        // console.log('Error adding player to AsyncStorage:', error);
      });
  };
  useEffect(() => {
    AsyncStorage.getItem('selectedPlayers')
      .then(storedPlayers => {
        const players = storedPlayers ? JSON.parse(storedPlayers) : [];
        setSelectedPlayer(players);
        console.log(players, 'values');
      })
      .catch(error => { });
  }, []);

  const removePlayer = player => {
    const updatedPlayers = selectedPlayer.filter(
      p => p.paddletap_id !== player.paddletap_id,
    );
    setSelectedPlayer(updatedPlayers);
    // setPlayerData(updatedPlayers);
    AsyncStorage.setItem('selectedPlayers', JSON.stringify(updatedPlayers))
      .then(() => {
        // console.log('Player removed from AsyncStorage:', player);
      })
      .catch(error => {
        // console.log('Error removing player from AsyncStorage:', error);
      });
  };

  const filteredData = playerData?.filter(item => {
    const isItemInSelectedPlayer = selectedPlayer.find(
      selectedItem => selectedItem?.paddletap_id === item?.paddletap_id,
    );
    return !isItemInSelectedPlayer;
  });

  const renderTeam = ({ item, index }) => {
    return (
      <>
        <Input
          leftIcon={M_Icons.user}
          // placeholder="Christopher"
          placeholderTextColor="#ffffff40"
          containerStyle={[css.mb3]}
          value={item?.full_name}
          rightIcon={Icons.deleteIcon}
          isEditable={false}
          onPress={() => {
            let temp = [...selectedPlayer];
            temp?.splice(index, 1);
            removePlayer(item);
            setSelectedPlayer(temp);
            let a = [item, ...playerData];
            setPlayerData(a);
            // handleDeleteItem(item?.paddletap_id);
            notSearchUser.pop(item?.paddletap_id);
          }}
          isPressableRightIcon={true}
        />
      </>
    );
  };

  const renderSearchData = ({ item, index }) => {


    return (
      <>
        <View
          style={[
            styles.userInfo,
            styles.rowContainer,
            styles.contentCenter,
            styles.playerSearchContentWrapper,
          ]}>
          <Image
            style={styles.userProfile}
            source={
              item?.profile_pic
                ? {
                  uri: `${constants.Media_Url}/uploads/user/profile_pic/${item?.profile_pic}`,
                }
                : Images.noUser
            }
          />

          <View
            style={[
              styles.userMetaInfo,
              styles.rowContainer,
              styles.contentCenter,
              styles.contentSpaceBetween,
            ]}>
            <View>
              <Text style={styles.profileName}>{item?.full_name}</Text>
              <Text style={styles.userName}>{item?.city}</Text>
              <Text style={styles.userName}>{item?.paddletap_id}</Text>
            </View>
            {selectedPlayer.length != Number(dataItem?.noofplayer) ? (
              <TouchableOpacity
                onPress={() => {
                  let temp = [...searchData];
                  let temp1 = [...playerData];
                  // dispatch(addToPlayerReq({email: item?.email}));
                  temp?.splice(index, 1);
                  temp1?.splice(index, 1);
                  setSearchData(temp);
                  setPlayerData(temp1);
                  setSelectedPlayer([...selectedPlayer, item]);
                  notSearchUser.push(item?.paddletap_id);
                  selectPlayer(item);
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
                }}
              //  disabled={}
              >
                <Text
                  style={{
                    color: Colors.blue,
                    fontSize: normalize(11),
                    fontFamily: Fonts.robotoMedium,
                  }}>
                  Add
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  CustomToast('You have exceeded the number of players entered on the previous screen');
                  setTimeout(() => {
                    setIsPlyerModal(false);
                  }, 1000);
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
                }}
              //  disabled={}
              >
                <Text
                  style={{
                    color: Colors.blue,
                    fontSize: normalize(11),
                    fontFamily: Fonts.robotoMedium,
                  }}>
                  Add
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {index + 1 != playerData?.length && (
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
        <View style={[css.mainScreen]}>
          <View style={{ flex: 1 }}>
            <ImageBackground
              style={[css.mainContainer]}
              resizeMode="stretch"
              source={Images.bg2}>
              <Header
                showBackArrow={true}
                {...props}
                onPress={() => setShowDropDown(!showDropDown)}
                // title="Create RR Session - Player/Team Names"
                title={'Create RR Session - Player Names'}
              />

              {showDropDown ? (
                <ImageBackground
                  source={M_Icons.dropDownbg}
                  style={[styles.dropDownStyle]}>
                  <View style={[css.p3, styles.ddInternal]}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                        setShowContent(true);
                        setShowDropDown(false);
                      }}
                      style={[
                        css.center,
                        styles.menuWrap,
                        !Platform?.isPad && { marginTop: normalize(4) },
                      ]}>
                      <Text style={[styles.menuText]}>
                        Save Partial Session
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                        setShowContent(false);
                        setShowDropDown(false);

                      }}
                      style={[css.center, styles.menuWrap1]}>
                      <Text style={[styles.menuText, styles.corolrTheme]}>
                        Exit Session Without Saving
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              ) : null}
              {/* <ScrollView
                style={[styles.flexContainer, styles.ph10]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentCenter}> */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom:
                    isKeyboardVisible === true
                      ? normalize(230)
                      : Platform.isPad
                        ? orientation == 'PORTRAIT'
                          ? normalize(80)
                          : normalize(360)
                        : normalize(150),
                  paddingHorizontal: normalize(20),
                }}
                style={css.mt3}>
                <View style={[styles.cardWrapper]}>
                  <View style={[css.py2, { zIndex: -1 }]}>
                    <TouchableOpacity
                      style={[styles.randomBtn]}
                      onPress={() => {
                        selectedPlayer?.length > 0
                          ? shuffle(selectedPlayer)
                          : CustomToast('Please add player first');
                      }}>
                      <Text style={[styles.randomText]}>Randomize</Text>
                    </TouchableOpacity>
                  </View>
                  <Separator
                    dividerStyle={[
                      { zIndex: -1, borderTopColor: '#fff', opacity: 0.3 },
                    ]}
                  />
                  <View style={[styles.form]}>
                    <Text style={styles.ctitleStyle}>Player List</Text>

                    <Separator dividerStyle={{ marginVertical: normalize(5) }} />
                    {isApiCall ? (
                      <Loader {...props} />
                    ) : (
                      <FlatList
                        nestedScrollEnabled={true}
                        data={selectedPlayer}
                        extraData={selectedPlayer}
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
                                You haven't added any players yet.
                              </Text>
                            </View>
                          );
                        }}
                      />
                    )}



                    <Separator
                      dividerStyle={[css.mb5, { marginTop: normalize(-15) }]}
                    />

                    {selectedPlayer.length < dataItem?.noofplayer && (
                      <TouchableOpacity
                        style={[css.row, css.mb5]}
                        onPress={() => {
                          setIsPlyerModal(true);
                        }}>
                        <Image
                          source={M_Icons.addRound}
                          style={[styles.addbtnStyle]}
                        />
                        <Text style={[css.ml2, styles.addTextStyle]}>
                          Add Players
                        </Text>
                      </TouchableOpacity>
                    )}

                    <CustomButton
                      btnText="Next"
                      titleStyle={[]}
                      value1={selectedPlayer?.length}
                      value2={Number(dataItem?.noofplayer)}
                      onPress={() => {
                        navigateToNext();
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
        </View>
      </SafeAreaView>

      <Modal isVisible={isModalVisible}>
        <View style={[styles.modalWrap]}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'position' : null}>
            <ImageBackground
              style={styles.modalContainer}
              resizeMode="stretch"
              source={Images.modalBg}>
              <ScrollView
                style={[styles.flexContainer, styles.ph10]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentCenter}>
                {showContent ? (
                  <View style={[styles.modalInner, css.p2]}>
                    <View style={[styles.modalBody, css.center]}>
                      <Text style={[styles.modalBodyText]}>
                        Do you want to save this{'\n'}Round Robin session?
                      </Text>
                    </View>
                    <Separator />
                    <View
                      style={[
                        styles.modalAction,
                        css.rowBetween,
                        css.px4,
                        css.p5,
                      ]}>
                      <CustomButton
                        btnText="Yes"
                        containerStyle={[css.f1, css.mr3]}
                        onPress={() => {
                          setModalVisible(false);
                          setShowDropDown(false);
                          SaveSessionResponse();
                        }}
                      />
                      <CustomNoButton
                        btnText="No"
                        containerStyle={[
                          css.f1,
                          { backgroundColor: Colors.btnPink },
                        ]}
                        onPress={() => {
                          setModalVisible(false);
                          setShowDropDown(false);
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={[styles.modalInner, css.p2]}>
                    <View style={[styles.modalBody, css.center]}>
                      <Text style={[styles.modalBodyText]}>
                        Do you want to exit{'\n'}Round Robin session{'\n'}
                        without saving?
                        {/* Do you want to exit the Round Robin session without saving? */}
                      </Text>
                    </View>
                    <Separator />
                    <View
                      style={[
                        styles.modalAction,
                        css.rowBetween,
                        css.px4,
                        css.p5,
                      ]}>
                      <CustomButton
                        btnText="Yes"
                        containerStyle={[css.f1, css.mr3]}
                        onPress={() => {
                          setModalVisible(false);
                          setShowDropDown(false);
                          handleClear1();
                        }}
                      />
                      <CustomNoButton
                        btnText="No"
                        containerStyle={[
                          css.f1,
                          { backgroundColor: Colors.btnPink },
                        ]}
                        onPress={() => {
                          setModalVisible(false);
                          setShowDropDown(false);
                        }}
                      />
                    </View>
                  </View>
                )}
              </ScrollView>
            </ImageBackground>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <Modal
        isVisible={isPlyerModal}
        // onBackdropPress={() => {
        //   setIsPlyerModal(false);
        // }}
        style={
          {
            // margin: 0,dd
          }
        }>
        <Loader visible={CmsReducer.status === 'CMS/getPlayerReq'} />

        <View style={[styles.modalWrap]}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'position' : null}>
            <ScrollView
              style={[styles.flexContainer, styles.ph10]}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentCenter}>
              <View
                style={[
                  styles.modalInner,
                  css.p2,
                  {
                    marginTop: normalize(50),
                    borderRadius: normalize(10),
                  },
                ]}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: normalize(-22),
                    right: normalize(1),
                    height: normalize(25),
                    width: normalize(25),
                    backgroundColor: 'white',
                    borderRadius: 50,
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: 'black',
                    alignItems: 'center',
                    zIndex: 11111,
                  }}
                  onPress={() => {
                    setIsPlyerModal(false);
                  }}>
                  <Image
                    source={Icons.close}
                    style={{
                      height: normalize(12),
                      width: normalize(12),
                    }}
                  />
                </TouchableOpacity>

                <View style={[styles.modalBody]}>
                  <Input
                    leftIcon={Icons.search}
                    rightIcon={isShow ? Icons.error : null}
                    placeholder="Search Player here.."
                    placeholderTextColor="#000"
                    //  containerStyle={[css.mb3, css.mt3]}
                    inputStyle={{ color: '#000' }}
                    containerStyle={css.mb0}
                    value={searchTerm}
                    titleStyle={styles.titleStyle}
                    leftIconStyle={styles.leftIconStyle}
                    rightIconStyle={styles.rightIconStyle}
                    isPressableRightIcon={true}
                    flag={1}
                    onChangeText={text => {
                      setSearchTerm(text);
                      searchPlayerHandle(text);
                    }}
                    onPress={() => {
                      handleClear();
                      console.log('hello');
                    }}
                    inputWrapper={{
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderWidth: 0.9,
                    }}
                  />
                  {/* {isShow && ( */}
                  <FlatList
                    nestedScrollEnabled={true}
                    data={
                      searchTerm == ''
                        ? filteredData
                        : searchData
                          ? searchData
                          : filteredData
                    }
                    renderItem={renderSearchData}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.searchDropDown}
                    style={{
                      maxHeight: 400,
                      maxWidth: '100%'
                    }}
                    onPointerLeave={() => {
                      console.log('asjakjsjk');
                    }}
                    ListEmptyComponent={() => {
                      return (
                        <View style={styles.ListEmptyComponentStyle}>
                          <Text style={styles.ListEmptyTextStyles}>
                            No Player Found
                          </Text>
                        </View>
                      );
                    }}
                  />
                  {/* )} */}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
  );
};

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

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
    fontSize: normalize(10),
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
    fontSize: normalize(12),
  },
  corolrTheme: {
    color: '#F890E7',
  },
  ddInternal: {
    // height: normalize(100),
  },
  dropdownWrapper: {
    borderRadius: normalize(15),
    borderRadius: normalize(10),
    height: normalize(40),
    justifyContent: 'center',
  },
  mb3: {
    marginBottom: normalize(1),
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
  modalBody: {},
  modalBodyText: {
    color: '#fff',
    fontSize: normalize(20),
    fontFamily: Fonts.robotoMedium,
    lineHeight: normalize(30),

    textAlign: 'center',

    // backgroundColor:'red'
  },
  modalWrap: {
    // height: height / 1.5,
  },
  modalContainer: {
    // height: '100%',
  },
  rightText: {
    marginLeft: normalize(10),
    color: Colors.btnPink,
    fontSize: normalize(14),
    fontFamily: Fonts.robotoMediumItalic,
  },
  numberInputStyle: {
    width: normalize(90),
  },
  inputTitle: {
    color: '#fff',
    fontFamily: Fonts.robotoRegular,
    fontSize: normalize(12),
  },
  placeholderStyle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#ffffff40',
    padding: 0,
  },
  selectedTextStyle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#FFFF',
    padding: 0,
  },
  inputSearchStyle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#000',
    padding: 0,
  },
  randomBtn: {
    borderWidth: 1,
    borderColor: Colors.actionText,
    alignSelf: 'flex-start',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(10),
    borderRadius: 50,
  },
  randomText: {
    color: Colors.actionText,
    letterSpacing: 2,
    fontSize: normalize(14),
    textTransform: 'uppercase',
    fontFamily: Fonts.robotoMedium,
  },
  addbtnStyle: {
    width: normalize(15),
    height: normalize(15),
    resizeMode: 'contain',
  },
  addTextStyle: {
    fontSize: normalize(14),
    color: Colors.actionText,
    fontFamily: Fonts.robotoMedium,
  },
  contentCenter: {
    alignItems: 'center',
  },
  modalInner: {
    width: '100%',
  },
  leftIconStyle: {
    tintColor: '#000',
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
    flexDirection: 'row',
    width: '100%',
  },
  searchDropDown: {
    backgroundColor: '#EFEBEC',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    // borderRadius:10,
  },
  dropdown: {
    paddingHorizontal: normalize(15),
  },
  rightIcon: {
    width: normalize(15),
    height: normalize(15),
    marginLeft: 5,
    resizeMode: 'contain',
  },
  playerName: {
    color: '#FFF',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
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
    color: '#000',
    fontSize: normalize(14),
    textTransform: 'capitalize',
  },
  userName: {
    fontFamily: Fonts.robotoRegular,
    color: '#000',
    fontSize: normalize(10),
  },
  userMetaInfo: {
    marginLeft: normalize(8),
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  ctitleStyle: {
    color: '#fff',
    fontFamily: Fonts.robotoMedium,
    fontSize: Platform.OS === 'android' ? normalize(14) : normalize(12),
    marginBottom: normalize(10),
  },

  ListEmptyComponentStyle: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
  },
  ListEmptyTextStyle: {
    color: '#fff',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
  },
  ListEmptyTextStyles: {
    color: '#000',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
  },
});

export default PlayerTeamNames;
