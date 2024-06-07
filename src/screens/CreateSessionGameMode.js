import React, { useCallback, useEffect, useState } from 'react';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';
import Input from '../components/Input';
import NumberInput from '../components/NumberInput';
import Modal from 'react-native-modal';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import CustomToast from '../utils/helpers/CustomToast';
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

import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SessionReducer, {
  addSessionDetailsReq,
  addSessionDetailsSuccess,
  getGameDetailsReq,
} from '../redux/reducer/SessionReducer';
import { useSelector, useDispatch } from 'react-redux';
import SessionHistory from './SessionHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomNoButton from '../components/CustomNoButton';

let status1 = ''
const CreateSessionGameMode = props => {

  let propsData = props?.route.params?.propsData

  const [showDropDown, setShowDropDown] = useState(false);
  const [team, setTeam] = useState(propsData?.noofplayer >= 3 ? propsData?.noofplayer : '');
  const [courts, setCourts] = useState(propsData?.noofcourt >= 1 ? propsData?.noofcourt : '');
  const [isModalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [gameMode, setGameMode] = useState('Round Robin Doubles');
  const [dynamicGame, setDynamicGame] = useState('');
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [flagValue, setFlagValue] = useState(propsData?.noofplayer >= 3 ? propsData?.noofplayer : '')
  const [numberOfCourt, setNumberOfCourt] = useState([]);
  const dispatch = useDispatch();
  const [isFocus, setIsFocus] = useState(false);
  const isFocused = useIsFocused()
  const { CreateSessionLocation } = props?.route.params;
  const SessionReducer = useSelector(state => state.SessionReducer);

  console.log(propsData, 'CreateSessionLocationCreateSessionLocation', CreateSessionLocation)
  const Session = useSelector(state => state.SessionReducer);
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

  const validationChecking = (players, validCourt, court, flag) => {
    if (court == '') {
      CustomToast('Please select court');
      return false;
    }
    let courtLength = validCourt.length;
    if (courtLength == 1) {
      if (court == validCourt[0]) {
        onNext(flag);
      } else {
        errorShow(players, validCourt);
      }
    } else {
      if (court == validCourt[0] || court == validCourt[1]) {
        onNext(flag);
      } else {
        errorShow(players, validCourt);
      }
    }
  };

  const NavigateToNext = () => {
    if (gameMode == '') {
      CustomToast('Game mode is required');
      return false;
    }
    if (team == '') {
      CustomToast('Please Select player number');
      return false;
    }
    teamCourtsCountChecking();
  };

  const teamCourtsCountChecking = flag => {
    try {
      if (team >= 3 && team <= 6) {
        if (team == 6) {
          validationChecking(team, [1, 2], courts, flag);
          console.log('court 1||2');
        } else {
          validationChecking(team, [1], courts, flag);
          console.log('court 1');
        }
      } else if (team >= 7 && team <= 11) {
        if (team == 9 || team == 10 || team == 11) {
          validationChecking(team, [2, 3], courts, flag);
        } else {
          validationChecking(team, [2], courts, flag);
        }
      } else if (team >= 12 && team <= 14) {
        if (team == 14) {
          validationChecking(team, [3, 4], courts, flag);
        } else {
          validationChecking(team, [3], courts, flag);
        }
      } else if (team >= 15 && team <= 18) {
        if (team == 18) {
          validationChecking(team, [4, 5], courts, flag);
        } else {
          validationChecking(team, [4], courts, flag);
        }
      } else if (team >= 19 && team <= 22) {
        if (team == 22) {
          validationChecking(team, [5, 6], courts, flag);
        } else {
          validationChecking(team, [5], courts, flag);
        }
      } else if (team >= 23 && team <= 26) {
        if (team == 26) {
          validationChecking(team, [6, 7], courts, flag);
        } else {
          validationChecking(team, [6], courts, flag);
        }
      } else {
        console.log('error>>>>');
      }
    } catch (error) {
      console.log('teamCourtsCountChecking', error);
    }
  };
  const errorShow = (players, validCourt) => {
    let courtLength = validCourt.length;
    if (courtLength == 1) {
      CustomToast(`For ${players} players only ${validCourt[0]} court allowed`);
    } else {
      CustomToast(
        `For ${players} players only ${validCourt[0]} or ${validCourt[1]}  courts allowed`,
      );
    }
  };

  const dataItemValue = [
    { label: '3', value: '3', court: [{ label: '1', value: '1' }] },
    { label: '4', value: '4', court: [{ label: '1', value: '1' }] },
    { label: '5', value: '5', court: [{ label: '1', value: '1' }] },
    {
      label: '6',
      value: '6',
      court: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ],
    },
    { label: '7', value: '7', court: [{ label: '2', value: '2' }] },
    { label: '8', value: '8', court: [{ label: '2', value: '2' }] },
    {
      label: '9',
      value: '9',
      court: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },
    {
      label: '10',
      value: '10',
      court: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },
    {
      label: '11',
      value: '11',
      court: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },
    { label: '12', value: '12', court: [{ label: '3', value: '3' }] },
    { label: '13', value: '13', court: [{ label: '3', value: '3' }] },
    {
      label: '14',
      value: '14',
      court: [
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    { label: '15', value: '15', court: [{ label: '4', value: '4' }] },
    { label: '16', value: '16', court: [{ label: '4', value: '4' }] },
    { label: '17', value: '17', court: [{ label: '4', value: '4' }] },
    {
      label: '18',
      value: '18',
      court: [
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ],
    },
    { label: '19', value: '19', court: [{ label: '5', value: '5' }] },
    { label: '20', value: '20', court: [{ label: '5', value: '5' }] },
    { label: '21', value: '21', court: [{ label: '5', value: '5' }] },
    {
      label: '22',
      value: '22',
      court: [
        { label: '5', value: '5' },
        { label: '6', value: '6' },
      ],
    },
    { label: '23', value: '23', court: [{ label: '6', value: '6' }] },
    { label: '24', value: '24', court: [{ label: '6', value: '6' }] },
    { label: '25', value: '25', court: [{ label: '6', value: '6' }] },
    {
      label: '26',
      value: '26',
      court: [
        { label: '6', value: '6' },
        { label: '7', value: '7' },
      ],
    },
  ];

  const onNext = flag => {
    let obj = {}

    propsData ? (
      obj = {
        action_type: 'edit',
        gametypeid: dynamicGame
          ? dynamicGame?._id
          : Session?.gameDetailsResponse?.data?.map(item =>
            item.title === gameMode ? `${item?._id}` : null,
          ),
        noofcourt: courts,
        noofplayer: team,
        locationid: CreateSessionLocation?.location_Id,
        location_link: CreateSessionLocation?.locationLink,
        date: CreateSessionLocation?.date,
        time_format: CreateSessionLocation?.time_format,
        time: CreateSessionLocation?.time,
        session_type: 'game_mode',
        session_id: propsData?._id
      }
    ) : (
      obj = {
        action_type: 'add',
        gametypeid: dynamicGame
          ? dynamicGame?._id
          : Session?.gameDetailsResponse?.data?.map(item =>
            item.title === gameMode ? `${item?._id}` : null,
          ),
        noofcourt: courts,
        noofplayer: team,
        locationid: CreateSessionLocation?.location_Id,
        location_link: CreateSessionLocation?.locationLink,
        date: CreateSessionLocation?.date,
        time_format: CreateSessionLocation?.time_format,
        time: CreateSessionLocation?.time,
        session_type: 'game_mode',
      }
    )

    flag == 1
      ? dispatch(addSessionDetailsReq(obj))
      : navigation.navigate('PlayerTeamNames', { dataItem: obj, flag: flagValue, propsData: propsData });

  };

  useEffect(() => {
    dispatch(getGameDetailsReq());
    if (propsData?.noofplayer >= 3 && propsData?.noofplayer <= 5) {
      setNumberOfCourt([{ label: '1', value: '1' }])

    }
    if (propsData?.noofplayer == 6) {
      setNumberOfCourt([
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ])

    }
    if (propsData?.noofplayer >= 7 && propsData?.noofplayer <= 8) {
      setNumberOfCourt([{ label: '2', value: '2' }])

    }
    if (propsData?.noofplayer >= 7 && propsData?.noofplayer <= 8) {
      setNumberOfCourt([{ label: '2', value: '2' }])

    }
    if (propsData?.noofplayer >= 9 && propsData?.noofplayer <= 11) {
      setNumberOfCourt([
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ])

    }
    if (propsData?.noofplayer >= 12 && propsData?.noofplayer <= 13) {
      setNumberOfCourt([{ label: '3', value: '3' }])

    }

    if (propsData?.noofplayer == 14) {
      setNumberOfCourt([
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ])

    }

    if (propsData?.noofplayer >= 15 && propsData?.noofplayer <= 17) {
      setNumberOfCourt([{ label: '4', value: '4' }])

    }

    if (propsData?.noofplayer == 18) {
      setNumberOfCourt([
        { label: '4', value: '4' },
        { label: '5', value: '5' },
      ])

    }

    if (propsData?.noofplayer >= 19 && propsData?.noofplayer <= 21) {
      setNumberOfCourt([{ label: '5', value: '5' }])

    }

    if (propsData?.noofplayer == 22) {
      setNumberOfCourt([
        { label: '5', value: '5' },
        { label: '6', value: '6' },
      ])

    }

    if (propsData?.noofplayer >= 23 && propsData?.noofplayer <= 25) {
      setNumberOfCourt([{ label: '6', value: '6' }])

    }
    if (propsData?.noofplayer == 26) {
      setNumberOfCourt([
        { label: '6', value: '6' },
        { label: '7', value: '7' },
      ])

    }

  }, [isFocused]);

  const SaveSessionResponse = flag => {
    if (gameMode == '') {
      setTimeout(() => {
        CustomToast('Game mode is required');
      }, 1000);
      return false;
    }
    if (team == '') {
      setTimeout(() => {
        CustomToast('Please Select player number');
      }, 1000);
      return false;
    }
    setTimeout(() => {
      teamCourtsCountChecking(flag);
    }, 1000);
  };

  const handleClear = () => {
    setGameMode('');
    setCourts('');
    setTeam('');

    navigation.navigate('Home');
  };
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
                  ]}>
                  <TouchableOpacity
                    style={styles.profileWrapper}
                    onPress={() => {
                      props.navigation.goBack();
                    }}>
                    <Image source={Icons.backArrow} style={css.backArrow} />
                  </TouchableOpacity>

                  <Text style={styles.screenTitle}>
                    Create Session - Game Mode
                  </Text>
                  <TouchableOpacity
                    style={styles.profileWrapper}
                    onPress={() => {
                      setShowDropDown(!showDropDown);
                    }}>
                    <Image source={Icons.menuIcon} style={css.menuIcon} />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
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

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom:
                    isKeyboardVisible === true
                      ? normalize(280)
                      : Platform.isPad
                        ? orientation == 'PORTRAIT'
                          ? normalize(80)
                          : normalize(360)
                        : normalize(100),
                  paddingHorizontal: normalize(20),
                }}
                style={css.mt3}>
                <View style={[styles.cardWrapper]}>
                  <View style={[styles.form, css.mt2]}>
                    {/* <Input
                      title="Enter Game Mode"
                      rightIcon={M_Icons.locationInput}
                      placeholder="Round Robin - Doubles"
                      value="Round Robin - Doubles"
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.mb3]}
                    /> */}
                    <Text style={styles.ctitleStyle}>Enter Game Mode</Text>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.dropdownWrapper, css.mb3]}>
                      <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        iconStyle={styles.iconStyle}
                        data={
                          Session?.gameDetailsResponse?.data
                            ? Session?.gameDetailsResponse?.data
                            : []
                        }
                        // search
                        maxHeight={300}
                        labelField="title"
                        valueField="title"
                        placeholder={dynamicGame ? dynamicGame : gameMode}
                        searchPlaceholder="Search..."
                        value={dynamicGame ? dynamicGame : gameMode}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setDynamicGame(item);
                          // setGameMode(item._id);
                          console.log(item?.title, '>>>>');
                          setIsFocus(false);
                          // setLocationLink(item.value);
                        }}
                        render
                        renderRightIcon={() => (
                          <Image
                            source={Icons.expandedDown}
                            style={[
                              styles.rightIcon,
                              isFocus && {
                                transform: [{ rotate: '180deg' }],
                              },
                            ]}
                          />
                        )}
                      />
                    </LinearGradient>

                    <Text style={styles.inputTitle}>
                      Enter Number Of Players
                    </Text>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.dropdownWrapper1, css.mb3]}>
                      <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={[styles.placeholderStyle, team && { color: '#FFF' }]}
                        selectedTextStyle={[styles.selectedTextStyle, team && { color: '#FFF' }]}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        iconStyle={styles.iconStyle}
                        data={dataItemValue.length > 0 ? dataItemValue : []}
                        // search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={team ? team : 'Select Players...'}
                        searchPlaceholder="Search..."
                        value={team}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setTeam(item.value);
                          setFlagValue(item?.value)
                          AsyncStorage.setItem('selectedNoOfPlayer', JSON.stringify(item.value));
                          setIsFocus(false);
                          setCourts('');
                          setNumberOfCourt(item.court, '>>>>>>>>>>');

                        }}
                        render
                        renderRightIcon={() => (
                          <Image
                            source={Icons.expandedDown}
                            style={[
                              styles.rightIcon,
                              isFocus && {
                                transform: [{ rotate: '180deg' }],
                              },
                            ]}
                          />
                        )}
                      />
                    </LinearGradient>

                    <View style={{ top: 10 }}>
                      <Text style={styles.inputTitle}>
                        Enter Number Of Courts
                      </Text>
                      <View style={[styles.form, , css.mt1]}>
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#4b4190', '#614799', '#623d95']}
                          style={[styles.dropdownWrapper1, css.mb3]}>
                          <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={[styles.placeholderStyle, courts && { color: '#FFF' }]}
                            selectedTextStyle={[styles.selectedTextStyle, courts && { color: '#FFF' }]}
                            inputSearchStyle={styles.inputSearchStyle}
                            itemTextStyle={styles.itemTextStyle}
                            iconStyle={styles.iconStyle}
                            data={numberOfCourt.length > 0 ? numberOfCourt : []}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={courts ? courts : 'Select Courts...'}
                            searchPlaceholder="Search..."
                            value={courts}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                              setCourts(item.value);
                              setIsFocus(false);
                              // setLocationLink(item.value);
                            }}
                            render
                            renderRightIcon={() => (
                              <Image
                                source={Icons.expandedDown}
                                style={[
                                  styles.rightIcon,
                                  isFocus && {
                                    transform: [{ rotate: '180deg' }],
                                  },
                                ]}
                              />
                            )}
                          />
                        </LinearGradient>
                      </View>
                    </View>
                    <Separator dividerStyle={[css.mt5, css.mb5]} />
                    <CustomButton
                      btnText="Next"
                      titleStyle={[]}
                      onPress={() => NavigateToNext()}
                    />
                  </View>
                </View>
              </ScrollView>
            </ImageBackground>
          </KeyboardAwareScrollView>
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
                          let flag = 1;
                          setModalVisible(false);
                          setShowDropDown(false);
                          SaveSessionResponse(flag);
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
                        {/* Do you want to exit Round Robin Session without saving? */}
                        Do you want to exit{'\n'}Round Robin session{'\n'}
                        without saving?
                      </Text>
                    </View>
                    <Separator />
                    <View
                      style={[
                        styles.modalAction,
                        css.rowBetween,
                        css.px4,
                        css.py4,
                      ]}>
                      <CustomButton
                        btnText="Yes"
                        containerStyle={[css.f1, css.mr3]}
                        onPress={() => {
                          setModalVisible(false);
                          setShowDropDown(false);
                          props?.navigation?.navigate('BottomTab', {
                            screen: 'HomeStackScreen',
                            params: {
                              screen: 'Home',
                            },
                          })
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
    // textTransform: "capitalize",
    textAlign: 'center',
  },
  modalWrap: {
    // height: height / 1.5,
  },
  modalContainer: {
    // height: "100%"
  },
  rightText: {
    marginLeft: normalize(10),
    color: Colors.actionText,
    fontFamily: Fonts.robotoMediumItalic,
    fontSize: normalize(14),
  },
  numberInputStyle: {
    width: normalize(90),
  },
  inputTitle: {
    color: '#fff',
    fontFamily: Fonts.robotoMedium,
    fontSize: Platform.OS === 'android' ? normalize(14) : normalize(12),
  },
  screenHeader: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(2),
  },
  profileWrapper: {
    height: normalize(40),
    justifyContent: 'center',
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
  profile: {
    height: normalize(38),
    width: normalize(38),
    borderRadius: normalize(38) / 2,
    resizeMode: 'contain',
    borderWidth: normalize(2),
    borderColor: '#403988',
    borderRadius: normalize(40) / 2,
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
  modalInner: {
    width: '100%',
  },
  dropdownWrapper: {
    borderRadius: normalize(15),
    borderRadius: normalize(10),
    height: normalize(40),
    justifyContent: 'center',
  },
  dropdownWrapper1: {
    borderRadius: normalize(15),
    borderRadius: normalize(10),
    height: normalize(40),
    justifyContent: 'center',
    top: normalize(11),
  },
  mb3: {
    marginBottom: normalize(16),
  },
  ctitleStyle: {
    color: '#fff',
    fontFamily: Fonts.robotoMedium,
    fontSize: Platform.OS === 'android' ? normalize(14) : normalize(12),
    marginBottom: normalize(10),
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
  itemTextStyle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#000',
    padding: 0,
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
});

export default CreateSessionGameMode;
