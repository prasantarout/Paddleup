import React, { useCallback, useEffect, useState } from 'react';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
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
  FlatList,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import HomeMenu from '../components/HomeMenu';
import Footer from '../components/Footer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getSessionListReq } from '../redux/reducer/SessionReducer';
import moment from 'moment';
import Loader from '../components/Loader';
import CustomNoButton from '../components/CustomNoButton';
let status = '';
const SessionHistory = props => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isHomeMenu, setIsHomeMenu] = useState(false);
  const [time, setTime] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [type, setType] = useState('Active Sessions');
  const navigation = useNavigation();
  const [orientation, setOrientation] = useState('PORTRAIT');
  const CreateSession = useSelector(state => state.SessionReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [lisType, setLisType] = useState('active');
  const [sessionData, setSessionData] = useState(CreateSession?.getSessionListRes?.data?.docs ?CreateSession?.getSessionListRes?.data?.docs : []);
  console.log(CreateSession?.getSessionListRes?.data, 'activeSession>>>');
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();

  const isFocused = useIsFocused()
  useEffect(() => {
    // const unsubscribe = props.navigation.addListener('focus', () => {
    //   setActiveIndex(0)
    //   setType('Active Sessions')
    //   dispatch(getSessionListReq({ list_type: 'active' }));
    // });

    // return unsubscribe;

    dispatch(getSessionListReq({
      list_type: lisType,
      page_no: 1,
      page_limit: 15,
    }));

  }, []);

  const fetchMoreData = async (page) => {
    dispatch(getSessionListReq({
      list_type: lisType,
      page_no: page,
      page_limit: 15,
    }));
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
  const fetchMore = async () => {
    console.log('sdsjkdjksdjksjdjksdjk')
    if (isLoading) return;
    setIsLoading(true);
    const nextPage = page + 1;
    fetchMoreData(nextPage);
    setPage(nextPage);
    setIsLoading(false);

  };

  const RenderPicleball = ({ item, index }) => {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#4b4190', '#614799', '#623d95']}
        style={styles.linearGradient}>
        <TouchableOpacity
          style={[styles.rowContainer, styles.contentCenter]}
          onPress={() => {
            // props?.navigation?.navigate('SessionDetails', {
            //   type: type,
            //   index: activeIndex,
            //   sessionDetails:item
            // });

            props?.navigation?.navigate('BottomTab', {
              screen: 'MoreStackScreen',
              params: {
                screen: 'SessionDetails',
                params: {
                  type: type,
                  index: activeIndex,
                  sessionDetails: item,
                  page: 'SessionHistory'
                },
              },
            });
          }}>
          <View>
            <Image source={Icons.batIcon} style={styles.batIcon} />
          </View>
          <View style={[styles.flex1, styles.ph10]}>
            <Text style={styles.gameTitle}>{item?.gametype?.title}</Text>
            <View style={[styles.rowContainer, styles.contentCenter]}>
              <Image source={Icons.calander} style={styles.calander} />
              <Text style={styles.gameDate}>
                {moment(item?.date).format('MMMM D, YYYY')} |{' '}
                {item?.time + ' ' + item?.time_format}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image source={Icons.linkIcon} style={styles.linkIcon} />
          </TouchableOpacity>
        </TouchableOpacity>
      </LinearGradient>
    );
  };
  const RenderNoDataFound = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingVertical: normalize(40),
          alignItems: 'center',
        }}>
        <Image source={Icons.noData} style={{ height: normalize(280), width: normalize(280) }} />
      </View>
    );
  };
   console.log(CreateSession?.getSessionListRes?.data?.docs?.length, 'valueItem', []);

  if (status === '' || CreateSession.status !== status) {
    switch (CreateSession.status) {

      case 'Session/getSessionListReq':
        status = CreateSession.status;
        setIsLoading(true)
        break;
      case 'Session/getSessionListSuccess':
        status = CreateSession.status;
        console.log(CreateSession?.getSessionListRes?.data?.docs, 'KKKKK')
        page == 1 ? setSessionData(CreateSession?.getSessionListRes?.data?.docs) : setSessionData(prevData => [...prevData, ...CreateSession?.getSessionListRes?.data?.docs])
        setIsLoading(false)
        break;
      case 'Session/getSessionListFailure':
        status = CreateSession.status;
        break;
    }
  }

  return (
    <>
      <SafeAreaView style={styles.SafeAreaView}>
        {CreateSession.status === 'Session/getSessionListReq' && (
          <View style={{
            position: 'absolute',
            width: Sizes.width,
            height: Sizes.height,
            zIndex: 9999,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
        <View style={[css.mainScreen]}>

          <KeyboardAwareScrollView
            scrollEnabled={false}
            behavior={Platform.OS == 'ios' ? 'position' : null}>
            <ImageBackground
              style={[css.mainContainer]}
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
                      props?.navigation?.navigate('BottomTab', {
                        screen: 'MoreStackScreen',
                        params: {
                          screen: 'More',
                        },
                      });
                    }}>
                    <Image source={Icons.backArrow} style={css.backArrow} />
                  </TouchableOpacity>

                  <Text style={styles.screenTitle}>{type}</Text>

                  <View />
                </View>
              </LinearGradient>
              <ScrollView
                style={[styles.flexContainer, css.mt3]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: normalize(20),
                  paddingBottom: Platform.isPad
                    ? orientation == 'PORTRAIT'
                      ? normalize(30)
                      : normalize(300)
                    : normalize(100),
                }}>
                <View style={[styles.cardWrapper]}>
                  <View style={[styles.rowContainer, styles.rowSpaceBetween]}>
                    <TouchableOpacity
                      style={[
                        styles.filterBox,
                        {
                          backgroundColor:
                            activeIndex == 0 ? '#54d4d2' : '#413a89',
                          width: '32%',
                        },
                      ]}
                      onPress={() => {
                        setActiveIndex(0);
                        setType('Active Sessions');
                        setPage(1)
                        setLisType('active')
                        dispatch(getSessionListReq({
                          list_type: 'active',
                          page_no: 1,
                          page_limit: 15,
                        }));
                      }}>
                      <Text
                        style={[
                          styles.filtextName,
                          {
                            color: activeIndex == 0 ? '#000000' : '#fff',
                          },
                        ]}>
                        Active Sessions
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.filterBox,

                        {
                          backgroundColor:
                            activeIndex == 1 ? '#54d4d2' : '#413a89',
                          width: '32%',
                        },
                      ]}
                      onPress={() => {
                        setActiveIndex(1);
                        setType('Upcoming Sessions');
                        setLisType('upcoming')
                        setPage(1)
                        dispatch(getSessionListReq({
                          list_type: 'upcoming',
                          page_no: 1,
                          page_limit: 15,
                        }));
                      }}>
                      <Text
                        style={[
                          styles.filtextName,
                          {
                            color: activeIndex == 1 ? '#000000' : '#fff',
                          },
                        ]}>
                        Upcoming
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.filterBox,
                        {
                          backgroundColor:
                            activeIndex == 2 ? '#54d4d2' : '#413a89',
                          width: '32%',
                        },
                      ]}
                      onPress={() => {
                        setActiveIndex(2);
                        setType('Session History');
                        setLisType('history')
                        setPage(1)
                        dispatch(getSessionListReq({
                          list_type: 'history',
                          page_no: 1,
                          page_limit: 15,
                        }));
                      }}>
                      <Text
                        style={[
                          styles.filtextName,
                          {
                            color: activeIndex == 2 ? '#000000' : '#fff',
                          },
                        ]}>
                        History
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Separator dividerStyle={[{ zIndex: -1 }]} />
{/* 
                  {
                    CreateSession?.getSessionListRes?.data?.docs?.length > 0 && (type == 'Session History' && (
                      <View style={styles.sessionMetaInfo}>
                        <Text style={styles.sessionMetaInfoText}>Sessions played (Scoring enabled): {CreateSession?.getSessionListRes?.count?.[0]?.session_played_scoring_enabled}</Text>
                        <Text style={styles.sessionMetaInfoText}>Sessions played (Scoring disabled): {CreateSession?.getSessionListRes?.count?.[0]?.session_played_scoring_disabled}</Text>
                      </View>
                    ))
                  } */}

                  <FlatList
                    data={
                      sessionData
                        ? sessionData
                        : []
                    }
                    renderItem={RenderPicleball}
                    ListEmptyComponent={RenderNoDataFound}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                      paddingBottom: normalize(50),
                    }}
                 
                  //  onEndReached={()=>{fetchMore()}} // Call fetchMoreData when reaching the end of the list
                    // onEndReachedThreshold={0.1} // Adjust the threshold as needed
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
              source={Images.mainContainer}>
              <ScrollView
                style={[styles.flexContainer]}
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
                        Create Session - Save Session
                      </Text>
                      <Image
                        source={M_Icons.backArrow}
                        style={[styles.modalBackBtn, css.op0]}
                      />
                    </View>
                    <Separator />
                    <View style={[styles.modalBody, css.center, css.px5]}>
                      <Text style={[styles.modalBodyText]}>
                        Do you want to save this Session?
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
                        Create Session - Exit Session
                      </Text>
                      <Image
                        source={M_Icons.backArrow}
                        style={[styles.modalBackBtn, css.op0]}
                      />
                    </View>
                    <Separator />
                    <View style={[styles.modalBody, css.center, css.px5]}>
                      <Text style={[styles.modalBodyText]}>
                        Do You Want To Exit session without saving?
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

      <HomeMenu {...props} isHomeMenu={isHomeMenu} />
    </>
  );
};

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: height / 1.5,
  },
  modalContainer: {
    height: '100%',
  },
  playerNameContainer: {
    backgroundColor: '#433c8a',
    paddingVertical: normalize(13),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(8),
    maxWidth: '100%',
  },
  playerName: {
    fontFamily: Fonts.robotoMedium,
    color: '#FFF',
    fontSize: normalize(10),
  },
  playerNumContainer: {
    backgroundColor: '#433c8a',
    paddingVertical: normalize(13),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(8),
    justifyContent: 'center',
    marginTop: normalize(5),
    alignSelf: 'flex-start',
  },
  playerNum: {
    fontFamily: Fonts.robotoMedium,
    color: '#FFF',
    fontSize: normalize(10),
  },
  gameName: {
    fontFamily: Fonts.robotoMedium,
    color: '#FFF',
    marginBottom: normalize(20),
    marginTop: normalize(10),
    fontSize: normalize(13),
  },
  w40Percent: {
    width: '40%',
  },
  toggleIconStyle: {
    width: normalize(7),
    height: normalize(7),
    marginLeft: normalize(10),
    resizeMode: 'contain',
  },

  rowContentCenter: {
    alignItems: 'center',
  },
  rowSpaceBetween: {
    justifyContent: 'space-between',
  },
  rowFlexEnd: {
    alignSelf: 'flex-end',
  },
  vs: {
    height: normalize(36),
    width: normalize(36),
    resizeMode: 'contain',
  },
  w20Percent: {
    width: '20%',
  },
  w22Percent: {
    width: '22%',
  },
  itemCenter: {
    alignItems: 'center',
  },
  zIndexOverFlatList: {
    zIndex: 99999,
  },
  tableHead: {
    color: '#0BD3D3',
    textTransform: 'uppercase',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(10),
  },
  tableData: {
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(10),
  },
  tableHeader: {
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(5),
    justifyContent: 'space-between',
  },

  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  paddleupLogo: {
    height: normalize(35),
    width: normalize(35),
    resizeMode: 'contain',
  },
  menuIcon: {
    height: normalize(28),
    width: normalize(28),
    resizeMode: 'contain',
  },
  gameHeaderName: {
    fontFamily: Fonts.robotoMedium,
    color: '#FFFF',
    fontSize: normalize(15),
    marginLeft: normalize(5),
  },
  metaInfo: {
    fontFamily: Fonts.robotoRegular,
    color: '#FFFF',
    fontSize: normalize(12),
    marginTop: normalize(10),
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
    marginLeft: normalize(-30),
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
  contentCenter: {
    alignItems: 'center',
  },
  backArrow: {
    height: normalize(28),
    width: normalize(28),
    resizeMode: 'contain',
    borderRadius: normalize(5),
  },
  centerTextTitle: {
    width: width - normalize(45),
    position: 'absolute',
    alignItems: 'center',
  },
  w30Percent: {
    width: '29%',
  },
  filterBox: {
    alignItems: 'center',
    paddingVertical: normalize(8),
    borderRadius: normalize(4),
    // flex:1
  },
  filtextName: {
    fontSize: normalize(10),
    fontFamily: Fonts.robotoMedium,
  },
  w49Percent: {
    width: '49%',
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
    left: normalize(5),
  },
  flex1: {
    flex: 1,
  },
  btnContainer: {
    marginTop: normalize(20),
    marginBottom: normalize(20),
  },
  ph10: {
    paddingHorizontal: normalize(10),
  },
  screenHeader: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(11),
  },
  rowContainer: {
    flexDirection: 'row',
  },

  contentSpaceBetween: {
    justifyContent: 'space-between',
  },
  sessionMetaInfo: {
    marginBottom: normalize(10)
  },
  sessionMetaInfoText: {
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(12),
  }
});

export default SessionHistory;
