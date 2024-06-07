import React, { useState } from 'react';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';
import Input from '../components/Input';
import NumberInput from '../components/NumberInput';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
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
} from 'react-native';
import Header from '../components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomNoButton from '../components/CustomNoButton';

const SelectMail = props => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [time, setTime] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigation = useNavigation();

  const _handleTime = time => {
    console.log('Time', time);
    setTime(time);
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
          <KeyboardAwareScrollView
            scrollEnabled={false}
            behavior={Platform.OS == 'ios' ? 'position' : null}>
            <ImageBackground
              style={[css.mainContainer, { paddingBottom: normalize(50) }]}
              resizeMode="stretch"
              source={Images.bg2}>
              <View style={{ marginTop: 8 }}>
                <Header
                  hideMenu={props?.route?.params?.hideMenu ? false : true}
                  showBackArrow={true}
                  {...props}
                  onPress={() => setShowDropDown(!showDropDown)}
                  title="RR Session - Email Results"
                />
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={css.mt3}>
                <View style={[styles.cardWrapper, css.p3]}>
                  <View style={[styles.form]}>
                    <Input
                      title="Enter Email Address"
                      leftIcon={Icons.email}
                      value="WilliamThomas@gmail.com"
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.mb3]}
                      rightIcon={Icons.deleteIcon}
                    />
                    <Input
                      leftIcon={Icons.email}
                      value="ChristopheHitchens@gmail.com"
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.mb3]}
                      rightIcon={Icons.deleteIcon}
                    />
                    <Input
                      leftIcon={Icons.email}
                      value="KennethAnderson@gmail.com"
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.mb3]}
                      rightIcon={Icons.deleteIcon}
                    />
                    <Input
                      leftIcon={Icons.email}
                      value="Timothywhite@gmail.com"
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.mb3]}
                      rightIcon={Icons.deleteIcon}
                    />
                    <Input
                      leftIcon={Icons.email}
                      value="jhonThomas@gmail.com"
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.mb3]}
                      rightIcon={Icons.deleteIcon}
                    />
                    <Input
                      leftIcon={Icons.email}
                      value="Email Address"
                      placeholderTextColor="#ffffff40"
                      containerStyle={[css.mb3]}
                      rightIcon={Icons.deleteIcon}
                    />
                    <View style={[css.row]}>
                      {/* <Image
                        source={M_Icons.addRound}
                        style={[styles.addbtnStyle]}
                      /> */}
                      <Text style={[css.ml2, styles.addTextStyle]}>
                        Add Email Address
                      </Text>
                    </View>
                    <Separator dividerStyle={[css.mt5, css.mb5]} />
                    <CustomButton
                      btnText="Send"
                      titleStyle={[]}
                      onPress={() =>
                        navigation.navigate('Home', { showMenu: false })
                      }
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
              source={Images.mainContainer}>
              <ScrollView
                style={[styles.flexContainer, styles.ph10]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentCenter}>
                {showContent ? (
                  <View style={[styles.modalInner, css.p2]}>
                    <View style={[css.rowBetween, css.py2]}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(false);
                          setShowDropDown(false);
                        }}>
                        <Image
                          source={M_Icons.backArrow}
                          style={[styles.modalBackBtn]}
                        />
                      </TouchableOpacity>
                      <Text style={[styles.modalHeaderText]}>
                        Create RR Session - Save Session
                      </Text>
                      <Image
                        source={M_Icons.backArrow}
                        style={[styles.modalBackBtn, css.op0]}
                      />
                    </View>
                    <Separator />
                    <View
                      style={[styles.modalBody, css.center, css.px5, css.aic]}>
                      <Text style={[styles.modalBodyText]}>
                        Do You Want To Save This Round Robin session?
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
                    <Separator />
                  </View>
                ) : (
                  <View style={[styles.modalInner, css.p2]}>
                    <View style={[css.rowBetween, css.py2]}>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(false);
                          setShowDropDown(false);
                        }}>
                        <Image
                          source={M_Icons.backArrow}
                          style={[styles.modalBackBtn]}
                        />
                      </TouchableOpacity>
                      <Text style={[styles.modalHeaderText]}>
                        Create RR Session - Exit Session
                      </Text>
                      <Image
                        source={M_Icons.backArrow}
                        style={[styles.modalBackBtn, css.op0]}
                      />
                    </View>
                    <Separator />
                    <View style={[styles.modalBody, css.center, css.px5]}>
                      <Text style={[styles.modalBodyText]}>
                        Do You Want To Exit Round Robin Session Without Saving?
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
                    <Separator />
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
    color: Colors.actionText,
    fontFamily: Fonts.robotoMedium,
  },
});

export default SelectMail;
