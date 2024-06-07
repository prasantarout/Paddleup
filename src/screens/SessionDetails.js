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
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Input from '../components/Input';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';
import Footer from '../components/Footer';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { getSessDetailsReq, sessionDeleteReq } from '../redux/reducer/SessionReducer';
import moment from 'moment';
import CustomNoButton from '../components/CustomNoButton';

let status = ''
const SessionDetails = props => {

  const SessionReducer = useSelector(state => state?.SessionReducer)
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [addressItem, setAddressItem] = useState('')
  const [sessionData, setSessionData] = useState([])
  const dispatch = useDispatch();

  const isFocused = useIsFocused()
  const { sessionDetails } = props?.route?.params;
  console.log(props?.route?.params, 'skldsklkl');
  var addressCom = '';
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

  const url = sessionDetails?.location_link;
  const queryString = url?.split('?')[1];
  const params = queryString?.split('&');
  let addressParam = null;

  params?.forEach(param => {
    const [key, value] = param.split('=');
    if (key === 'q') {
      addressParam = value;
      console.log(addressParam, "addreess");
    }
  });
  if (addressParam !== null) {
    const decodedAddress = decodeURIComponent(addressParam);
    const address = decodedAddress;
    const formattedAddress = address?.replace(/\+/g, '');
    addressCom = formattedAddress;
    console.log(formattedAddress, "Value>>>>>");
  }

  useEffect(() => {

    let obj = {
      session_id: sessionDetails?._id
    }
    props?.route?.params?.index == 1 && dispatch(getSessDetailsReq(obj))
  }, [isFocused])

  if (status === '' || SessionReducer.status !== status) {
    switch (SessionReducer.status) {
      case 'Session/sessionDeleteReq':
        status = SessionReducer.status;
        break;
      case 'Session/sessionDeleteSuccess':
        status = SessionReducer.status;
        sessionDetails?.page == 'Home' ? (
          props?.navigation?.navigate('BottomTab', {
            screen: 'HomeStackScreen',
            params: {
              screen: 'Home',
            },
          })
        ) : (
          props?.navigation?.navigate('BottomTab', {
            screen: 'MoreStackScreen',
            params: {
              screen: 'More',
            },
          })
        );
        break;
      case 'Session/sessionDeleteFailure':
        status = SessionReducer.status;
        break;
      case 'Session/getSessDetailsReq':
        status = SessionReducer.status;
        break;
      case 'Session/getSessDetailsSuccess':
        status = SessionReducer.status;
        setSessionData(SessionReducer?.sessionDetailsResponse?.data)
        break;
      case 'Session/getSessDetailsFailure':
        status = SessionReducer.status;
        break;
    }
  }

  console.log(sessionDetails?.page, 'slkdsldklsdklkls')
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
                      props?.route?.params?.page == 'Home' || props?.route?.params?.page == 'home' ? (
                        props?.navigation?.navigate('BottomTab', {
                          screen: 'MoreStackScreen',
                          params: {
                            screen: 'SessionHistory',
                          },
                        })
                      ) : props?.navigation?.navigate('BottomTab', {
                        screen: 'MoreStackScreen',
                        params: {
                          screen: 'SessionHistory',
                        },
                      });
                    }}>
                    <Image source={Icons.backArrow} style={css.backArrow} />
                  </TouchableOpacity>

                  <Text style={styles.screenTitle}>
                    {props?.route?.params?.index == 0
                      ? 'Active Sessions'
                      : props?.route?.params?.index == 1
                        ? 'Upcoming Sessions'
                        : 'Session History'}{' '}
                  </Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      // props?.navigation.goBackl('SessionHistory')
                      setModalVisible(true);
                    }}>
                    <Text style={styles.saveActionText}>
                      {/* {props?.route?.params?.index != 2 ? 'Cancel' : 'Delete'} */}
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>

              <ScrollView
                style={[styles.flexContainer, css.mt2]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: Platform.isPad
                    ? orientation == 'PORTRAIT'
                      ? normalize(20)
                      : normalize(310)
                    : normalize(50),
                  paddingHorizontal: normalize(20),
                }}>
                <View style={{}}>
                  <Text style={styles.sessionName}>
                    {sessionDetails?.gametype?.title}
                  </Text>
                  <Image style={styles.dashedLine} source={Images.dashedLine} />
                  <View>
                    <Text style={styles.addressTitle}>Session ID</Text>
                    <Text style={styles.address}>{sessionDetails?._id}</Text>
                  </View>
                  <Image style={styles.dashedLine} source={Images.dashedLine} />
                  <View>
                    <Text style={styles.addressTitle}>Location</Text>
                    <Text style={styles.address}>{sessionDetails?.location_details?.address ? sessionDetails?.location_details?.address : sessionDetails?.locationdetails?.address}</Text>
                  </View>
                  {/* <Image style={styles.dashedLine} source={Images.dashedLine} /> */}
                  {/* <View>
                    <Text style={styles.addressTitle}>
                      {sessionDetails?.session_type}
                    </Text>
                    <Text style={styles.address}>
                      {addressCom ? addressCom : null}
                    </Text>
                  </View> */}
                  <Image style={styles.dashedLine} source={Images.dashedLine} />
                  <View style={[styles.rowContainer, styles.contentCenter]}>
                    <Image source={Icons.calander} style={styles.calander} />
                    <Text style={styles.gameDate}>
                      {moment(sessionDetails?.date).format('MMMM Do YYYY')} |{' '}
                      {sessionDetails?.time + ' ' + sessionDetails?.time_format}
                    </Text>
                  </View>
                  <Image style={styles.dashedLine} source={Images.dashedLine} />
                  {/* <View
                    style={[
                      styles.rowContainer,
                      styles.contentSpaceBetween,
                      styles.contentCenter,
                    ]}>
                    <Text style={styles.pickleName}>Pickle Court #2</Text>
                    <Text style={styles.pickleName}>Pickle Court #3</Text>
                  </View> */}

                  <View style={styles.pickleNameWrapper}>
                    {
                      sessionDetails?.court_details?.map((item, index) => {
                        return (
                          <>
                            <Text style={styles.pickleName}>{item?.title}</Text>
                          </>
                        )
                      })
                    }
                  </View>

                  <Image style={styles.dashedLine} source={Images.dashedLine} />

                  <View style={[css.mb2, css.mt3]}>
                    <CustomButton
                      btnText={
                        props?.route?.params?.index == 0
                          ? 'VIEW ACTIVE SESSION'
                          : props?.route?.params?.index == 1
                            ? 'EDIT SESSION'
                            : 'RESULTS'
                      }
                      btnBg={Colors.btnBlue}
                      onPress={() => {
                        props?.route?.params?.index == 0
                          ? props?.navigation.navigate('GameList', {
                            sessionID: sessionDetails?._id,
                            showMenu: true,
                          })
                          : props?.route?.params?.index == 1
                            ? (
                              props?.navigation?.navigate('BottomTab', {
                                screen: 'SessionStartStackScreen',
                                params: {
                                  screen: 'CreateSessionLocation',
                                  params: {
                                    sessionID: sessionDetails?._id,
                                    sessionData: sessionData,
                                    sessionType: 'edit'
                                  },
                                },
                              })

                            )
                            : props?.navigation.navigate('SessionResult', {
                              showMenu: false,
                              session_id: sessionDetails?._id
                            });
                      }}
                    />
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => setModalVisible2(true)}
                    style={[css.mb2, css.mt3]}>
                    <Text style={styles.reusePlayer}>
                      {props?.route?.params?.index == 0 ||
                        props?.route?.params?.index == 1
                        ? null
                        : 'Reuse players for new session'}
                    </Text>
                  </TouchableOpacity> */}
                </View>
              </ScrollView>
            </ImageBackground>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>

      <Modal isVisible={isModalVisible}>
        <View style={[styles.modalWrap, css.py2]}>
          <ImageBackground
            style={styles.modalContainer}
            resizeMode="stretch"
            source={Images.modalBg}>
            <View style={[styles.flexContainer]}>
              <View style={[styles.modalInner, css.p2]}>
                <View style={[styles.modalBody, css.center, css.px5]}>
                  <Text style={[styles.modalBodyText]}>
                    {/* {props?.route?.params?.type == 'upcomming'
                      ? 'Are you sure you want to cancel this upcoming Session?'
                      : 'Are you sure you want to delete this session?'} */}
                    Are you sure you want to delete this session?
                  </Text>
                </View>
                <Separator dividerStyle={{ borderTopColor: 'gray' }} />
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
                      // if (props?.route?.params?.index != 2) {
                      dispatch(sessionDeleteReq({ session_id: sessionDetails?._id }))
                      // }
                    }}
                  />
                  <CustomNoButton
                    btnText="No"
                    containerStyle={[css.f1, { backgroundColor: Colors.btnPink }]}
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Modal>
      <Modal isVisible={isModalVisible2}>
        <View style={[styles.modalWrap, { height: height / 2.5 }, css.py2]}>
          <ImageBackground
            style={styles.modalContainer}
            resizeMode="stretch"
            source={Images.modalBg}>
            <View style={[styles.flexContainer]}>
              <View style={[styles.modalInner, css.p2]}>
                <View style={[styles.modalBody, css.center, css.px5]}>
                  <Text style={[styles.modalBodyText]}>
                    Are you sure you want to reuse new session?
                  </Text>
                </View>
                <Separator dividerStyle={{ borderTopColor: 'gray' }} />
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
                      setModalVisible2(false);
                    }}
                  />
                  <CustomButton
                    btnText="No"
                    containerStyle={[css.f1, { backgroundColor: Colors.btnPink }]}
                    onPress={() => {
                      setModalVisible2(false);
                    }}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
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
    minHeight: Sizes.height - normalize(200),
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
    paddingVertical: normalize(11),
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
    marginLeft: normalize(10),
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
    color: Colors.deleteText,
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
    left: normalize(8)
  },

  flex1: {
    flex: 1,
  },
  btnContainer: {
    marginTop: normalize(20),
    marginBottom: normalize(20),
  },

  navText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: normalize(14),
    fontFamily: Fonts.robotoMedium,
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
    marginBottom: normalize(5),
    fontSize: normalize(13),
  },
  reusePlayer: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(14),
    textAlign: 'center',
    color: Colors.deleteText,
    textDecorationLine: 'underline',
  },
  sessionName: {
    color: '#FFF',
    fontSize: normalize(20),
    fontFamily: Fonts.robotoMedium,
    marginTop: normalize(10),
  },
  dashedLine: {
    height: normalize(2),
    resizeMode: 'contain',
    marginTop: normalize(14),
    marginBottom: normalize(10),
    resizeMode: 'contain',
    width: '100%',
  },
  addressTitle: {
    fontFamily: Fonts.robotoMedium,
    color: '#FFF',
    fontSize: normalize(14),
    marginBottom: normalize(5),
  },
  address: {
    fontFamily: Fonts.robotoRegular,
    color: '#FFF',
    fontSize: normalize(10),
  },
  pickleName: {
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(14),
    marginRight: normalize(15),
  },
  pickleNameWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
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
    // height: height / 2.8,
  },
  modalContainer: {
    // height: '100%',
    justifyContent: 'center',
    paddingTop: normalize(10),
  },
});

export default SessionDetails;
