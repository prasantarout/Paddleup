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
  Keyboard,
  Dimensions,
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProfileDetailsReq,
  updateProfileReq,
} from '../redux/reducer/ProfileReducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomToast from '../utils/helpers/CustomToast';
import { regex } from '../utils/helpers/regex';
import { Dropdown } from 'react-native-element-dropdown';
import constants from '../utils/helpers/constants';

import ImagePicker from 'react-native-image-crop-picker';

let status = '';
const EditProfile = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [pickerModal, setPickerAction] = useState(false);
  const [fullName, setFullName] = useState('');
  const [paddleTappID, setPaddleTappID] = useState('PT-4576');
  const [selfRating, setSelfRating] = useState('');
  const [myLocation, setMyLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [profileObjUri, setProfileObj] = useState('');
  const [profilePicObj, setProfilePicObj] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState('')
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');

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
  const ProfileReducer = useSelector(state => state.ProfileReducer);
  useEffect(() => {
    dispatch(getProfileDetailsReq());
  }, [isFocused]);

  function openGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfileObj(image.path);
      let imageObj = {
        name: image.filename
          ? image.filename
          : image.path.substring(image.path.lastIndexOf('/') + 1),
        type: image.mime,
        uri: image.path,
      };
      setProfilePicObj(imageObj);
      setPickerAction(false);
    });
  }
  function openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setProfileObj(image.path);
      let imageObj = {
        name: image.filename
          ? image.filename
          : image.path.substring(image.path.lastIndexOf('/') + 1),
        type: image.mime,
        uri: image.path,
      };
      setProfilePicObj(imageObj);
      setPickerAction(false);
    });
  }

  const handleSaveUserProfile = () => {
    const data = new FormData();

    if (fName?.trim() == '') {
      CustomToast('First Name is required')
      return false
    }
    if (regex.WORD.test(fName) == false) {
      CustomToast('Please enter valid First Name')
      return false
    }
    if (lName?.trim() == '') {
      CustomToast('Last Name is required')
      return false
    }
    if (regex.WORD.test(lName) == false) {
      CustomToast('Please enter valid Last Name')
      return false
    }
    if (regex.WORD.test(fullName) == false) {
      CustomToast('Please enter valid Full Name');
      return false;
    }
    data.append('full_name', `${fName} ${lName}`);
    data.append('first_name', fName)
    data.append('last_name', lName)
    profilePicObj && data.append('profile_pic', profilePicObj);
    data.append('city', myLocation);
    data.append('self_rating', selfRating);
    dispatch(updateProfileReq(data));
  };

  const data = [
    { label: '1.0', value: '1.0' },
    { label: '1.5', value: '1.5' },
    { label: '2.0', value: '2.0' },
    { label: '2.5', value: '2.5' },
    { label: '3.0', value: '3.0' },
    { label: '3.5', value: '3.5' },
    { label: '4.0', value: '4.0' },
    { label: '4.5', value: '4.5' },
    { label: '5.0', value: '5.0' },
    { label: '5.5', value: '5.5' },
    { label: '6.0', value: '6.0' },
    { label: '6.5', value: '6.5' },
  ];
  if (status === '' || ProfileReducer.status !== status) {
    switch (ProfileReducer.status) {
      case 'Profile/getProfileDetailsReq':
        status = ProfileReducer.status;
        break;
      case 'Profile/getProfileDetailsSucces':
        status = ProfileReducer.status;
        setFullName(ProfileReducer?.getProfileDetailsRes?.data?.full_name);
        setFName(ProfileReducer?.getProfileDetailsRes?.data?.first_name);
        setLName(ProfileReducer?.getProfileDetailsRes?.data?.last_name);
        setPaddleTappID(
          ProfileReducer?.getProfileDetailsRes?.data?.paddletap_id,
        );
        setSelfRating(ProfileReducer?.getProfileDetailsRes?.data?.self_rating);
        setMyLocation(ProfileReducer?.getProfileDetailsRes?.data?.paddletap_id);
        setEmail(ProfileReducer?.getProfileDetailsRes?.data?.email);
        setMyLocation(ProfileReducer?.getProfileDetailsRes?.data?.city);
        setPassword(ProfileReducer?.getProfileDetailsRes?.data?.paddletap_id);
        setUserProfile(ProfileReducer?.getProfileDetailsRes?.data?.profile_pic);
        break;
      case 'Profile/getProfileDetailsFailure':
        status = ProfileReducer.status;
        break;
      case 'Profile/updateProfileReq':
        status = ProfileReducer.status;
        break;
      case 'Profile/updateProfileSucces':
        status = ProfileReducer.status;
        props?.navigation.navigate('Profile');
        break;
      case 'Profile/updateProfileFailure':
        status = ProfileReducer.status;
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
            enableAutomaticScroll={true}>
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
                  <Text style={styles.screenTitle}>Edit Profile </Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      // props?.navigation.navigate('Profile');
                      handleSaveUserProfile();
                    }}>
                    <Text style={styles.saveActionText}>Save</Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={styles.bottomBorder} /> */}
              </LinearGradient>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: normalize(20),
                  paddingBottom:
                    isKeyboardVisible === true
                      ? normalize(330)
                      : Platform.isPad
                        ? orientation == 'PORTRAIT'
                          ? normalize(20)
                          : normalize(320)
                        : normalize(100),
                }}>
                <View
                  style={[
                    styles.userInfo,
                    styles.rowContainer,
                    styles.justifyContentCenter,
                    styles.contentCenter,
                  ]}>
                  <Image
                    style={styles.userProfile}
                    source={
                      profileObjUri === ''
                        ? userProfile
                          ? {
                            uri: `${constants.Media_Url}/uploads/user/profile_pic/${userProfile}`,
                          }
                          : Images.noUser
                        : { uri: profileObjUri }
                    }
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setPickerAction(true);
                    }}
                    style={{
                      position: 'absolute',
                    }}>
                    <Image
                      source={Icons.cameraPicker}
                      style={{
                        width: normalize(40),
                        height: normalize(40),
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.bottomBorder, css.mb3]} />

                <Input
                  title="First Name"
                  leftIcon={M_Icons.user}
                  placeholder="First Name"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={fName}
                  titleStyle={styles.titleStyle}
                  onChangeText={text => setFName(text)}
                />
                <Input
                  title="Last Name"
                  leftIcon={M_Icons.user}
                  placeholder="Last Name"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={lName}
                  titleStyle={styles.titleStyle}
                  onChangeText={text => setLName(text)}
                />
                <Input
                  title="PaddleTapp ID"
                  placeholder="PT-4576"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={paddleTappID}
                  titleStyle={styles.titleStyle}
                  isEditable={false}
                />
                {/* <Input
                  title="Self-Rating"
                  placeholder="2.5"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={selfRating}
                  onChangeText={text => setSelfRating(text)}
                  titleStyle={styles.titleStyle}
                  rightIcon={Icons.expandedDown}
                  onPress={()=>{
                    setIsFocus(true)
                  }}
                  isPressableRightIcon={true}
                /> */}
                <Text style={styles.ctitleStyle}>Self-Rating</Text>
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
                    data={data}
                    // search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={selfRating ? selfRating : '0.0'}
                    searchPlaceholder="Search..."
                    value={selfRating}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setSelfRating(item.value);
                      setIsFocus(false);
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

                <Input
                  title="My Hometown"
                  placeholder="Italy"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={myLocation}
                  onChangeText={text => setMyLocation(text)}
                  titleStyle={styles.titleStyle}
                />
                <Input
                  title="Email Address"
                  leftIcon={Icons.email}
                  placeholder="johnmorrison@gmail.com"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  value={email}
                  titleStyle={styles.titleStyle}
                  isEditable={false}
                />
                <Input
                  title="Password"
                  leftIcon={Icons.lock}
                  placeholder="**********"
                  placeholderTextColor="#ffffff40"
                  containerStyle={[css.mb3]}
                  secureTextEntry={true}
                  value="**********"
                  titleStyle={styles.titleStyle}
                  rightIcon={Icons.lockIcon}
                  isPressableRightIcon={true}
                  onPress={() => {
                    props.navigation.navigate('ChangePassword');
                  }}
                  isEditable={false}
                />
              </ScrollView>
            </ImageBackground>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>

      <Modal
        avoidKeyboard
        backdropOpacity={0.5}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating={true}
        // animationInTiming={900}
        // animationOutTiming={1000}
        isVisible={pickerModal}
        useNativeDriver={true}
        onBackButtonPress={() => setPickerAction(false)}
        onBackdropPress={() => setPickerAction(false)}
        style={styles.modalView}>
        <ImageBackground
          borderTopLeftRadius={normalize(10)}
          borderTopRightRadius={normalize(10)}
          style={styles.modalWrap}
          source={Images.modalBg}>
          <TouchableOpacity
            style={styles.crossIconWrapper}
            onPress={() => {
              setPickerAction(false);
            }}>
            <Image source={Icons.crossIcon} style={styles.crossIcon} />
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.navWrapper}
            onPress={() => {
              openCamera();
            }}>
            <Text style={styles.navText}>Open Camera</Text>
            <Image style={styles.dashedLine} source={Images.dashedLine} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.navWrapper}
            onPress={() => {
              openGallery();
            }}>
            <Text style={styles.navText}>Choose from gallery</Text>
            <Image style={styles.dashedLine} source={Images.dashedLine} />
          </TouchableOpacity>
        </ImageBackground>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: Colors.blue,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
    paddingVertical: normalize(8),
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
  },
  bottomBorder: {
    width: '100%',
    height: normalize(1),
    backgroundColor: 'gray',
    marginTop: normalize(5),
    opacity: 0.4,
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
    borderTopLeftRadius: normalize(5),
    borderTopRightRadius: normalize(5),
    resizeMode: 'stretch',
    position: 'absolute',
    width: '100%',
    bottom: 0,
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
    marginTop: normalize(10),
    marginRight: normalize(10),
  },

  paddleupLogo: {
    height: normalize(35),
    width: normalize(35),
    resizeMode: 'contain',
  },
  userProfile: {
    width: normalize(140),
    height: normalize(140),
    resizeMode: 'cover',
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

  ctitleStyle: {
    color: '#fff',
    fontFamily: Fonts.robotoMedium,
    fontSize: Platform.OS === 'android' ? normalize(14) : normalize(12),
    marginBottom: normalize(10),
  },
  modalView: {
    margin: 0,
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
  placeholderStyle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#FFFF',
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
});

export default EditProfile;
