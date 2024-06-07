import React, { useCallback, useEffect, useState } from 'react';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';
import Input from '../components/Input';
import NumberInput from '../components/NumberInput';
import Modal from 'react-native-modal';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import CustomToast from '../utils/helpers/CustomToast';
import { useSelector, useDispatch } from 'react-redux';
import {
  allPublicLocationReq,
  locationListReq,
} from '../redux/reducer/CmsReducer';
import SessionReducer, {
  addSessionDetailsReq,
} from '../redux/reducer/SessionReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomNoButton from '../components/CustomNoButton';

let status = ''
let status1 = ''
const CreateSessionLocation = props => {

  let propsData = props?.route?.params?.sessionData?.sessionAvailable
  const [showDropDown, setShowDropDown] = useState(false);
  const [time, setTime] = useState(propsData ? `${propsData?.time} ${propsData?.time_format}` : '');
  const [isModalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [date, setDate] = useState(propsData ? new Date(propsData?.date) : new Date());
  const [isToday, setIsToday] = useState(true);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [location, setLocation] = useState(propsData ? { title: propsData?.locationdetails?.address, _id:propsData?.locationdetails?._id  } : '');
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');
  const [locationLink, setLocationLink] = useState(propsData?.location_link);
  const [dataItem, SetDataItem] = useState([]);
  const [dataItem1, SetDataItem1] = useState([]);
  const [format, setFormat] = useState('AM');
  const [timeVal, setTimeVal] = useState('');
  const [itemSearch, setItemSearch] = useState(false);
  const dispatch = useDispatch();
  const CreateSession = useSelector(state => state.CmsReducer);
  const SessionReducer = useSelector(state => state.SessionReducer);
  const [selected, setSelected] = useState([]);
  const [isTimeBefore, setIsTimeBefore] = useState(propsData ? false : true);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  console.log(propsData, 'propsprops')

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

  // const navigation = useNavigation();

  // function AddLocationData(){
  //   if (itemSearch !== false) {
  //     const newDataItem = [CreateSession?.allPublicLocationRes?.data, ...CreateSession.locationListRes.data];
  //     setDataItem(newDataItem);
  //   } else {
  //     setDataItem(CreateSession.locationListRes.data);
  //   }
  // }

  useEffect(() => {
    dispatch(locationListReq());
    dispatch(allPublicLocationReq());
  }, [isFocus]);

  const NavigatingToNext = () => {

    const timeString = time.toString();
    const timeArray = timeString?.split(' ');


    if (location == '') {
      CustomToast('Location is required');
      return false;
    }
    if (date == '') {
      CustomToast('Date is required');
      return false;
    }

    if (time == '') {
      CustomToast('Time is required');
      return false;
    }
    if (isToday && isTimeBefore) {
      CustomToast('Please select upcoming time');
      return false;
    }
    let obj = {
      location_Id: location?._id,
      locationLink: locationLink,
      date: moment(date).format('YYYY-MM-DD'),
      time: timeArray[0],
      time_format: timeArray[1],
      type: 'location',
    }



    props.navigation.navigate('CreateSessionGameMode', {
      CreateSessionLocation: obj,
      propsData: propsData
    });

  };

  const SaveSessionResponse = () => {
    const timeString = time.toString();
    const timeArray = timeString?.split(' ');
    if (location == '') {
      CustomToast('Location is required');
      return false;
    }
    if (date == '') {
      CustomToast('Date is required');
      return false;
    }

    if (time == '') {
      CustomToast('Time is required');
      return false;
    }
    if (isToday && isTimeBefore) {
      CustomToast('Please select upcoming time');
      return false;
    }


    let obj = {}

    propsData ? (
      obj = {
        action_type: 'edit',
        locationid: location?._id,
        location_link: locationLink,
        date: moment(date).format('YYYY-MM-DD'),
        time_format: timeArray[1],
        time: timeArray[0],
        session_type: 'location',
        session_id: propsData?._id
      }
    ) : (
      obj = {
        action_type: 'add',
        locationid: location?._id,
        location_link: locationLink,
        date: moment(date).format('YYYY-MM-DD'),
        time_format: timeArray[1],
        time: timeArray[0],
        session_type: 'location',
      }
    )
console.log(obj,'skdjksdjksdjkdsjk')
    dispatch(addSessionDetailsReq(obj));

  };

  const handleClear = () => {
    setLocation('');
    setDate(new Date());
    setTime('');
    setLocationLink('');
    props?.navigation.goBack('Home');
  };

  const timeList = [
    '7:00 AM',
    '7:15 AM',
    '7:30 AM',
    '7:45 AM',
    '8:00 AM',
    '8:15 AM',
    '8:30 AM',
    '8:45 AM',
    '9:00 AM',
    '9:15 AM',
    '9:30 AM',
    '9:45 AM',
    '10:00 AM',
    '10:15 AM',
    '10:30 AM',
    '10:45 AM',
    '11:00 AM',
    '11:15 AM',
    '11:30 AM',
    '11:45 AM',
    '12:00 PM',
    '12:15 PM',
    '12:30 PM',
    '12:45 PM',
    '1:00 PM',
    '1:15 PM',
    '1:30 PM',
    '1:45 PM',
    '2:00 PM',
    '2:15 PM',
    '2:30 PM',
    '2:45 PM',
    '3:00 PM',
    '3:15 PM',
    '3:30 PM',
    '3:45 PM',
    '4:00 PM',
    '4:15 PM',
    '4:30 PM',
    '4:45 PM',
    '5:00 PM',
    '5:15 PM',
    '5:30 PM',
    '5:45 PM',
    '6:00 PM',
    '6:15 PM',
    '6:30 PM',
    '6:45 PM',
    '7:00 PM',
    '7:15 PM',
    '7:30 PM',
    '7:45 PM',
    '8:00 PM',
    '8:15 PM',
    '8:30 PM',
    '8:45 PM',
    '9:00 PM',
    '9:15 PM',
    '9:30 PM',
    '9:45 PM',
    '10:00 PM',
    '10:15 PM',
    '10:30 PM',
    '10:45 PM',
    '11:00 PM',
    '11:15 PM',
    '11:30 PM',
    '11:45 PM',
    '12:00 AM',
    '12:15 AM',
    '12:30 AM',
    '12:45 AM',
    '1:00 AM',
    '1:15 AM',
    '1:30 AM',
    '1:45 AM',
    '2:00 AM',
    '2:15 AM',
    '2:30 AM',
    '2:45 AM',
    '3:00 AM',
    '3:15 AM',
    '3:30 AM',
    '3:45 AM',
    '4:00 AM',
    '4:15 AM',
    '4:30 AM',
    '4:45 AM',
    '5:00 AM',
    '5:15 AM',
    '5:30 AM',
    '5:45 AM',
    '6:00 AM',
    '6:15 AM',
    '6:30 AM',
    '6:45 AM',
  ];
  var timeObjects = timeList.map(time => ({ time }));

  if (status === '' || CreateSession.status !== status) {
    switch (CreateSession.status) {
      case 'CMS/locationListReq':
        status = CreateSession.status;
        // setIsApiCall(true);
        break;
      case 'CMS/locationListSucces':
        status = CreateSession.status;
        SetDataItem(CreateSession.locationListRes.data);
        console.log(CreateSession, 'CreateSessionCreateSessionCreateSession')
        break;
      case 'CMS/locationListFailure':
        status = CreateSession.status;
        break;
      case 'CMS/allPublicLocationReq':
        status = CreateSession.status;
        // setIsApiCall(true);
        break;
      case 'CMS/allPublicLocationSucces':
        status = CreateSession.status;
        SetDataItem1(CreateSession.allPublicLocationRes.data);
        break;
      case 'CMS/allPublicLocationFailure':
        status = CreateSession.status;
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

  console.log(dataItem1, '&&&&&', dataItem, 'slaskalslkakl')

  function comapreTime(selectedTime) {

    const timeString = selectedTime;
    const [time, period] = timeString.split(" ");
    const [hourString, minuteString] = time.split(":");
    let hour = parseInt(hourString, 10);
    let minute = parseInt(minuteString, 10);
    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }
    const timeValue = new Date();
    timeValue.setHours(hour, minute, 0);

    const timeString1 = formatAMPM(new Date);
    const [time1, period1] = timeString1.split(" ");
    const [hourString1, minuteString1] = time1.split(":");
    let hour1 = parseInt(hourString1, 10);
    let minute1 = parseInt(minuteString1, 10);
    if (period1 === "PM" && hour1 !== 12) {
      hour1 += 12;
    } else if (period1 === "AM" && hour1 === 12) {
      hour1 = 0;
    }
    const timeValue1 = new Date();
    timeValue1.setHours(hour1, minute1, 0);

    if (isToday) {

      // Compare the times
      if (timeValue < timeValue1) {
        setIsTimeBefore(true)
      } else if (timeValue > timeValue1) {
        setIsTimeBefore(false)
      } else {
        setIsTimeBefore(true)
      }
    }


  }
  let newSearch = [...dataItem1, ...dataItem]

  var result = [];
  newSearch.filter(function (item) {
    var i = result.findIndex(x => (x._id == item._id));
    if (i <= -1) {
      result.push(item);
    }
    return null;
  });
  console.log(time, 'alkdlak')

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
                    Create Session - Location
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
                        // handleClear();
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
                style={css.mt5}>
                <View style={[styles.form]}>
                  <Text style={styles.ctitleStyle}>Location</Text>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.dropdownWrapper, css.mb3]}>
                    <Dropdown
                      style={[styles.dropdown]}
                      placeholderStyle={[styles.placeholderStyle, {
                        color: location ? '#FFF' : '#ffffff40'
                      }]}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      iconStyle={styles.iconStyle}
                      data={
                        itemSearch === true
                          ? result
                          : dataItem
                            ? dataItem
                            : result
                      }
                      search
                      maxHeight={300}
                      labelField="title"
                      valueField="title"
                      placeholder={location ? location?.title : 'Select Location'}
                      searchPlaceholder="Search..."
                      value={location?.title}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setLocation(item);
                        console.log(item)
                        setIsFocus(false);
                        setLocationLink(item?.location_link);

                      }}
                      onChangeText={text => {
                        if (text == '') {
                          setItemSearch(false);
                          // setIsFocus(false);
                        } else {
                          setItemSearch(true);
                          // setIsFocus(false);
                        }
                      }}
                      // renderInputSearch={()=>{

                      // }}
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

                  <Input
                    title="Location link"
                    // rightIcon={M_Icons.locationInput}
                    placeholder="Location link"
                    placeholderTextColor="#ffffff40"
                    containerStyle={css.mb3}
                    value={locationLink}
                    isEditable={false}
                  />
                  <Input
                    title="Enter Date"
                    rightIcon={M_Icons.calenderBlue}
                    placeholder="Date"
                    placeholderTextColor="#ffffff40"
                    containerStyle={css.mb3}
                    value={moment(date).format('LL')}
                    onPress={() => setOpen(true)}
                    isPressableRightIcon={true}
                    isEditable={false}
                  />
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    minimumDate={moment().startOf('day').toDate()}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                      setIsToday(moment(new Date()).format('D-M-yyyy') == moment(date).format('D-M-yyyy'))
                        ;

                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                  <Text style={styles.ctitleStyle}>Enter Start Time</Text>
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
                      data={timeObjects ? timeObjects : []}
                      // search
                      maxHeight={300}
                      labelField="time"
                      valueField="time"
                      placeholder={'Enter Start Time'}
                      searchPlaceholder="Search..."
                      value={time}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setTime(item?.time);
                        setIsFocus(false);
                        comapreTime(item?.time)
                        console.log(item, 'kldfdklfklkl')
                        // console.log(Date.parse(new Date() + formatAMPM(new Date)) , Date.parse(new Date() + item?.time), 'skjksjfkj')
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


                  {/* <Input
                    title="Enter Start Time"
                    rightIcon={Icons.expandedDown}
                    placeholder="Enter Start Time"
                    placeholderTextColor="#ffffff40"
                    containerStyle={css.mb3}
                    value={timeVal ? timeVal[2] +" "+timeVal[3]:''}
                    onPress={() => setOpen1(true)}
                    isPressableRightIcon={true}
                    isEditable={false}
                  />
                  <DatePicker
                    modal
                    open={open1}
                    date={date}
                    mode="time"
                    onConfirm={time => {
                    let data=moment(time).calendar();
                    let timeStamp=data.toString();
                    const timeArray = timeStamp?.split(' ');
                
                      setOpen1(false);
                      setTime(timeArray[2]);
                      setTimeVal(timeArray);
                      setFormat(timeArray[3]);
                      console.log(time,'timeArraytimeArray')
                    }}
                    onCancel={() => {
                      setOpen1(false);
                    }}
                  />  */}
                  {/* <Input
                      title="Enter Start Time"
                      rightIcon={M_Icons.toggleIcon}
                      placeholder="AM"
                      value={format}
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.f1, css.mr2]}
                      onChangeText={text => setFormat(text)}
                    />
                    <NumberInput
                      title=" "
                      rightIcon={M_Icons.toggleIcon}
                      placeholder="8:00 AM"
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.f1]}
                      value={time}
                      onChangeText={text => setTime(text)}
                      onPressUp={() => {}}
                      onPressDown={() => {}}
                    /> */}

                  <Separator dividerStyle={[css.mt5, css.mb5]} />
                  <CustomButton
                    btnText="Next"
                    titleStyle={[]}
                    onPress={() => NavigatingToNext()}
                  />
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
                  <View style={[styles.modalInner]}>
                    <View style={[styles.modalBody, css.center, css.px5]}>
                      <Text style={[styles.modalBodyText]}>
                        Do you want to{'\n'}save this session?
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
                  <View style={[styles.modalInner]}>
                    <View style={[styles.modalBody, css.center]}>
                      <Text style={[styles.modalBodyText]}>
                        Do you want to exit{'\n'} Session without saving?
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
                          handleClear()
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
    // textTransform: "capitalize",
    textAlign: 'center',
  },
  modalWrap: {
    // height: height / 1.5,
  },
  modalContainer: {
    // height: "100%"
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
    paddingHorizontal: normalize(10),
  },
  dropdownWrapper: {
    borderRadius: normalize(15),
    borderRadius: normalize(10),
    height: normalize(40),
    justifyContent: 'center',
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
  inputSearchStyle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#000',
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

export default CreateSessionLocation;
