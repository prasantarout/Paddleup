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
  FlatList,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { updateScoreReq } from '../redux/reducer/CmsReducer';
import CustomToast from '../utils/helpers/CustomToast';
import { getSessDetailsReq, sessionEndReq } from '../redux/reducer/SessionReducer';
import CustomNoButton from '../components/CustomNoButton';

let status = ''
let status1 = ''
const GameList = props => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [time, setTime] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [score, setScore] = useState(2);
  const [showContent, setShowContent] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [dataItem, setDataItem] = useState([]);
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [activeGame, setActiveGame] = useState(0);
  const [teamNumnber, setTeamNumnber] = useState(undefined);
  const [activeScroll, setActiveScroll] = useState(undefined);
  const [courtNumber, setCourtNumnber] = useState(undefined);
  const [currentGameIndex, setCurrentGameIndex] = useState(1);
  const [isApiCall, setApiCall] = useState(false);
  const spinValue = useState(new Animated.Value(0))[0];


  const [totalGameIndex, setTotalGameIndex] = useState(1);

  const SessionReducer = useSelector(state => state.SessionReducer);
  const CmsReducer = useSelector(state => state.CmsReducer);

  const dispatch = useDispatch()
  const [scoreData, setScoreData] = useState([])
  // let scoreData =
  //   [
  //     { label: '0', value: '0' },
  //     { label: '1', value: '1' },
  //     { label: '2', value: '2' },
  //     { label: '3', value: '3' },
  //     { label: '4', value: '4' },
  //     { label: '5', value: '5' },
  //     { label: '6', value: '6' },
  //     { label: '7', value: '7' },
  //     { label: '8', value: '8' },
  //     { label: '9', value: '9' },
  //     { label: '10', value: '10' },
  //     { label: '11', value: '11' },
  //     { label: '12', value: '12' },
  //   ]



  console.log(SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
    ?.player_data[totalGameIndex - 1], 'klklkklklkl', totalGameIndex)

  useEffect(() => {
    let courtArray = [];

    for (let i = 0; i <= 40; i++) {
      courtArray.push({
        label: `${i}`,
        value: `${i}`,
      });
    }
    setScoreData(courtArray);
    let obj = {
      session_id: props?.route?.params?.sessionID
    }
    props?.route?.params?.sessionID && (


      dispatch(getSessDetailsReq(obj))
    )
  }, []);
  console.log(SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt, 'SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt')
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
  const navigation = useNavigation();

  useEffect(() => {
    let data = new FormData()
    let obj = {
      session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
    }
    dispatch(getSessDetailsReq(obj))
    data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id)
    data.append("game", totalGameIndex)

    for (let i = 1; i <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; i++) {
      if (i == 1) {
        SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
          ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
            ?.player_data[currentGameIndex - 1]?.game_standby)

        SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
          ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
            ?.player_data[currentGameIndex - 1]?.game_standby2)

        SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
          ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
            ?.player_data[currentGameIndex - 1]?.game_standby3)
      }



      SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
        ?.player_data[currentGameIndex - 1]?.[`court${i}_game`]?.team1_player1 && data.append(`court${i}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
          ?.player_data[currentGameIndex - 1]?.[`court${i}_game`]?.team1_player1)

      SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
        ?.player_data[currentGameIndex - 1]?.[`court${i}_game`]?.team1_player2 && data.append(`court${i}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
          ?.player_data[currentGameIndex - 1]?.[`court${i}_game`]?.team1_player2)

      SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
        ?.player_data[currentGameIndex - 1]?.[`court${i}_game`]?.team2_player1 && data.append(`court${i}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
          ?.player_data[currentGameIndex - 1]?.[`court${i}_game`]?.team2_player1)

      SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
        ?.player_data[currentGameIndex - 1]?.[`court${i}_game`]?.team2_player2 && data.append(`court${i}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
          ?.player_data[currentGameIndex - 1]?.[`court${i}_game`]?.team2_player2)

      data.append(`court${i}_game[team1_score]`, 0)
      data.append(`court${i}_game[team2_score]`, 0)
    }

    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
      ?.player_data?.[totalGameIndex - 1] == undefined ? (
      SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
        ?.player_data[currentGameIndex - 1]?.court1_game?.team1_player1 && dispatch(updateScoreReq(data))
    ) : (
      setDataItem(
        SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
          ?.player_data[currentGameIndex - 1]
      )
    )


    setTimeout(() => {
      console.log('lakslaks')
      let obj = {
        session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
      }
      // currentGameIndex >= 
      dispatch(getSessDetailsReq(obj))
    }, 1000);
  }, [currentGameIndex]);

  useEffect(() => {
    let obj = {
      session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
    }
    dispatch(getSessDetailsReq(obj))
  }, [isFocus]);

  if (status === '' || SessionReducer.status !== status) {
    switch (SessionReducer.status) {
      case 'Session/getSessDetailsReq':
        status = SessionReducer.status;
        setApiCall(true)
        break;
      case 'Session/getSessDetailsSuccess':
        status = SessionReducer.status;
        status1 = SessionReducer.status;
        setDataItem(
          SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
            ?.player_data[totalGameIndex - 1],
          setApiCall(false),
          console.log('askalksaklskla', SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
            ?.player_data[totalGameIndex - 1], totalGameIndex)
        );
        break;
      case 'Session/getSessDetailsFailure':
        status = SessionReducer.status;
        setApiCall(false)
        break;
      case 'Session/sessionEndReq':
        status = SessionReducer.status;
        break;
      case 'Session/sessionEndSuccess':
        status = SessionReducer.status;

        props?.navigation.navigate('SessionResult', {
          showMenu: false,
          navType: 'gameList',
          session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
        });
        break;
      case 'Session/sessionEndFailure':
        status = SessionReducer.status;
        break;

    }
  }


  if (status1 === '' || CmsReducer.status1 !== status1) {
    switch (CmsReducer.status) {
      case 'CMS/updateScoreReq':
        status1 = CmsReducer.status;

        break;
      case 'CMS/updateScoreSucces':
        status1 = CmsReducer.status;
        // let obj = {
        //   session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
        // }
        // dispatch(getSessDetailsReq(obj))

        break;
      case 'CMS/updateScoreFailure':
        status1 = CmsReducer.status;

        break;

    }
  }

  //   const [itemValue, setItemValue] = useState({
  //     _id:dataItem?.map(item=>item?.team1_player1_details?._id),
  //     court1_game: {
  //      team1_score: 0,
  //      team1_player1:dataItem?.map(item=>item?.court1_game?.team1_player1)
  //    }
  //  });

  //  const handlePress = (data) => {
  //   if (data?.team1_player1_details?._id === data?.court1_game?.team1_player1) {
  //     const updatedItem = {
  //       ...data,
  //       court1_game: {
  //         ...data.court1_game,
  //         team1_score: data.court1_game.team1_score + 1
  //       }
  //     };
  //     console.log(updatedItem,"hellowordl");
  //     setItemValue(updatedItem);
  //   }
  // };



  const RenderGameList = ({ item, index }) => {

    console.log(activeScroll, 'currentGameIndexcurrentGameIndex', teamNumnber)

    return (
      <View>
        {/* #game1 */}
        {
          item?.court1_game?.team1_player1_details && (
            <View>
              <View style={[styles.rowContainer, styles.rowContentCenter, css.mb3, styles.rowSpaceBetween

              ]}>
                <Text style={styles.gameName}>
                  {SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable.courts_details[0]?.title} {' '}


                </Text>

              </View>

              <View style={[styles.rowContainer, styles.rowSpaceBetween]}>
                <View style={styles.flex1}>
                  <View style={styles.playerNameContainer}>
                    <Text numberOfLines={1} style={styles.playerName}>

                      {`${item?.court1_game?.team1_player1_details?.first_name.charAt(0)}. ${item?.court1_game?.team1_player1_details?.last_name}`
                      }
                    </Text>
                  </View>
                  {
                    item?.court1_game?.team1_player2_details &&
                    (<View style={[styles.playerNameContainer, css.mt1]}>
                      <Text numberOfLines={1} style={styles.playerName}>
                        {`${item?.court1_game?.team1_player2_details?.first_name.charAt(0)}. ${item?.court1_game?.team1_player2_details?.last_name}`}
                      </Text>
                    </View>)
                  }

                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(1)
                        setCourtNumnber(1)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}
                      style={[
                        styles.playerNumContainer,
                        styles.rowContainer,
                        styles.rowContentCenter,
                      ]}>
                      <Text numberOfLines={1} style={styles.playerNum}>
                        {item?.court1_game?.team1_score}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setTeamNumnber(1)
                          setCourtNumnber(1)
                          setActiveScroll(activeScroll == index ? undefined : index)
                        }}>
                        <Image
                          source={M_Icons.toggleDown}
                          style={[styles.toggleIconStyle,
                          teamNumnber == 1 && courtNumber == 1 && activeScroll == index && {
                            transform: [{ rotate: '180deg' }],
                          },
                          ]}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 1 && courtNumber == 1 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          backgroundColor: '#FFF',
                          alignSelf: 'flex-start',
                          position: 'absolute',
                          zIndex: 999999
                        }}

                      >



                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10),
                              zIndex: 9999,
                            }}


                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp?.court1_game.team1_score, 'temptemp')
                                temp.court1_game.team1_score = i?.value;
                                setDataItem(temp)
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id)

                                data.append("game", totalGameIndex)
                                // data.append("court", 1)
                                // data.append("team", 1)
                                // data.append("score", i?.value)

                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  console.log('lsdlksdkklsdkl', j)

                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }



                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 1 ? data.append(`court${j}_game[team1_score]`, i?.value) : data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                  data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)

                                }

                                dispatch(updateScoreReq(data))

                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }

                </View>

                <View style={[styles.vsWrapper, styles.itemCenter]}>
                  <Image source={Icons.vs} style={[styles.vs,
                  {
                    marginTop: item?.court1_game?.team2_player2_details ? normalize(28.5) : normalize(7)
                  }]} />
                </View>

                <View style={[styles.flex1]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.playerNameContainer, props.gradientStyle]}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {`${item?.court1_game?.team2_player1_details?.first_name.charAt(0)}. ${item?.court1_game?.team2_player1_details?.last_name}`
                      }
                    </Text>
                  </LinearGradient>
                  {
                    item?.court1_game?.team2_player2_details &&
                    (<LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.playerNameContainer, css.mt1]}>
                      <Text numberOfLines={1} style={styles.playerName}>
                        {`${item?.court1_game?.team2_player2_details?.first_name.charAt(0)}. ${item?.court1_game?.team2_player2_details?.last_name}`
                        }
                      </Text>
                    </LinearGradient>)
                  }

                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring && (
                      <TouchableOpacity
                        onPress={() => {
                          setTeamNumnber(2)
                          setCourtNumnber(1)
                          setActiveScroll(activeScroll == index ? undefined : index)
                        }}>
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          colors={['#4b4190', '#614799', '#623d95']}

                          style={{
                            backgroundColor: '#433c8a',
                            paddingVertical: normalize(10),
                            paddingHorizontal: normalize(10),
                            borderRadius: normalize(8),
                            alignSelf: 'flex-end',
                            width: 60,
                            marginTop: normalize(5),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}

                        >
                          <Text numberOfLines={1} style={styles.playerNum}>
                            {item?.court1_game?.team2_score}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              setTeamNumnber(2)
                              setCourtNumnber(1)
                              setActiveScroll(activeScroll == index ? undefined : index)
                            }}>
                            <Image
                              source={M_Icons.toggleDown}
                              style={[styles.toggleIconStyle,
                              teamNumnber == 2 && courtNumber == 1 && activeScroll == index && {
                                transform: [{ rotate: '180deg' }],
                              },
                              ]}
                            />
                          </TouchableOpacity>

                        </LinearGradient>
                      </TouchableOpacity>
                    )
                  }

                  {
                    teamNumnber == 2 && courtNumber == 1 && activeScroll == index && (

                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          // top: normalize(0),
                          // bottom: 0
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court1_game.team2_score = i?.value;
                                setDataItem(temp)
                                console.log(temp, 'temptemp')
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                // data.append("court", 1)
                                // data.append("team", 2)
                                // data.append("score", i?.value)

                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }


                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 1 ? data.append(`court${j}_game[team2_score]`, i?.value) : data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)
                                  data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                }

                                dispatch(updateScoreReq(data))

                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>

                    )
                  }
                </View>
              </View>
              <Separator dividerStyle={[css.mb5, { zIndex: -1 }]} />
            </View>
          )
        }


        {/* #game2 */}

        {
          item?.court2_game?.team1_player1_details && (
            <View>
              <View style={[styles.rowContainer, styles.rowContentCenter, css.mb3, styles.rowSpaceBetween]}>
                <Text style={styles.gameName}>
                  {SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable.courts_details[1]?.title} {' '}
                </Text>

              </View>

              <View style={[styles.rowContainer, styles.rowSpaceBetween]}>
                <View style={styles.flex1}>
                  <View style={styles.playerNameContainer}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {
                        `${item?.court2_game?.team1_player1_details?.first_name.charAt(0)}. ${item?.court2_game?.team1_player1_details?.last_name}`
                      }
                    </Text>
                  </View>
                  {
                    item?.court2_game?.team1_player2_details && (
                      <View style={[styles.playerNameContainer, css.mt1]}>
                        <Text numberOfLines={1} style={styles.playerName}>
                          {`${item?.court2_game?.team1_player2_details?.first_name.charAt(0)}. ${item?.court2_game?.team1_player2_details?.last_name}`}
                        </Text>
                      </View>
                    )
                  }
                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(1)
                        setCourtNumnber(2)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}
                      style={[
                        styles.playerNumContainer,
                        styles.rowContainer,
                        styles.rowContentCenter,
                      ]}>
                      <Text numberOfLines={1} style={styles.playerNum}>
                        {item?.court2_game?.team1_score}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setTeamNumnber(1)
                          setCourtNumnber(2)
                          setActiveScroll(activeScroll == index ? undefined : index)
                        }}>
                        <Image
                          source={M_Icons.toggleDown}
                          style={[styles.toggleIconStyle,
                          teamNumnber == 1 && courtNumber == 2 && activeScroll == index && {
                            transform: [{ rotate: '180deg' }],
                          },
                          ]}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 1 && courtNumber == 2 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          position: 'absolute',
                          backgroundColor: '#FFF'

                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court2_game.team1_score = i?.value;
                                setDataItem(temp)
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }


                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)



                                  j == 2 ? data.append(`court${j}_game[team1_score]`, i?.value) : data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)
                                  data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)


                                }

                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)

                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>

                <View style={[styles.vsWrapper, styles.itemCenter]}>
                  <Image source={Icons.vs} style={[styles.vs,
                  {
                    marginTop: item?.court2_game?.team2_player2_details ? normalize(28.5) : normalize(7)
                  }]} />
                </View>

                <View style={[styles.flex1]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.playerNameContainer, props.gradientStyle]}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {`${item?.court2_game?.team2_player1_details?.first_name.charAt(0)}. ${item?.court2_game?.team2_player1_details?.last_name}`
                      }
                    </Text>
                  </LinearGradient>

                  {
                    item?.court2_game?.team2_player2_details &&
                    (<LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.playerNameContainer, css.mt1]}>
                      <Text numberOfLines={1} style={styles.playerName}>
                        {`${item?.court2_game?.team2_player2_details?.first_name.charAt(0)}. ${item?.court2_game?.team2_player2_details?.last_name}`
                        }
                      </Text>
                    </LinearGradient>)
                  }

                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(2)
                        setCourtNumnber(2)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#4b4190', '#614799', '#623d95']}

                        style={{
                          backgroundColor: '#433c8a',
                          paddingVertical: normalize(10),
                          paddingHorizontal: normalize(10),
                          borderRadius: normalize(8),
                          alignSelf: 'flex-end',
                          width: 60,
                          marginTop: normalize(5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}

                      >
                        <Text numberOfLines={1} style={styles.playerNum}>
                          {item?.court2_game?.team2_score}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setTeamNumnber(2)
                            setCourtNumnber(2)
                            setActiveScroll(activeScroll == index ? undefined : index)
                          }}>
                          <Image
                            source={M_Icons.toggleDown}
                            style={[styles.toggleIconStyle,
                            teamNumnber == 2 && courtNumber == 2 && activeScroll == index && {
                              transform: [{ rotate: '180deg' }],
                            },
                            ]}
                          />
                        </TouchableOpacity>

                      </LinearGradient>
                    </TouchableOpacity>)

                  }
                  {
                    teamNumnber == 2 && courtNumber == 2 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court2_game.team2_score = i?.value;
                                setDataItem(temp)
                                console.log(temp, 'temptemp')
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 2 ? data.append(`court${j}_game[team2_score]`, i?.value) : data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)
                                  data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                }


                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>
              </View>
              <Separator dividerStyle={[css.mb5]} />
            </View>
          )
        }


        {/* #game3 */}

        {
          item?.court3_game?.team1_player1_details && (
            <>
              <View style={[styles.rowContainer, styles.rowContentCenter, css.mb3, styles.rowSpaceBetween]}>
                <Text style={styles.gameName}>
                  {SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable.courts_details[2]?.title} {' '}
                </Text>

              </View>

              <View style={[styles.rowContainer, styles.rowSpaceBetween]}>
                <View style={styles.flex1}>
                  <View style={styles.playerNameContainer}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {`${item?.court3_game?.team1_player1_details?.first_name.charAt(0)}. ${item?.court3_game?.team1_player1_details?.last_name}`
                      }
                    </Text>
                  </View>
                  {
                    item?.court3_game?.team1_player2_details && (
                      <View style={[styles.playerNameContainer, css.mt1]}>
                        <Text numberOfLines={1} style={styles.playerName}>
                          {`${item?.court3_game?.team1_player2_details?.first_name.charAt(0)}. ${item?.court3_game?.team1_player2_details?.last_name}`}
                        </Text>
                      </View>
                    )
                  }

                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(1)
                        setCourtNumnber(3)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}
                      style={[
                        styles.playerNumContainer,
                        styles.rowContainer,
                        styles.rowContentCenter,
                      ]}>
                      <Text numberOfLines={1} style={styles.playerNum}>
                        {item?.court3_game?.team1_score}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setTeamNumnber(1)
                          setCourtNumnber(3)
                          setActiveScroll(activeScroll == index ? undefined : index)
                        }}>
                        <Image
                          source={M_Icons.toggleDown}
                          style={[styles.toggleIconStyle,
                          teamNumnber == 1 && courtNumber == 3 && activeScroll == index && {
                            transform: [{ rotate: '180deg' }],
                          },
                          ]}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 1 && courtNumber == 3 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court3_game.team1_score = i?.value;
                                setDataItem(temp)
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }


                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 3 ? data.append(`court${j}_game[team1_score]`, i?.value) : data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)
                                  data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)

                                }


                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>

                <View style={[styles.vsWrapper, styles.itemCenter]}>
                  <Image source={Icons.vs} style={[styles.vs,
                  {
                    marginTop: item?.court3_game?.team2_player2_details ? normalize(28.5) : normalize(7)
                  }]} />
                </View>

                <View style={[styles.flex1]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.playerNameContainer, props.gradientStyle]}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {
                        `${item?.court3_game?.team2_player1_details?.first_name.charAt(0)}. ${item?.court3_game?.team2_player1_details?.last_name}`
                      }
                    </Text>
                  </LinearGradient>
                  {
                    item?.court3_game?.team2_player2_details &&
                    (<LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.playerNameContainer, css.mt1]}>
                      <Text numberOfLines={1} style={styles.playerName}>
                        {`${item?.court3_game?.team2_player2_details?.first_name.charAt(0)}. ${item?.court3_game?.team2_player2_details?.last_name}`
                        }
                      </Text>
                    </LinearGradient>)
                  }

                  {

                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(2)
                        setCourtNumnber(3)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#4b4190', '#614799', '#623d95']}

                        style={{
                          backgroundColor: '#433c8a',
                          paddingVertical: normalize(10),
                          paddingHorizontal: normalize(10),
                          borderRadius: normalize(8),
                          alignSelf: 'flex-end',
                          width: 60,
                          marginTop: normalize(5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}

                      >
                        <Text numberOfLines={1} style={styles.playerNum}>
                          {item?.court3_game?.team2_score}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setTeamNumnber(2)
                            setCourtNumnber(3)
                            setActiveScroll(activeScroll == index ? undefined : index)
                          }}>
                          <Image
                            source={M_Icons.toggleDown}
                            style={[styles.toggleIconStyle,
                            teamNumnber == 2 && courtNumber == 3 && activeScroll == index && {
                              transform: [{ rotate: '180deg' }],
                            },
                            ]}
                          />
                        </TouchableOpacity>

                      </LinearGradient>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 2 && courtNumber == 3 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court3_game.team2_score = i?.value;
                                setDataItem(temp)
                                console.log(temp, 'temptemp')
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }


                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 3 ? data.append(`court${j}_game[team2_score]`, i?.value) : data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)

                                  data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                }
                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>
              </View>
              <Separator dividerStyle={[css.mb5]} />
            </>
          )
        }
        {/* #game4 */}

        {
          item?.court4_game?.team1_player1_details && (
            <>
              <View style={[styles.rowContainer, styles.rowContentCenter, css.mb3, styles.rowSpaceBetween]}>
                <Text style={styles.gameName}>
                  {SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable.courts_details[3]?.title} {' '}
                </Text>

              </View>

              <View style={[styles.rowContainer, styles.rowSpaceBetween]}>
                <View style={styles.flex1}>
                  <View style={styles.playerNameContainer}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {
                        `${item?.court4_game?.team1_player1_details?.first_name.charAt(0)}. ${item?.court4_game?.team1_player1_details?.last_name}`
                      }
                    </Text>
                  </View>

                  {
                    item?.court4_game?.team1_player2_details && (
                      <View style={[styles.playerNameContainer, css.mt1]}>
                        <Text numberOfLines={1} style={styles.playerName}>
                          {`${item?.court4_game?.team1_player2_details?.first_name.charAt(0)}. ${item?.court4_game?.team1_player2_details?.last_name}`}
                        </Text>
                      </View>
                    )
                  }

                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(1)
                        setCourtNumnber(4)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}
                      style={[
                        styles.playerNumContainer,
                        styles.rowContainer,
                        styles.rowContentCenter,
                      ]}>
                      <Text numberOfLines={1} style={styles.playerNum}>
                        {item?.court4_game?.team1_score}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setTeamNumnber(1)
                          setCourtNumnber(4)
                          setActiveScroll(activeScroll == index ? undefined : index)
                        }}>
                        <Image
                          source={M_Icons.toggleDown}
                          style={[styles.toggleIconStyle,
                          teamNumnber == 1 && courtNumber == 4 && activeScroll == index && {
                            transform: [{ rotate: '180deg' }],
                          },
                          ]}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 1 && courtNumber == 4 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court4_game.team1_score = i?.value;
                                setDataItem(temp)
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }


                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 4 ? data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score) : data.append(`court${j}_game[team1_score]`, i?.value)
                                  data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)

                                }

                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>

                <View style={[styles.vsWrapper, styles.itemCenter]}>
                  <Image source={Icons.vs} style={[styles.vs,
                  {
                    marginTop: item?.court4_game?.team2_player2_details ? normalize(28.5) : normalize(7)
                  }]} />
                </View>

                <View style={[styles.flex1]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.playerNameContainer, props.gradientStyle]}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {
                        `${item?.court4_game?.team2_player1_details?.first_name.charAt(0)}. ${item?.court4_game?.team2_player1_details?.last_name}`
                      }
                    </Text>
                  </LinearGradient>

                  {
                    item?.court4_game?.team2_player2_details &&
                    (<LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.playerNameContainer, css.mt1]}>
                      <Text numberOfLines={1} style={styles.playerName}>
                        {`${item?.court4_game?.team2_player2_details?.first_name.charAt(0)}. ${item?.court4_game?.team2_player2_details?.last_name}`
                        }
                      </Text>
                    </LinearGradient>)
                  }

                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(2)
                        setCourtNumnber(4)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#4b4190', '#614799', '#623d95']}

                        style={{
                          backgroundColor: '#433c8a',
                          paddingVertical: normalize(10),
                          paddingHorizontal: normalize(10),
                          borderRadius: normalize(8),
                          alignSelf: 'flex-end',
                          width: 60,
                          marginTop: normalize(5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}

                      >
                        <Text numberOfLines={1} style={styles.playerNum}>
                          {item?.court4_game?.team2_score}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setTeamNumnber(2)
                            setCourtNumnber(4)
                            setActiveScroll(activeScroll == index ? undefined : index)
                          }}>
                          <Image
                            source={M_Icons.toggleDown}
                            style={[styles.toggleIconStyle,
                            teamNumnber == 2 && courtNumber == 4 && activeScroll == index && {
                              transform: [{ rotate: '180deg' }],
                            },
                            ]}
                          />
                        </TouchableOpacity>

                      </LinearGradient>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 2 && courtNumber == 4 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court4_game.team2_score = i?.value;
                                setDataItem(temp)
                                console.log(temp, 'temptemp')
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 4 ? data.append(`court${j}_game[team2_score]`, i?.value) : data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)
                                  data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                }

                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>
              </View>
              <Separator dividerStyle={[css.mb5]} />
            </>
          )
        }
        {/* #game5 */}

        {
          item?.court5_game?.team1_player1_details && (
            <>
              <View style={[styles.rowContainer, styles.rowContentCenter, css.mb3, styles.rowSpaceBetween]}>
                <Text style={styles.gameName}>
                  {SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable.courts_details[4]?.title} {' '}
                </Text>

              </View>

              <View style={[styles.rowContainer, styles.rowSpaceBetween]}>
                <View style={styles.flex1}>
                  <View style={styles.playerNameContainer}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {
                        `${item?.court5_game?.team1_player1_details?.first_name.charAt(0)}. ${item?.court5_game?.team1_player1_details?.last_name}`
                      }
                    </Text>
                  </View>
                  {
                    item?.court5_game?.team1_player2_details && (
                      <View style={[styles.playerNameContainer, css.mt1]}>
                        <Text numberOfLines={1} style={styles.playerName}>
                          {`${item?.court5_game?.team1_player2_details?.first_name.charAt(0)}. ${item?.court5_game?.team1_player2_details?.last_name}`}
                        </Text>
                      </View>
                    )
                  }

                  {

                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&
                    (
                      <TouchableOpacity
                        onPress={() => {
                          setTeamNumnber(1)
                          setCourtNumnber(5)
                          setActiveScroll(activeScroll == index ? undefined : index)
                        }}
                        style={[
                          styles.playerNumContainer,
                          styles.rowContainer,
                          styles.rowContentCenter,
                        ]}>
                        <Text numberOfLines={1} style={styles.playerNum}>
                          {item?.court5_game?.team1_score}
                        </Text>

                        <TouchableOpacity
                          onPress={() => {
                            setTeamNumnber(1)
                            setCourtNumnber(5)
                            setActiveScroll(activeScroll == index ? undefined : index)
                          }}>
                          <Image
                            source={M_Icons.toggleDown}
                            style={[styles.toggleIconStyle,
                            teamNumnber == 1 && courtNumber == 5 && activeScroll == index && {
                              transform: [{ rotate: '180deg' }],
                            },
                            ]}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 1 && courtNumber == 5 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court5_game.team1_score = i?.value;
                                setDataItem(temp)
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }


                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 5 ? data.append(`court${j}_game[team1_score]`, i?.value) : data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)


                                  data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)

                                }
                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>

                <View style={[styles.vsWrapper, styles.itemCenter]}>
                  <Image source={Icons.vs} style={[styles.vs,
                  {
                    marginTop: item?.court5_game?.team2_player2_details ? normalize(28.5) : normalize(7)
                  }]} />
                </View>

                <View style={[styles.flex1]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.playerNameContainer, props.gradientStyle]}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {
                        `${item?.court5_game?.team2_player1_details?.first_name.charAt(0)}. ${item?.court5_game?.team2_player1_details?.last_name}`
                      }
                    </Text>
                  </LinearGradient>
                  {
                    item?.court5_game?.team2_player2_details &&
                    (<LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.playerNameContainer, css.mt1]}>
                      <Text numberOfLines={1} style={styles.playerName}>
                        {`${item?.court5_game?.team2_player2_details?.first_name.charAt(0)}. ${item?.court5_game?.team2_player2_details?.last_name}`
                        }
                      </Text>
                    </LinearGradient>)
                  }

                  {

                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(2)
                        setCourtNumnber(5)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#4b4190', '#614799', '#623d95']}

                        style={{
                          backgroundColor: '#433c8a',
                          paddingVertical: normalize(10),
                          paddingHorizontal: normalize(10),
                          borderRadius: normalize(8),
                          alignSelf: 'flex-end',
                          width: 60,
                          marginTop: normalize(5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}

                      >
                        <Text numberOfLines={1} style={styles.playerNum}>
                          {item?.court5_game?.team2_score}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setTeamNumnber(2)
                            setCourtNumnber(5)
                            setActiveScroll(activeScroll == index ? undefined : index)
                          }}>
                          <Image
                            source={M_Icons.toggleDown}
                            style={[styles.toggleIconStyle,
                            teamNumnber == 2 && courtNumber == 5 && activeScroll == index && {
                              transform: [{ rotate: '180deg' }],
                            },
                            ]}
                          />
                        </TouchableOpacity>

                      </LinearGradient>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 2 && courtNumber == 5 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court5_game.team2_score = i?.value;
                                setDataItem(temp)
                                console.log(temp, 'temptemp')
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 5 ? data.append(`court${j}_game[team2_score]`, i?.value) : data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)

                                  data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                }
                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>
              </View>
              <Separator dividerStyle={[css.mb5]} />
            </>
          )
        }
        {/* #game6 */}
        {
          item?.court6_game?.team1_player1_details && (
            <>
              <View style={[styles.rowContainer, styles.rowContentCenter, css.mb3, styles.rowSpaceBetween]}>
                <Text style={styles.gameName}>
                  {SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable.courts_details[5]?.title} {' '}
                </Text>

              </View>

              <View style={[styles.rowContainer, styles.rowSpaceBetween]}>
                <View style={styles.flex1}>
                  <View style={styles.playerNameContainer}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {
                        `${item?.court6_game?.team1_player1_details?.first_name.charAt(0)}. ${item?.court6_game?.team1_player1_details?.last_name}`
                      }
                    </Text>
                  </View>

                  {
                    item?.court6_game?.team1_player2_details && (
                      <View style={[styles.playerNameContainer, css.mt1]}>
                        <Text numberOfLines={1} style={styles.playerName}>
                          {`${item?.court6_game?.team1_player2_details?.first_name.charAt(0)}. ${item?.court6_game?.team1_player2_details?.last_name}`}
                        </Text>
                      </View>
                    )
                  }

                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(1)
                        setCourtNumnber(6)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}
                      style={[
                        styles.playerNumContainer,
                        styles.rowContainer,
                        styles.rowContentCenter,
                      ]}>
                      <Text numberOfLines={1} style={styles.playerNum}>
                        {item?.court6_game?.team1_score}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setTeamNumnber(1)
                          setCourtNumnber(6)
                          setActiveScroll(activeScroll == index ? undefined : index)
                        }}>
                        <Image
                          source={M_Icons.toggleDown}
                          style={[styles.toggleIconStyle,
                          teamNumnber == 1 && courtNumber == 6 && activeScroll == index && {
                            transform: [{ rotate: '180deg' }],
                          },
                          ]}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 1 && courtNumber == 6 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court6_game.team1_score = i?.value;
                                setDataItem(temp)
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }


                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 6 ? data.append(`court${j}_game[team1_score]`, i?.value) : data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                  data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)

                                }


                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>

                <View style={[styles.vsWrapper, styles.itemCenter]}>
                  <Image source={Icons.vs} style={[styles.vs,
                  {
                    marginTop: item?.court6_game?.team2_player2_details ? normalize(28.5) : normalize(7)
                  }]} />
                </View>

                <View style={[styles.flex1]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.playerNameContainer, props.gradientStyle]}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {
                        `${item?.court6_game?.team2_player1_details?.first_name.charAt(0)}. ${item?.court6_game?.team2_player1_details?.last_name}`
                      }
                    </Text>
                  </LinearGradient>

                  {
                    item?.court6_game?.team2_player2_details &&
                    (<LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.playerNameContainer, css.mt1]}>
                      <Text numberOfLines={1} style={styles.playerName}>
                        {`${item?.court6_game?.team2_player2_details?.first_name.charAt(0)}. ${item?.court6_game?.team2_player2_details?.last_name}`
                        }
                      </Text>
                    </LinearGradient>)
                  }
                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(2)
                        setCourtNumnber(6)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#4b4190', '#614799', '#623d95']}

                        style={{
                          backgroundColor: '#433c8a',
                          paddingVertical: normalize(10),
                          paddingHorizontal: normalize(10),
                          borderRadius: normalize(8),
                          alignSelf: 'flex-end',
                          width: 60,
                          marginTop: normalize(5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}

                      >
                        <Text numberOfLines={1} style={styles.playerNum}>
                          {item?.court6_game?.team2_score}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setTeamNumnber(2)
                            setCourtNumnber(6)
                            setActiveScroll(activeScroll == index ? undefined : index)
                          }}>
                          <Image
                            source={M_Icons.toggleDown}
                            style={[styles.toggleIconStyle,
                            teamNumnber == 2 && courtNumber == 6 && activeScroll == index && {
                              transform: [{ rotate: '180deg' }],
                            },
                            ]}
                          />
                        </TouchableOpacity>

                      </LinearGradient>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 2 && courtNumber == 6 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court6_game.team2_score = i?.value;
                                setDataItem(temp)
                                console.log(temp, 'temptemp')
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 6 ? data.append(`court${j}_game[team2_score]`, i?.value) : data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)


                                  data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                }
                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>
              </View>
              <Separator dividerStyle={[css.mb5]} />
            </>
          )
        }
        {/* #game7 */}
        {
          item?.court7_game?.team1_player1_details && (
            <>


              <View style={[styles.rowContainer, styles.rowContentCenter, css.mb3, styles.rowSpaceBetween]}>
                <Text style={styles.gameName}>
                  {SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable.courts_details[6]?.title} {' '}
                </Text>

              </View>
              <View style={[styles.rowContainer, styles.rowSpaceBetween]}>
                <View style={styles.flex1}>
                  <View style={styles.playerNameContainer}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {`${item?.court7_game?.team1_player1_details?.first_name.charAt(0)}. ${item?.court7_game?.team1_player1_details?.last_name}`
                      }
                    </Text>
                  </View>

                  {
                    item?.court7_game?.team1_player2_details && (
                      <View style={[styles.playerNameContainer, css.mt1]}>
                        <Text numberOfLines={1} style={styles.playerName}>
                          {`${item?.court7_game?.team1_player2_details?.first_name.charAt(0)}. ${item?.court7_game?.team1_player2_details?.last_name}`}
                        </Text>
                      </View>
                    )
                  }

                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(1)
                        setCourtNumnber(7)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}
                      style={[
                        styles.playerNumContainer,
                        styles.rowContainer,
                        styles.rowContentCenter,
                      ]}>
                      <Text numberOfLines={1} style={styles.playerNum}>
                        {item?.court7_game?.team1_score}
                      </Text>

                      <TouchableOpacity
                        onPress={() => {
                          setTeamNumnber(1)
                          setCourtNumnber(7)
                          setActiveScroll(activeScroll == index ? undefined : index)
                        }}>
                        <Image
                          source={M_Icons.toggleDown}
                          style={[styles.toggleIconStyle,
                          teamNumnber == 1 && courtNumber == 7 && activeScroll == index && {
                            transform: [{ rotate: '180deg' }],
                          },
                          ]}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 1 && courtNumber == 7 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court7_game.team1_score = i?.value;
                                setDataItem(temp)
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }


                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 7 ? data.append(`court${j}_game[team1_score]`, i?.value) : data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                  data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)

                                }

                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>

                <View style={[styles.vsWrapper, styles.itemCenter]}>
                  <Image source={Icons.vs} style={[styles.vs,
                  {
                    marginTop: item?.court7_game?.team2_player2_details ? normalize(28.5) : normalize(7)
                  }]} />
                </View>

                <View style={[styles.flex1]}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#4b4190', '#614799', '#623d95']}
                    style={[styles.playerNameContainer, props.gradientStyle]}>
                    <Text numberOfLines={1} style={styles.playerName}>
                      {
                        `${item?.court7_game?.team2_player1_details?.first_name.charAt(0)}. ${item?.court7_game?.team2_player1_details?.last_name}`
                      }
                    </Text>
                  </LinearGradient>

                  {
                    item?.court7_game?.team2_player2_details &&
                    (<LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.playerNameContainer, css.mt1]}>
                      <Text numberOfLines={1} style={styles.playerName}>
                        {`${item?.court7_game?.team2_player2_details?.first_name.charAt(0)}. ${item?.court7_game?.team2_player2_details?.last_name}`
                        }
                      </Text>
                    </LinearGradient>)
                  }
                  {
                    SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring &&

                    (<TouchableOpacity
                      onPress={() => {
                        setTeamNumnber(2)
                        setCourtNumnber(7)
                        setActiveScroll(activeScroll == index ? undefined : index)
                      }}>
                      <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#4b4190', '#614799', '#623d95']}

                        style={{
                          backgroundColor: '#433c8a',
                          paddingVertical: normalize(10),
                          paddingHorizontal: normalize(10),
                          borderRadius: normalize(8),
                          alignSelf: 'flex-end',
                          width: 60,
                          marginTop: normalize(5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}

                      >
                        <Text numberOfLines={1} style={styles.playerNum}>
                          {item?.court7_game?.team2_score}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setTeamNumnber(2)
                            setCourtNumnber(7)
                            setActiveScroll(activeScroll == index ? undefined : index)
                          }}>
                          <Image
                            source={M_Icons.toggleDown}
                            style={[styles.toggleIconStyle,
                            teamNumnber == 2 && courtNumber == 7 && activeScroll == index && {
                              transform: [{ rotate: '180deg' }],
                            },
                            ]}
                          />
                        </TouchableOpacity>

                      </LinearGradient>
                    </TouchableOpacity>)
                  }
                  {
                    teamNumnber == 2 && courtNumber == 7 && activeScroll == index && (
                      <ScrollView
                        nestedScrollEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                          maxHeight: normalize(120),
                          width: 60,
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          backgroundColor: "#FFF"
                        }} >
                        {scoreData?.map((i) => {
                          return (
                            <TouchableOpacity style={{
                              backgroundColor: "#FFF",
                              justifyContent: 'center',
                              paddingVertical: normalize(10)
                            }}

                              onPress={() => {
                                let temp = JSON.parse(JSON.stringify(dataItem));
                                console.log(temp, 'temptemp')
                                temp.court7_game.team2_score = i?.value;
                                setDataItem(temp)
                                console.log(temp, 'temptemp')
                                let data = new FormData()
                                data.append("session_id", props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id,)
                                data.append("game", totalGameIndex)
                                for (let j = 1; j <= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.noofcourt; j++) {
                                  if (j == 1) {
                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby && data.append(`game_standby`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby2 && data.append(`game_standby2`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby2)

                                    SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.game_standby3 && data.append(`game_standby3`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                        ?.player_data[currentGameIndex - 1]?.game_standby3)
                                  }


                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1 && data.append(`court${j}_game[team1_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2 && data.append(`court${j}_game[team1_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team1_player2)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1 && data.append(`court${j}_game[team2_player1]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player1)

                                  SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2 && data.append(`court${j}_game[team2_player2]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                      ?.player_data[currentGameIndex - 1]?.[`court${j}_game`]?.team2_player2)

                                  j == 7 ? data.append(`court${j}_game[team2_score]`, i?.value) : data.append(`court${j}_game[team2_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team2_score)

                                  data.append(`court${j}_game[team1_score]`, SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                                    ?.player_data[totalGameIndex - 1]?.[`court${j}_game`]?.team1_score)

                                }

                                dispatch(updateScoreReq(data))
                                setTimeout(() => {
                                  let obj = {
                                    session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                                  }
                                  // currentGameIndex >= 
                                  dispatch(getSessDetailsReq(obj))
                                }, 1000);
                                setActiveScroll(undefined)
                              }}
                            >
                              <Text style={{
                                textAlign: 'center',
                                color: '#000'
                              }}> {i?.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )
                  }
                </View>
              </View>
              <Separator dividerStyle={[css.mb5]} />
            </>
          )
        }


      </View>
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
          <KeyboardAwareScrollView
            scrollEnabled={false}
            behavior={'position'}
            style={{ flex: 1 }}>
            <ImageBackground
              style={[css.mainContainer, { paddingBottom: normalize(50) }]}
              resizeMode="stretch"
              source={Images.bg2}>
              <Header
                showBackArrow={props?.route?.params?.sessionID ? true : (totalGameIndex != 1 ? true : false)}
                {...props}
                onPress={() => setShowDropDown(!showDropDown)}
                title={
                  SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable
                    ?.gametype?.title
                }
                backPress={() => {
                  props?.route?.params?.sessionID ? totalGameIndex == 1 ? props?.navigation?.goBack() : (
                    currentGameIndex == 1 ? (
                      // setModalVisible(true),
                      // setShowContent(false),
                      setCurrentGameIndex(SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                        ?.player_data?.length),
                      setTotalGameIndex(totalGameIndex - 1)
                    ) : (setTotalGameIndex(totalGameIndex - 1), setCurrentGameIndex(currentGameIndex - 1))
                  ) : (
                    currentGameIndex == 1 ? (
                      // setModalVisible(true),
                      // setShowContent(false),
                      setCurrentGameIndex(SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                        ?.player_data?.length),
                      setTotalGameIndex(totalGameIndex - 1)
                    ) : (setTotalGameIndex(totalGameIndex - 1), setCurrentGameIndex(currentGameIndex - 1))
                  )

                }}
                isBackPress={true}
              // "RR Session - Game#1"
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
                      <Text style={[styles.menuText]}>Save Session</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                        setShowContent(false);
                        setShowDropDown(false);
                      }}
                      style={[css.center, styles.menuWrap1]}>
                      <Text style={[styles.menuText, styles.corolrTheme]}>
                        Exit Session
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              ) : null}

              <ScrollView
                nestedScrollEnabled={true}

                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: normalize(20),
                  paddingBottom: Platform.isPad
                    ? orientation == 'PORTRAIT'
                      ? normalize(80)
                      : normalize(340)
                    : normalize(100),
                }}
                style={css.mt3}>
                <TouchableOpacity style={[styles.cardWrapper]}
                  onPress={() => {
                    setActiveScroll(undefined)
                  }}
                  activeOpacity={1}
                >

                  <View style={[styles.rowContainer, styles.rowContentCenter, styles.flex1, css.mb3, styles.rowSpaceBetween]}>
                    <View style={[styles.rowContainer, styles.rowContentCenter, styles.flex1]}>
                      <Image
                        source={Icons.location}
                        style={{
                          width: normalize(12),
                          height: normalize(14),
                          resizeMode: 'stretch',
                          marginRight: normalize(5),
                          marginTop: normalize(1),
                          tintColor: 'rgba(248, 144, 231, 1)',
                        }}
                      />
                      <Text style={[styles.gameName, styles.flex1]}>
                        {
                          SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable
                            ?.locationdetails?.title
                        }
                      </Text>
                    </View>

                    <TouchableOpacity style={[styles.endBttn]}

                      onPress={() => {
                        setModalVisible(true);
                        setShowContent(false);
                        setShowDropDown(false);
                      }}
                    >
                      <Text style={styles.endBttnText}>COMPLETE SESSION</Text>
                    </TouchableOpacity>
                  </View>

                  <Separator dividerStyle={[css.mb2]} />
                  <View style={[styles.rowContainer, styles.rowContentCenter]}>
                    <Text style={[styles.gameName, styles.flex1]}>
                      {`Game #${totalGameIndex}`}
                    </Text>
                    {
                      SessionReducer?.sessionDetailsResponse?.data?.sessionAvailable?.enablescoring && (
                        <TouchableOpacity

                          style={styles.refreshButton}
                          onPress={() => {
                            let obj = {
                              session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                            }
                            // currentGameIndex >= 
                            dispatch(getSessDetailsReq(obj))

                          }}>
                          {<Animated.Image
                            source={Icons.refreshButton}
                            style={[styles.refreshButton]}

                          />}
                        </TouchableOpacity>
                      )
                    }
                  </View>
                  <Separator dividerStyle={[css.mb5]} />
                  <FlatList
                    nestedScrollEnabled={true}
                    data={dataItem ? [dataItem] : []}
                    renderItem={RenderGameList}
                    keyExtractor={item => item.id}
                  />

                  <Text style={styles.standByTxtWrapper}>

                    {
                      SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                        ?.player_data[totalGameIndex - 1]?.game_standby != null &&
                      (<Text style={styles.standByTxt}>Bye: </Text>)
                    }
                    <Text style={styles.standByName}>


                      {SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                        ?.player_data[totalGameIndex - 1]?.game_standby != null && SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                          ?.player_data[totalGameIndex - 1]?.game_standby_details?.full_name
                      }
                      {SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                        ?.player_data[totalGameIndex - 1]?.game_standby2 != null && `, ${SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                          ?.player_data[totalGameIndex - 1]?.game_standby2_details?.full_name}`
                      }
                      {SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                        ?.player_data[totalGameIndex - 1]?.game_standby3 != null && `, ${SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                          ?.player_data[totalGameIndex - 1]?.game_standby3_details?.full_name}`
                      }
                    </Text>
                  </Text>

                  {/* <CustomNoButton
                    btnText={`Refresh Scores`}
                    titleStyle={[]}
                    onPress={() => {
                      let obj = {
                        session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                      }
                      // currentGameIndex >= 
                      dispatch(getSessDetailsReq(obj))
                    }}
                    containerStyle={{
                      marginBottom: normalize(10)
                    }}
                  /> */}
                  <CustomButton
                    btnText={`Proceed to game #${totalGameIndex + 1}`}
                    titleStyle={[]}
                    onPress={() => {
                      currentGameIndex >= SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails
                        ?.player_data?.length ? (
                        // setModalVisible(true),
                        // setShowContent(false),
                        setCurrentGameIndex(1),
                        setTotalGameIndex(totalGameIndex + 1)
                      ) : (setTotalGameIndex(totalGameIndex + 1), setCurrentGameIndex(currentGameIndex + 1))
                    }}

                  />

                </TouchableOpacity>
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
                          props?.navigation.navigate('Home')

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
                        {/* Do you want to exit{'\n'}Round Robin session{'\n'}
                        without saving? */}

                        Are all the games in this{'\n'}Round Robin session{'\n'}complete?
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
                          let obj = {
                            session_id: props?.route?.params?.sessionID ? props?.route?.params?.sessionID : SessionReducer?.sessionDetailsResponse?.data?.sessionPlayerDetails?.session_id
                          }
                          dispatch(sessionEndReq(obj))

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
                          // setCurrentGameIndex(1)
                          // setTotalGameIndex(1)
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
    textAlign: 'center',
  },
  modalWrap: {
    // height: height / 1.5,
  },
  modalContainer: {
    // height: '100%',
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
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(8),
    alignSelf: 'flex-start',
    marginTop: normalize(5),
    width: 60,
  },
  playerNum: {
    fontFamily: Fonts.robotoMedium,
    color: '#FFF',
    fontSize: normalize(10),
    marginRight: normalize(5)
  },
  gameName: {
    fontFamily: Fonts.robotoRegular,
    color: '#FFF',
    fontSize: normalize(13),
    padding: 1,
    flexWrap: 'wrap'

  },
  w40Percent: {
    width: '40%',
  },
  flex1: {
    // width: '43%',
    flex: 1
  },
  toggleIconStyle: {
    width: normalize(7),
    height: normalize(7),
    // marginLeft: normalize(10),
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
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
  },

  vsWrapper: {
    paddingHorizontal: 5
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
  placeholderStyle: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(13),
    color: '#FFF',
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
    fontSize: normalize(12),
    color: '#000',
    backgroundColor: 'red',
    width: '100%'
  },

  itemContainerStyle: {
    backgroundColor: 'yellow',
    padding: 0,
    margin: 0,
    width: "100%"
  },
  dropdown: {
    backgroundColor: '#433c8a',
    paddingHorizontal: normalize(10),
    borderRadius: normalize(8),
    marginTop: normalize(5),
    width: '38%'
  },
  dropdown1: {
    marginTop: normalize(5),
    width: '100%',
  },
  standByTxtWrapper: {
    marginBottom: normalize(15),
    fontFamily: Fonts.robotoMedium
  },
  standByTxt: {
    color: Colors.themeBlue
  },
  standByName: {
    color: '#FFF'
  },

  endBttn: {
    alignItems: 'center',
    padding: normalize(5),
    borderRadius: normalize(100),
    backgroundColor: Colors.btnPink,
    paddingHorizontal: normalize(8)
  },
  endBttnText: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(11),
    color: '#000000',
    textTransform: 'uppercase',
  },

  refreshButton: {
    height: normalize(25),
    width: normalize(25),
    resizeMode: 'contain',
  },

});

export default GameList;
