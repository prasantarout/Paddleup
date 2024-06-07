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
import { Fonts, Colors, Icons, Sizes, css } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import Modal from 'react-native-modal';
import CustomButton from '../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import Separator from '../components/Separator';
import Footer from '../components/Footer';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetailsReq } from '../redux/reducer/ProfileReducer';
import constants from '../utils/helpers/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getStaticsReq } from '../redux/reducer/CmsReducer';
import { getSessionListReq } from '../redux/reducer/SessionReducer';
import moment from 'moment';

const Profile = props => {
  const dispatch = useDispatch()
  const isFocus = useIsFocused()
  const [orientation, setOrientation] = useState("PORTRAIT");
  useFocusEffect(
    useCallback(() => {
      if (Dimensions.get('window').width < Dimensions.get('window')?.height) {
        setOrientation("PORTRAIT")
      } else {
        setOrientation("LANDSCAPE")

      }
      Dimensions.addEventListener('change', ({ window: { width, height } }) => {
        if (width < height) {
          setOrientation("PORTRAIT")
        } else {
          setOrientation("LANDSCAPE")

        }
      });
    })
  )

  const DATA = [
    {
      id: '1',
      title: 'Modu rr',
      date: 'January 5, 2023 | 8:00 pm',
    },
    {
      id: '2',
      title: 'Modu LDR',
      date: 'December 15, 2022 | 9:00 pm',
    },
    {
      id: '3',
      title: 'Modu rr',
      date: 'December 10, 2022 | 9:00 pm',
    },
    {
      id: '4',
      title: 'Modu rr',
      date: 'November 28, 2022 | 7:00 pm',
    },
  ];


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
                  type: 'Session History',
                  index: 2,
                  sessionDetails: item,
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
              {' '} {moment(item?.date).format('MMMM Do YYYY')} |{' '}
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

  const ProfileReducer = useSelector(state => state.ProfileReducer)
  const CmsReducer = useSelector(state => state.CmsReducer)
  const CreateSession = useSelector(state => state.SessionReducer);
  useEffect(() => {
    dispatch(getProfileDetailsReq())
    dispatch(getStaticsReq())
    dispatch(getSessionListReq({ list_type: 'history' }));
  }, [isFocus])
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
              {/* <ScrollView
                style={[
                  styles.flexContainer,
                  styles.borderRadius30,
                  styles.ph10,
                ]}
                showsVerticalScrollIndicator={false}> */}
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
                  <Text style={styles.screenTitle}>Profile </Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      props?.navigation.navigate('EditProfile');
                    }}>
                    <Image style={styles.menuIcon} source={Icons.editIcon} />
                  </TouchableOpacity>
                </View>
                {/* <View style={styles.bottomBorder} /> */}
              </LinearGradient>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(0) : normalize(260)) : normalize(30),
                  paddingHorizontal: normalize(20)
                }}>
                <View
                  style={[
                    styles.userInfo,
                    styles.rowContainer,
                    styles.contentCenter,
                  ]}>
                  <Image source={
                    ProfileReducer?.getProfileDetailsRes?.data?.profile_pic ? { uri: `${constants.Media_Url}/uploads/user/profile_pic/${ProfileReducer?.getProfileDetailsRes?.data?.profile_pic}` }
                      : Images.noUser

                  } style={styles.userProfile} />
                  <View style={styles.userMetaInfo}>
                    <Text style={styles.profileName}>{ProfileReducer?.getProfileDetailsRes?.data?.full_name}</Text>
                    <Text style={styles.userName}>{ProfileReducer?.getProfileDetailsRes?.data?.paddletap_id}</Text>
                    <Text style={styles.userName}>{ProfileReducer?.getProfileDetailsRes?.data?.self_rating}</Text>
                    <Text style={styles.userName}>{ProfileReducer?.getProfileDetailsRes?.data?.city}</Text>
                    <Text style={styles.userName}>{ProfileReducer?.getProfileDetailsRes?.data?.email}</Text>
                  </View>
                </View>
                <View style={styles.bottomBorder} />

                <View style={styles.statsContainer}>
                  <View
                    style={[
                      styles.rowContainer,
                      styles.rowSpaceBetween,
                      {
                        marginBottom: normalize(5),
                      },
                    ]}>
                    <View style={[styles.statsBox, styles.contentCenter]}>
                      <Text style={styles.statsNum}>
                        {CmsReducer?.getStaticsRes?.data?.user_game_statistics?.total_game_played}
                      </Text>
                      <Text style={styles.statsTitle}>Games Played</Text>
                    </View>
                    <View style={[styles.statsBox, styles.contentCenter]}>
                      <Text style={styles.statsNum}>{parseFloat(CmsReducer?.getStaticsRes?.data?.user_game_statistics?.win_percentage).toFixed(3)}</Text>
                      <Text style={styles.statsTitle}>W/L %</Text>
                    </View>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[styles.statsBox, styles.contentCenter]}>
                      <Text style={styles.statsNum}>{CmsReducer?.getStaticsRes?.data?.user_game_statistics?.diff}</Text>
                      <Text style={styles.statsTitle}>+/-</Text>
                    </LinearGradient>
                  </View>
                  <View style={[styles.rowContainer, styles.rowSpaceBetween]}>
                    <View
                      style={[
                        styles.statsBox,
                        styles.w49Percentage,
                        styles.contentCenter,
                      ]}>
                      <Text style={styles.statsNum}>{CmsReducer?.getStaticsRes?.data?.user_game_statistics?.total_win}</Text>
                      <Text style={styles.statsTitle}>Wins Total</Text>
                    </View>
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      colors={['#4b4190', '#614799', '#623d95']}
                      style={[
                        styles.statsBox,
                        styles.w49Percentage,
                        styles.contentCenter,
                      ]}>
                      <Text style={styles.statsNum}>{CmsReducer?.getStaticsRes?.data?.user_game_statistics?.total_loss}</Text>
                      <Text style={styles.statsTitle}>Losses Total</Text>
                    </LinearGradient>
                  </View>
                </View>
                <View style={styles.bottomBorder} />
                {/* <View
                  style={[
                    styles.pv15,
                    styles.rowContainer,
                    styles.w100Percent,
                    ,
                    styles.contentSpaceBetween,
                    styles.contentCenter,
                  ]}>
                  <Text style={styles.headerText}>
                    pickleball Session History
                  </Text>
                </View> */}

                {/* <FlatList
                    data={
                      CreateSession?.getSessionListRes?.data
                        ? CreateSession?.getSessionListRes?.data
                        : []
                    }
                    renderItem={RenderPicleball}
                    ListEmptyComponent={RenderNoDataFound}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                      paddingBottom: normalize(50),
                    }}
                  /> */}
              </ScrollView>
            </ImageBackground>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
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
    opacity: 0.5,
  },
  actionText: {
    color: Colors.actionText,
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
    textDecorationLine: 'underline',
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
    padding: normalize(10),
    borderRadius: normalize(5),
    resizeMode: 'stretch',
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
  },

  paddleupLogo: {
    height: normalize(35),
    width: normalize(35),
    resizeMode: 'contain',
  },
  userProfile: {
    width: normalize(55),
    height: normalize(55),
    resizeMode: 'cover',
    borderWidth: normalize(2),
    borderColor: '#5f5b99',
    borderRadius: normalize(55) / 2,
  },
  userInfo: {
    alignSelf: 'flex-start',
    paddingVertical: normalize(5),
    marginTop: normalize(5)
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
  userMetaInfo: {
    marginLeft: normalize(8),
  },

  statsBox: {
    backgroundColor: '#4b4090',
    width: '32%',
    borderRadius: normalize(5),
    paddingVertical: normalize(8),
  },
  rowSpaceBetween: {
    justifyContent: 'space-between',
  },
  statsNum: {
    fontFamily: Fonts.robotoRegular,
    color: '#FFF',
    fontSize: normalize(26),
  },
  statsTitle: {
    fontFamily: Fonts.robotoRegular,
    color: '#D4D4D4',
    fontSize: normalize(10),
  },
  w49Percentage: {
    width: '49%',
  },
  statsContainer: {
    marginTop: normalize(12),
    marginBottom: normalize(12),
  },
});

export default Profile;
