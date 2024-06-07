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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { scoreHistoryReq } from '../redux/reducer/SessionReducer';
import CustomNoButton from '../components/CustomNoButton';
let status = ''
const SessionResult = props => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [time, setTime] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [ishideView, setHideView] = useState(undefined);
  const [historyData, setHistoryData] = useState([]);
  const [orientation, setOrientation] = useState("PORTRAIT");
  const dispatch = useDispatch()
  const isFocus = useIsFocused()


  const sessionData = useSelector(state => state.SessionReducer)

  console.log('SessionReducerSessionReducer', sessionData?.scoreHistoryRes?.data?.sessionDetails?.enablescoring
  )
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
  const navigation = useNavigation();

  const DATA = [
    {
      id: 1,
      player: 'James p.',
      gp: '7',
      wl: '6-1',
      diff: '+24',
      total: '24',
    },
    {
      id: 2,
      player: 'Jay A.',
      gp: '7',
      wl: '6-1',
      diff: '+20',
      total: '20',
    },
    {
      id: 3,
      player: 'Gil Y.',
      gp: '7',
      wl: '5-2',
      diff: '+12',
      total: '12',
    },
    {
      id: 4,
      player: 'Mike M.',
      gp: '7',
      wl: '5-2',
      diff: '+11',
      total: '11',
    },
    {
      id: 5,
      player: 'Kelly D.',
      gp: '7',
      wl: '4-3',
      diff: '+4',
      total: '04',
    },
    {
      id: 6,
      player: 'Sunghi L.',
      gp: '7',
      wl: '2-5',
      diff: '-15',
      total: '15',
    },
    {
      id: 7,
      player: 'Myra D.',
      gp: '7',
      wl: '2-5',
      diff: '-16',
      total: '16',
    },
    {
      id: 8,
      player: 'Lan A.',
      gp: '7',
      wl: '2-5',
      diff: '-19',
      total: '19',
    },
  ];
  const gameList = [
    {
      id: 1,
      title: 'Jamesp/Mike M vs Gil Y. vs Kelly D. 11-5',
    },
    {
      id: 2,
      title: 'Jamesp/Mike M vs Gil Y. vs Kelly D. 11-9',
    },
    {
      id: 3,
      title: 'Jamesp/Mike M vs Gil Y. vs Kelly D. 11-5',
    },
    {
      id: 4,
      title: 'Jamesp/Mike M vs Gil Y. vs Kelly D. 11-9',
    },
    {
      id: 5,
      title: 'Jamesp/Mike M vs Gil Y. vs Kelly D. 11-5',
    },
    {
      id: 6,
      title: 'Jamesp/Mike M vs Gil Y. vs Kelly D. 11-9',
    },
    {
      id: 7,
      title: 'Jamesp/Mike M vs Gil Y. vs Kelly D. 11-5',
    },
  ];

  useEffect(() => {
    let obj = {
      session_id: props?.route?.params?.session_id
    }

    props?.route?.params?.session_id ? dispatch(scoreHistoryReq(obj)) : (

      props?.navigation?.navigate('BottomTab', {
        screen: 'MoreStackScreen',
        params: {
          screen: 'More',

        },
      })
    )
  }, [isFocus])
  const RenderGameList = ({ item, index }) => {

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setHideView(ishideView == (index + 1) ? undefined : (index + 1));
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={
              index % 2 == 0
                ? ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']
                : ['#4b4190', '#614799', '#623d95']
            } //colors={['rgba(0,0,0,0)']}
            style={[styles.tableHeader, styles.rowContainer]}>
            <Text style={[styles.tableData, { width: '50%' }]}>
              {index + 1}. {item?.full_name}
            </Text>

            <ScrollView
              horizontal
              contentContainerStyle={{
                flex: 1,
              }}
            >
              <View style={{ width: '25%', }}>
                <Text style={[styles.tableData, styles.textCenter]}>
                {sessionData?.scoreHistoryRes?.data?.sessionDetails?.enablescoring ? item?.details?.length  : '--'}
                </Text>
              </View>
              <View style={{ width: '25%', }}>
                <Text style={[styles.tableData, styles.textCenter]}>{ sessionData?.scoreHistoryRes?.data?.sessionDetails?.enablescoring ? `${item?.total_win_game}-${item?.total_loss_game}` : '--' }</Text>
              </View>
              <View style={{ width: '25%', }}>
                <Text style={[styles.tableData, styles.textCenter]}>
                  { sessionData?.scoreHistoryRes?.data?.sessionDetails?.enablescoring ? item?.diff : '--'}
                </Text>
              </View>

              <View style={{ width: '25%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={[styles.tableData, styles.textCenter]}>
                  {sessionData?.scoreHistoryRes?.data?.sessionDetails?.enablescoring ? item?.total : '--'}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setHideView(ishideView == (index + 1) ? undefined : (index + 1));
                  }}>
                  <Image
                    source={
                      ishideView == (index + 1) ? Icons.expandedDown : Icons.expandedUp
                    }
                    style={styles.expIcon}
                  />
                </TouchableOpacity>
              </View>


            </ScrollView>
          </LinearGradient>
        </TouchableOpacity>

        {ishideView == (index + 1) ? (
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#5650a1',
              marginBottom: normalize(10),
              marginTop: index % 2 == 0 ? normalize(0) : normalize(10),
            }}
          />
        ) : null}
        {ishideView == (index + 1) ? (
          item?.details?.map((i, key) => {
            return (


              <View>
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        color: 'rgba(250, 135, 146, 1)',
                        fontFamily: Fonts.robotoMedium,
                        fontSize: normalize(13),
                      }}>
                      Game {key + 1} :{' '}
                    </Text>
                    <Text
                      style={{
                        //  width: '19%',
                        color: '#fff',
                        fontFamily: Fonts.robotoMedium,
                        fontSize: normalize(13),
                      }}>
                      {
                        `${i?.team1_player1?.first_name?.charAt(0)}. ${i?.team1_player1?.last_name}`

                      }
                      {
                        i?.team1_player2?.first_name && ` / ${i?.team1_player2?.first_name?.charAt(0)}. ${i?.team1_player2?.last_name}`
                      }
                      {
                       sessionData?.scoreHistoryRes?.data?.sessionDetails?.enablescoring && ` (${i?.team1_score})` 
                      }
                      {' '} vs
                      {'\n'}

                      {
                        `${i?.team2_player1?.first_name?.charAt(0)}. ${i?.team2_player1?.last_name}`

                      }
                      {
                        i?.team2_player2?.first_name && ` / ${i?.team2_player2?.first_name?.charAt(0)}. ${i?.team2_player2?.last_name}`
                      }
                      {
                        sessionData?.scoreHistoryRes?.data?.sessionDetails?.enablescoring && ` (${i?.team2_score})`
                      }

                      {/* {
                            ` ${i?.team1_score}-${i.team2_score}`
                          } */}
                    </Text>
                  </View>

                  <Image source={Images.dashedLine} style={styles.dashedLine} />
                </>


              </View>



            )
          })
        ) : null}
      </>
    );
    // (
    //   <>
    //     <View style={[styles.tableHeader, styles.rowContainer]}>
    //       <Text style={styles.tableData} numberOfLines={1}>
    //         {index + 1}. {item?.player}
    //       </Text>
    //       <Text style={[styles.tableData, styles.textCenter]}>{item?.gp}</Text>
    //       <Text style={[styles.tableData, styles.textCenter]}>{item?.wl}</Text>
    //       <Text style={[styles.tableData, styles.textCenter]}>
    //         {item?.diff}
    //       </Text>
    //       <Text style={[styles.tableData, styles.textRight]}>
    //         {item?.total}
    //       </Text>
    //       <TouchableOpacity
    //         onPress={() => {
    //           setHideView(ishideView == item.id ? undefined : item.id);
    //         }}>
    //         <Image
    //           source={
    //             ishideView === item.id ? Icons.expandedDown : Icons.expandedUp
    //           }
    //           style={styles.expIcon}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //     {ishideView === item.id ? (
    //       <FlatList
    //         data={gameList}
    //         renderItem={(listItem,index) => {
    //             console.log('listItem',listItem.index);
    //           return (
    //             <View style={{flexDirection: 'row',}}>
    //               <Text>Game  {listItem.index} :</Text>
    //               <Text>{listItem.item.title}</Text>
    //             </View>
    //           );
    //         }}
    //         keyExtractor={listI => listI.id}
    //       />
    //     ) : null}
    //   </>
    // ) : (
  };
  if (status === '' || sessionData.status !== status) {
    switch (sessionData.status) {
      case 'Session/scoreHistoryReq':
        status = sessionData.status;
        break;
      case 'Session/scoreHistorySuccess':
        status = sessionData.status;
        setHistoryData(sessionData?.scoreHistoryRes?.data)
        console.log(historyData, 'historyData')
        break;
      case 'Session/scoreHistoryFailure':
        status = sessionData.status;
        break;
    }
  }

  console.log(sessionData?.scoreHistoryRes?.data?.scoreDetails, 'slkdlskd', DATA)
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
              style={[css.mainContainer]}
              resizeMode="stretch"
              source={Images.bg2}>

              <Header
                showBackArrow={true}
                {...props}
                // onPress={() => setShowDropDown(!showDropDown)}
                title="RR Session - Results"
                hideMenu={props?.route?.params?.hideMenu ? false : true}
                isBackPress={props?.route?.params?.navType == 'gameList' ? true : false}
                backPress={() => props?.route?.params?.navType == 'gameList' ? props?.navigation?.navigate('Home') : props?.navigation.goBack()}


              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={css.mt3}
                contentContainerStyle={{
                  paddingBottom: Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(80) : normalize(360)) : normalize(150),
                  paddingHorizontal: normalize(20)
                }}>
                <View style={{ marginTop: normalize(15) }}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.tableHeader, styles.rowContainer]}>
                    <Text style={[styles.tableHead, { width: '50%' }]}>Player</Text>
                    <View style={{ width: '50%', flexDirection: 'row' }}>
                      <Text style={[styles.tableHead, styles.textCenter]}>
                        GP
                      </Text>
                      <Text style={[styles.tableHead, styles.textCenter]}>
                        W-L
                      </Text>
                      <Text style={[styles.tableHead, styles.textCenter]}>
                        Diff
                      </Text>
                      <Text style={[styles.tableHead, styles.textCenter]}>
                        Total
                      </Text>
                    </View>
                  </LinearGradient>

                  <FlatList
                    // data={sessionData?.scoreHistoryRes?.data?.scoreDetails ? sessionData?.scoreHistoryRes?.data?.scoreDetails : []}
                    data={sessionData?.scoreHistoryRes?.data?.scoreDetails}
                    renderItem={RenderGameList}
                    keyExtractor={item => item.index}
                  />
                  <View
                    style={{
                      height: 0.2,
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      marginVertical: normalize(25),
                    }}
                  />

                  {
                    props?.route?.params?.showMenu ? (
                      <CustomButton
                        btnText="SESSION COMPLETE"
                        titleStyle={[]}
                        onPress={() => {
                          // navigation.navigate('SelectMail', {
                          //   showMenu: !props?.route?.params?.showMenu
                          //     ? false
                          //     : true,
                          // });
                          navigation.navigate('HomeStackScreen');
                        }}
                      />
                    ) : null
                  }
                  <CustomNoButton
                    btnText="CLOSE"
                    titleStyle={[]}
                    onPress={() => {
                      // navigation.navigate('SelectMail', {
                      //   showMenu: !props?.route?.params?.showMenu
                      //     ? false
                      //     : true,
                      // });
                      navigation.navigate('HomeStackScreen');
                    }}
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
  itemCenter: {
    alignItems: 'center',
  },
  zIndexOverFlatList: {
    zIndex: 99999,
  },
  tableHead: {
    width: '25%',
    // width: '25%',
    color: '#0BD3D3',
    textTransform: 'uppercase',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(10),
  },
  tableData: {
    // width: '20%',
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(10),
    justifyContent: 'center'
  },
  tableDataName: {
    flex: 1,
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(10),
  },
  tableHeader: {
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(5),
  },

  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  expIcon: {
    width: normalize(10),
    height: normalize(10),
    resizeMode: 'stretch',
    marginLeft: normalize(5),
  },
  dashedLine: {
    width: '100%',
    height: normalize(0.5),
    resizeMode: 'stretch',
    marginVertical: normalize(10),
  },
});

export default SessionResult;
