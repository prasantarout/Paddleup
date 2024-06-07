import React, { useCallback, useEffect, useState } from 'react';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';
import Input from '../components/Input';
import Switch from '../components/Switch';
import Modal from 'react-native-modal';
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
  Linking,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { openComposer } from 'react-native-email-link';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import CustomToast from '../utils/helpers/CustomToast';

import { useSelector, useDispatch } from 'react-redux';
import {
  addCourtsDetailsReq,
  addSessionDetailsReq,
} from '../redux/reducer/SessionReducer';
import Loader from '../components/Loader';
import CustomNoButton from '../components/CustomNoButton';
import RandomNumber from '../utils/helpers/RandomNumber';

let status1 = ''
const CourtNumberName = props => {
  let propsData = props?.route.params?.propsData

  const [showDropDown, setShowDropDown] = useState(false);
  const [isStartBtnPress, setIsStartBtnPress] = useState(false);
  const [time, setTime] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isSelected, setisSelected] = useState(propsData?.enablescoring ? propsData?.enablescoring : false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [isFocus, setIsFocus] = useState(false);
  const [courtName, setCourtName] = useState('');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState('');
  const [notSearchUser, setNotSearchUser] = useState('');
  const [courtData, setCourtData] = useState([]);
  const [selectCourt, setSelectCourt] = useState(propsData?.courts_details ? propsData?.courts_details.map((v, index) => ({
    ...v,
    isSelected: true,
    _index: index
  })) : []);
  const [selected, setSelected] = useState([]);
  const { dataItemValue } = props?.route?.params;
  const SessionReducer = useSelector(state => state.SessionReducer);
  const ProfileReducer = useSelector(state => state.ProfileReducer);


  console.log(selectCourt, 'skldklklklkl', propsData?.courts_details)
  let status = '';
  const dispatch = useDispatch();
  const isFocus1 = useIsFocused();



  // function SortCourt(data) {
  //   debugger;
  //   let tempArr = [];
  //   // let arr = SessionReducer?.courtDetailsResponse.data;
  //   SessionReducer?.courtDetailsResponse.data?.map(item => {
  //     let obj = {
  //       title: item?.title,
  //       _id: item?._id,
  //     };
  //     tempArr.push(obj);
  //   });
  //   tempArr.sort((a, b) => a.title.localeCompare(b.title));
  //   setCourtData(tempArr);
  // }

  useEffect(() => {
    let tempArr = [];
    SessionReducer?.courtDetailsResponse.data &&
      SessionReducer?.courtDetailsResponse.data?.map(item => {
        let obj = {
          title: item?.title,
          _id: item?._id,
          isSelected: propsData?.courts_details ? propsData?.courts_details.filter(item1 => item1?._id == item?._id).length > 0 : false
        };
        tempArr.push(obj);
      });
    tempArr.sort((a, b) => {
      // Extract the numeric values from the title
      const aNum = extractNumber(a.title);
      const bNum = extractNumber(b.title);

      // Compare the numeric values
      return aNum - bNum;
    });
    console.log(tempArr, 'tempArr');
    setCourtData(tempArr);
  }, [isFocus1]);

  const extractNumber = str => {
    const match = str.match(/\d+/);
    if (match) {
      return parseInt(match[0]);
    }
    return 0;
  };
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
    let courtArray = [];

    for (let i = 1; i <= 60; i++) {
      courtArray.push({
        label: `Court ${i}`,
        value: `Court ${i}`,
      });
    }
    setData(courtArray);
  }, []);

  // const StartGame1 = flag => {
  //   let tempArr = [];
  //   selectCourt &&
  //     selectCourt?.map(item => {
  //       let obj = {
  //         _id: item._id,
  //       };
  //       tempArr.push(obj);
  //     });
  //   if (courtName == '') {
  //     setTimeout(() => {
  //       CustomToast('Please select court');
  //     }, 1000);
  //     return false;
  //   } else if (isSelected == false) {
  //     setTimeout(() => {
  //       CustomToast('Please enable scoring');
  //     }, 1000);
  //     return false;
  //   } else {
  //     let obj = {
  //       action_type: 'add',
  //       session_type: 'court',
  //       locationid: dataItemValue?.locationid,
  //       location_link: dataItemValue?.location_link,
  //       date: dataItemValue?.date,
  //       time: dataItemValue?.time,
  //       time_format: dataItemValue?.time_format,
  //       gametypeid: dataItemValue?.gametypeid,
  //       noofcourt: dataItemValue?.noofcourt,
  //       noofplayer: dataItemValue?.noofplayer,
  //       players: dataItemValue?.players,
  //       courts: tempArr,
  //       enablescoring: isSelected,
  //     };
  //     console.log(obj, 'value');
  //     dispatch(addSessionDetailsReq(obj));
  //   }
  // };
  // const StartGame2 = flag => {
  //   let tempArr = [];
  //   selectCourt &&
  //     selectCourt?.map(item => {
  //       let obj = {
  //         _id: item._id,
  //       };
  //       tempArr.push(obj);
  //     });
  //   if (courtName == '') {
  //     setTimeout(() => {
  //       CustomToast('Please select court');
  //     }, 1000);
  //     return false;
  //   } else if (isSelected == false) {
  //     setTimeout(() => {
  //       CustomToast('Please enable scoring');
  //     }, 1000);
  //     return false;
  //   } else {
  //     let obj = {
  //       action_type: 'add',
  //       session_type: 'start',
  //       locationid: dataItemValue?.locationid,
  //       location_link: dataItemValue?.location_link,
  //       date: dataItemValue?.date,
  //       time: dataItemValue?.time,
  //       time_format: dataItemValue?.time_format,
  //       gametypeid: dataItemValue?.gametypeid,
  //       noofcourt: dataItemValue?.noofcourt,
  //       noofplayer: dataItemValue?.noofplayer,
  //       players: dataItemValue?.players,
  //       courts: tempArr,
  //       enablescoring: isSelected,
  //     };
  //     console.log(obj, 'value');
  //     dispatch(addSessionDetailsReq(obj));
  //   }
  //   if(SessionReducer.status==="Session/addSessionDetailsSuccess"){
  //     props?.navigation?.navigate('GameList')
  //   }
  // };

  const handleClear = () => {
    setCourtName('');
    props.navigation.navigate('Home');
  };

  // if (status === '' || SessionReducer.status !== status) {
  //   switch (SessionReducer.status) {
  //     case 'Session/addSessionDetailsReq':
  //       status = SessionReducer.status;
  //       // setIsApiCall(true);
  //       break;
  //     case 'Session/addSessionDetailsSuccess':
  //       status = SessionReducer.status;
  //       props?.navigation?.navigate('GameList');
  //       break;
  //     case 'Session/addSessionDetailsFailure':
  //       status = SessionReducer.status;
  //       break;
  //   }
  // }

  const StartGame1 = () => {
    let tempArr = [];
    selectCourt &&
      selectCourt?.map(item => {
        let obj = {
          _id: item._id,
        };
        tempArr.push(obj);
      });

    if (selectCourt?.length < dataItemValue?.noofcourt) {
      let msg = ''
      dataItemValue?.noofcourt > 1 ? (msg = `Please select ${dataItemValue?.noofcourt} courts`) : (msg = `Please select ${dataItemValue?.noofcourt} court`)
      CustomToast(msg);
      return false;
    } else {
      let obj = {}

      propsData ? (
        obj = {
          action_type: 'edit',
          session_type: 'court',
          locationid: dataItemValue?.locationid,
          location_link: dataItemValue?.location_link,
          date: dataItemValue?.date,
          time: dataItemValue?.time,
          time_format: dataItemValue?.time_format,
          gametypeid: dataItemValue?.gametypeid,
          noofcourt: dataItemValue?.noofcourt,
          noofplayer: dataItemValue?.noofplayer,
          players: dataItemValue?.players,
          courts: tempArr,
          enablescoring: isSelected,
          session_id: propsData?._id
        }
      ) : (
        obj = {
          action_type: 'add',
          session_type: 'court',
          locationid: dataItemValue?.locationid,
          location_link: dataItemValue?.location_link,
          date: dataItemValue?.date,
          time: dataItemValue?.time,
          time_format: dataItemValue?.time_format,
          gametypeid: dataItemValue?.gametypeid,
          noofcourt: dataItemValue?.noofcourt,
          noofplayer: dataItemValue?.noofplayer,
          players: dataItemValue?.players,
          courts: tempArr,
          enablescoring: isSelected,
        }
      )


      console.log(obj, 'value');
      dispatch(addSessionDetailsReq(obj));
    }
  };


  const StartGame2 = () => {
    setIsStartBtnPress(true)
    let tempArr = [];
    selectCourt &&
      selectCourt?.map(item => {
        let obj = {
          _id: item._id,
        };
        tempArr.push(obj);
      });

    if (selectCourt?.length < dataItemValue?.noofcourt) {
      let msg = ''
      dataItemValue?.noofcourt > 1 ? (msg = `Please select ${dataItemValue?.noofcourt} courts`) : (msg = `Please select ${dataItemValue?.noofcourt} court`)
      CustomToast(msg);
      return false;
    } else {
      let obj = {}



      propsData ?
        (obj = {
          action_type: 'edit',
          session_type: 'start',
          locationid: dataItemValue?.locationid,
          location_link: dataItemValue?.location_link,
          date: dataItemValue?.date,
          time: dataItemValue?.time,
          time_format: dataItemValue?.time_format,
          gametypeid: dataItemValue?.gametypeid,
          noofcourt: dataItemValue?.noofcourt,
          noofplayer: dataItemValue?.noofplayer,
          players: dataItemValue?.players,
          courts: tempArr,
          enablescoring: isSelected,
          session_id: propsData?._id
        }) : (
          obj = {
            action_type: 'add',
            session_type: 'start',
            locationid: dataItemValue?.locationid,
            location_link: dataItemValue?.location_link,
            date: dataItemValue?.date,
            time: dataItemValue?.time,
            time_format: dataItemValue?.time_format,
            gametypeid: dataItemValue?.gametypeid,
            noofcourt: dataItemValue?.noofcourt,
            noofplayer: dataItemValue?.noofplayer,
            players: dataItemValue?.players,
            courts: tempArr,
            enablescoring: isSelected,
          }
        )
      console.log(obj, 'value');
      dispatch(addSessionDetailsReq(obj));
    }

  };


  if (status1 === '' || SessionReducer.status !== status1) {
    switch (SessionReducer.status) {
      case 'Session/addSessionDetailsReq':
        status1 = SessionReducer.status;
        // setIsApiCall(true);
        break;
      case 'Session/addSessionDetailsSuccess':
        status1 = SessionReducer.status;
        isStartBtnPress ? props?.navigation?.navigate('GameList') : (props?.navigation?.navigate('BottomTab', {
          screen: 'HomeStackScreen',
          params: {
            screen: 'Home',
          },
        }))
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
      <Loader
        visible={SessionReducer.status === 'Session/addSessionDetailsReq'}
      />
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={[css.mainScreen]}>
          <KeyboardAwareScrollView
            scrollEnabled={false}
            behavior={'position'}
            keyboardVerticalOffset={-250}
            style={{ flex: 1 }}>
            <ImageBackground
              style={[css.mainContainer, { paddingBottom: normalize(50) }]}
              resizeMode="stretch"
              source={Images.bg2}>
              <Header
                showBackArrow={true}
                {...props}
                onPress={() => setShowDropDown(!showDropDown)}
                title="Create RR Session - Court Number/Name"
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

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom:
                    isKeyboardVisible === true
                      ? normalize(280)
                      : Platform.isPad
                        ? orientation == 'PORTRAIT'
                          ? normalize(20)
                          : normalize(340)
                        : normalize(100),
                  paddingHorizontal: normalize(20),
                }}
                style={css.mt3}>
                <View style={[styles.cardWrapper]}>
                  {/* <Separator dividerStyle={[{zIndex: -1}]} /> */}
                  <View style={[styles.form]}>
                    <Text style={styles.ctitleStyle}>
                      Select Court Number/Name
                    </Text>

                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.dropdownWrapper, css.mb3]}>
                      <MultiSelect
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        search
                        // data={[]}
                        data={courtData?.length > 0 ? courtData : []}
                        labelField="title"
                        valueField="title"
                        placeholder={selectCourt?.length > 0 ? 'Selected Court' : 'Select Court'}
                        searchPlaceholder="Search..."
                        value={''}
                        onChange={item => {
                          setSelected(item);
                        }}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        maxSelect={dataItemValue?.noofcourt}
                        renderItem={(d) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                let tempArr = [];
                                let msg = ''
                                let temp = JSON.parse(JSON.stringify(courtData));
                                temp[d?._index].isSelected ? (
                                  temp[d?._index].isSelected = !temp[d?._index].isSelected,
                                  setCourtData(temp),
                                  console.log(temp[d?._index].isSelected, 'saldjfskjdf'),
                                  selectCourt.splice(temp[d?._index], 1)
                                ) :
                                  (selectCourt?.length >= dataItemValue?.noofcourt ? (
                                    dataItemValue?.noofcourt > 1 ?
                                      (msg = `You can't select more than ${dataItemValue?.noofcourt} courts`) :
                                      (msg = `You can't select more than ${dataItemValue?.noofcourt} court`),
                                    CustomToast(msg)
                                  ) : (

                                    temp[d?._index].isSelected = !temp[d?._index].isSelected,
                                    setCourtData(temp),
                                    tempArr.push(d),
                                    setSelectCourt([...selectCourt, ...tempArr]),
                                    setSelected('lakslk'),
                                    console.log(temp[d?._index].isSelected, 'saldjfskjdf')
                                  ))

                              }}

                              style={styles.customDropDownView}
                            >
                              <Text
                                style={{
                                  color: d?.isSelected ? '#F890E7' : '#000',
                                  fontFamily: Fonts.robotoMedium
                                }}
                              >{d?.title}</Text>
                            </TouchableOpacity>
                          )
                        }}
                        selectedStyle={styles.selectedStyle}
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
                        flatListProps={{
                          ListEmptyComponent: () => {
                            return (
                              <View style={styles.ListEmptyComponentStyle}>
                                <Text style={styles.ListEmptyTextStyle}>
                                  No court found.
                                </Text>
                              </View>
                            );
                          },
                        }}
                      />
                    </LinearGradient>

                    <View style={styles.selectedItemWrapper}>
                      {
                        selectCourt?.map((item, index) => {
                          return (
                            <>
                              <TouchableOpacity style={styles.selectedItem}
                                onPress={() => {
                                  let temp = JSON.parse(JSON.stringify(courtData));

                                  let abc = temp.map((item1) => {
                                    if (item1?._id == item?._id) {
                                      item1.isSelected = false
                                    }
                                  })

                                  setCourtData(temp);
                                  selectCourt.splice(index, 1)
                                }}
                              >
                                <Text style={styles.selectedText}>{item?.title}</Text>
                                <Image style={styles.selectedDeleteIcon} source={Icons.deleteIcon} />
                              </TouchableOpacity >
                            </>
                          )
                        })
                      }
                    </View>

                    <Separator dividerStyle={[css.mt4, css.mb4]} />
                    <View style={[css.rowBetween]}>
                      <Text style={[css.textWhite]}>Enable Scoring</Text>
                      <Switch
                        active={isSelected}
                        textShow={false}
                        onChange={value => {
                          setisSelected(value);
                          console.log(value);
                        }}
                      />
                    </View>
                    <Separator dividerStyle={[css.mt4, css.mb5]} />
                    <CustomButton
                      btnText="Start"
                      titleStyle={[]}
                      onPress={() => {
                        StartGame2();
                      }}
                    />

                    <Text style={styles.qoutesText}>
                      If this Public Location has different court names listed
                      in the drop-down list, please send an email to
                      <Text
                        style={styles.linkText}
                        onPress={() => {
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
                        }}>
                        {`\n`}Support@PaddleTapp.com
                      </Text>{' '}
                      with the appropriate names and allow 48 hours for the
                      public court list to be updated. Thank you in advance for
                      your patience
                    </Text>
                  </View>
                </View>
              </ScrollView>

            </ImageBackground>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView >

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
                        Do you want to save this{'\n'} Round Robin session?
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
                          StartGame1();
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
                          handleClear();
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
    width: Sizes.width - normalize(16),
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
    textAlign: 'center',
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

  qoutesText: {
    fontSize: normalize(10),
    color: '#FFFF',
    fontFamily: Fonts.robotoMediumItalic,
    textAlign: 'center',
    marginTop: normalize(12),
    flexWrap: 'nowrap',
    flexShrink: 1,
  },
  linkText: {
    color: Colors.actionText,
    textDecorationLine: 'underline',
    flexWrap: 'nowrap',
  },
  rightIcon: {
    width: normalize(15),
    height: normalize(15),
    marginLeft: 5,
    resizeMode: 'contain',
  },
  dropdownWrapper: {
    borderRadius: normalize(15),
    borderRadius: normalize(10),
    height: normalize(40),
    justifyContent: 'center',
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
    color: '#FFFF',
    padding: 0,
    opacity: 0.5,
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
  inputSearchStyle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#000',
    padding: 0,
  },
  dropdown: {
    paddingHorizontal: normalize(15),
  },
  ListEmptyComponentStyle: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
  },
  ListEmptyTextStyle: {
    color: '#000',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
  },
  customDropDownView: {
    paddingHorizontal: normalize(10),
    paddingBottom: normalize(10)
  },
  selectedItemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  selectedItem: {
    backgroundColor: "#FFF",
    marginRight: normalize(5),
    borderRadius: normalize(5),
    paddingHorizontal: normalize(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(5),
    marginBottom: normalize(4)
  },
  selectedText: {
    color: '#000',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(12),
    marginRight: normalize(5)
  },
  selectedDeleteIcon: {
    height: normalize(12),
    width: normalize(12),
    resizeMode: 'contain'
  },
});

export default CourtNumberName;
