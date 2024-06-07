import React, { useCallback, useEffect, useState } from 'react';
import { Fonts, Colors, Icons, Sizes, css, M_Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';

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
} from 'react-native';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import HomeMenu from '../components/HomeMenu';
import Footer from '../components/Footer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaderBoardReq } from '../redux/reducer/CmsReducer';
import CustomNoButton from '../components/CustomNoButton';
import Loader from '../components/Loader';


let status = ''
const Leaderboard = props => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isHomeMenu, setIsHomeMenu] = useState(false);
  const [time, setTime] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isApicall, setIsApicall] = useState(false);

  const [leaderBoardData, setLeaderBoardData] = useState([]);


  const [activeIndex, setActiveIndex] = useState(3);
  const [filterName, setFilterName] = useState('W/L %');
  const [result, setResult] = useState('Wins');
  const [orientation, setOrientation] = useState("PORTRAIT");
  const CmsReducer = useSelector(state => state.CmsReducer)
  const isFocus = useIsFocused()
  const dispatch = useDispatch()

  function sortByGamePlayed() {
    let sortArray = CmsReducer?.getLeaderBoardRes?.data?.scoreDetails?.slice().sort(function (a, b) {
      var textA = a?.details?.length;
      var textB = b?.details?.length;
      return textA > textB
        ? -1
        : textA < textB
          ? 1
          : 0

    });
    setLeaderBoardData(sortArray);

  }
  function sortByWin() {
    let sortArray = CmsReducer?.getLeaderBoardRes?.data?.scoreDetails?.slice().sort(function (a, b) {
      var textA = a?.total_win_game;
      var textB = b?.total_win_game;
      return textA > textB
        ? -1
        : textA < textB
          ? 1
          : 0

    });
    setLeaderBoardData(sortArray);

  }
  function sortByWinPer() {
    let sortArray = CmsReducer?.getLeaderBoardRes?.data?.scoreDetails?.slice().sort(function (a, b) {
      var textA = a?.win_percentage;
      var textB = b?.win_percentage;
      return textA > textB
        ? -1
        : textA < textB
          ? 1
          : 0

    });
    setLeaderBoardData(sortArray);

  }
  function sortByDiff() {
    let sortArray = CmsReducer?.getLeaderBoardRes?.data?.scoreDetails?.slice().sort(function (a, b) {
      var textA = a?.diff;
      var textB = b?.diff;
      return textA > textB
        ? -1
        : textA < textB
          ? 1
          : 0

    });
    setLeaderBoardData(sortArray);

  }


  useFocusEffect(
    useCallback(() => {
      if (Dimensions.get('window').width < Dimensions.get('window')?.height) {
        setOrientation("PORTRAIT")
      } else {
        setOrientation("LANDSCAPE")

      }
      const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
        if (width < height) {
          setOrientation("PORTRAIT")
        } else {
          setOrientation("LANDSCAPE")

        }
        return () => subscription?.remove();
      });
    })
  )


  useEffect(() => {
    dispatch(getLeaderBoardReq({}))
  }, [isFocus])

  const RenderGameList = ({ item, index }) => {
    return index % 2 == 0 ? (
      <View style={[styles.tableHeader, styles.rowContainer]}>
        <Text style={styles.tableData} numberOfLines={1}>
          {index + 1}. {item?.full_name}
        </Text>

        <Text style={[styles.tableData, styles.textCenter]}>
          {
            activeIndex == 0 ? (
              item?.total_game
            ) : activeIndex == 1 ? (
              `${item?.total_win_game ? item?.total_win_game : 0}-${item?.total_loss_game ? item?.total_loss_game : 0}`
            ) : activeIndex == 3 ? (
              `${parseFloat(item?.win_percentage).toFixed(3)}`
            ) : `${item?.diff ? item?.diff : 0}`
          }
        </Text>
      </View>
    ) : (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#4b4190', '#614799', '#623d95']}
        style={[styles.tableHeader, styles.rowContainer]}>
        <Text style={styles.tableData} numberOfLines={1}>
          {index + 1}. {item?.full_name}
        </Text>
        <Text style={[styles.tableData, styles.textCenter]}>
          {
            activeIndex == 0 ? (
              item?.total_game
            ) : activeIndex == 1 ? (
              `${item?.total_win_game ? item?.total_win_game : 0}-${item?.total_loss_game ? item?.total_loss_game : 0}`
            ) : activeIndex == 3 ? (
              `${parseFloat(item?.win_percentage).toFixed(3)}`
            ) : `${item?.diff ? item?.diff : 0}`
          }
        </Text>
      </LinearGradient>
    );
  };



  if (status === '' || CmsReducer.status !== status) {
    switch (CmsReducer.status) {
      case 'CMS/getLeaderBoardReq':
        status = CmsReducer.status;
        setIsApicall(true)
        break;
      case 'CMS/getLeaderBoardSucces':
        status = CmsReducer.status;

        setLeaderBoardData(CmsReducer?.getLeaderBoardRes?.data?.scoreDetails)

        setTimeout(() => {
          filterName == 'Games Played' && sortByGamePlayed()
          filterName == 'W-L' && sortByWin()
          filterName == 'W/L %' && sortByWinPer()
          filterName == '+/-' && sortByDiff()
          setIsApicall(false)
        }, 1000)


        break;
      case 'CMS/getLeaderBoardFailure':
        status = CmsReducer.status;
        setIsApicall(false)
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
                      props.navigation.goBack();
                    }}>
                    <Image source={Icons.backArrow} style={css.backArrow} />
                  </TouchableOpacity>

                  <Text style={styles.screenTitle}>Leaderboard</Text>
                  <View />
                </View>
              </LinearGradient>
              <ScrollView
                style={[styles.flexContainer, css.mt3]}
                showsVerticalScrollIndicator={false}

                contentContainerStyle={{
                  paddingHorizontal: normalize(20),
                  paddingBottom: Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(80) : normalize(360)) : normalize(100)
                }}>
                <View style={[styles.cardWrapper]}>
                  <View style={[styles.rowContainer, styles.rowSpaceBetween, styles.w100Percent]}>
                    <TouchableOpacity
                      style={[
                        styles.filterBox,
                        {
                          backgroundColor:
                            activeIndex == 0 ? '#54d4d2' : '#413a89',
                          width: '30%'
                        },
                      ]}
                      onPress={() => {
                        setActiveIndex(0);
                        dispatch(getLeaderBoardReq({}))
                        setFilterName('Games Played');
                        sortByGamePlayed()
                      }}>
                      <Text
                        style={[
                          styles.filtextName,
                          {
                            color: activeIndex == 0 ? '#000000' : '#fff',
                          },
                        ]}>
                        Games Played
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.filterBox,
                        // styles.w20Percent,
                        {
                          backgroundColor:
                            activeIndex == 1 ? '#54d4d2' : '#413a89',
                          width: '20%'
                        },
                      ]}
                      onPress={() => {
                        setActiveIndex(1);
                        dispatch(getLeaderBoardReq({}))
                        setFilterName('W-L');
                        sortByWin()
                      }}>
                      <Text
                        style={[
                          styles.filtextName,
                          {
                            color: activeIndex == 1 ? '#000000' : '#fff',
                          },
                        ]}>
                        W-L
                      </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      style={[
                        styles.filterBox,
                        // styles.w20Percent,
                        {
                          backgroundColor:
                            activeIndex == 2 ? '#54d4d2' : '#413a89',
                          width:'18%'
                        },
                      ]}
                      onPress={() => {
                        setActiveIndex(2);
                        setFilterName('Losses');
                      }}>
                      <Text
                        style={[
                          styles.filtextName,
                          {
                            color: activeIndex == 2 ? '#000000' : '#fff',
                          },
                        ]}>
                       Losses
                      </Text>
                    </TouchableOpacity> */}


                    <TouchableOpacity
                      style={[
                        styles.filterBox,
                        {
                          backgroundColor:
                            activeIndex == 3 ? '#54d4d2' : '#413a89',
                          width: '24%'
                        },
                      ]}
                      onPress={() => {
                        setActiveIndex(3);
                        dispatch(getLeaderBoardReq({}))
                        setFilterName('W/L %');
                        sortByWinPer()
                      }}>
                      <Text
                        style={[
                          styles.filtextName,
                          {
                            color: activeIndex == 3 ? '#000000' : '#fff',
                          },
                        ]}>
                        W/L %
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.filterBox,
                        {
                          backgroundColor:
                            activeIndex == 4 ? '#54d4d2' : '#413a89',
                          width: '22%'
                        },
                      ]}
                      onPress={() => {
                        setActiveIndex(4);
                        dispatch(getLeaderBoardReq({}))
                        setFilterName('+/-');
                        sortByDiff()
                      }}>
                      <Text
                        style={[
                          styles.filtextName,
                          {
                            color: activeIndex == 4 ? '#000000' : '#fff',
                          },
                        ]}>
                        +/-
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Separator dividerStyle={[{ zIndex: -1 }]} />

                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.tableHeader, styles.rowContainer]}>
                    <Text style={styles.tableHead}>Player</Text>
                    <Text style={[styles.tableHead, styles.textCenter]}>
                      {filterName}
                    </Text>
                  </LinearGradient>

                  {
                    isApicall ? null : (
                      <FlatList
                        data={leaderBoardData}
                        renderItem={RenderGameList}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={() => {
                          return (
                            <View style={styles.ListEmptyComponentStyle}>
                              <Text style={styles.ListEmptyTextStyle}>No Data Found</Text>
                            </View>
                          )
                        }}
                      />
                    )
                  }

                </View>
              </ScrollView>

              {
                isApicall && <Loader
                  visible={isApicall}
                />
              }
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

      <Modal isVisible={isModalVisible2}>
        <View style={[]}>
          <ImageBackground
            style={{}}
            resizeMode="stretch"
            source={Images.modalBg}>
            <View style={[styles.flexContainer, styles.ph10]}>
              <View style={[styles.modalInner, css.p2]}>
                <View style={[styles.modalBody2, css.center]}>
                  <TouchableOpacity
                    style={styles.resultBtn}
                    onPress={() => {
                      setResult('Wins');
                      setFilterName('Wins');
                      setModalVisible2(false);
                    }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 100,
                        backgroundColor:
                          result === 'Wins' ? Colors.btnBlue : '#fff',
                        marginRight: normalize(10),
                      }}
                    />
                    <Text style={styles.headerText}>Wins</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.resultBtn}
                    onPress={() => {
                      setResult('Loss');
                      setFilterName('Loss');
                      setModalVisible2(false);
                    }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 100,
                        backgroundColor:
                          result === 'Loss' ? Colors.btnBlue : '#fff',
                        marginRight: normalize(10),
                      }}
                    />
                    <Text style={styles.headerText}>Loss</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
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
  },
  mainContainer: {
    height: Sizes.height - normalize(100),
    width: '100%',
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
  modalBody2: {
    justifyContent: 'center',
    width: '100%',
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
  resultBtn: {
    width: '100%',
    // backgroundColor: '#fff',
    marginVertical: normalize(10),
    padding: normalize(10),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  rowContainer: {
    flexDirection: 'row',
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
  w100Percent: {
    width: '100%',
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
  },
  filtextName: {
    fontSize: normalize(10),
    fontFamily: Fonts.robotoMedium,
  },
  screenHeader: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(11),
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

  ListEmptyComponentStyle: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
  },
  ListEmptyTextStyle: {
    color: '#FFF',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
  },
});

export default Leaderboard;
