import React, { useCallback, useEffect, useState } from 'react';
import { getProducts, requestPurchase, requestSubscription, useIAP, withIAPContext } from 'react-native-iap';

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
  Button,
  Alert,
} from 'react-native';
import { Fonts, Colors, Icons, Sizes, css } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import Modal from 'react-native-modal';
import CustomButton from '../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import Separator from '../components/Separator';
import HomeMenu from '../components/HomeMenu';
import Footer from '../components/Footer';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getProfileDetailsReq } from '../redux/reducer/ProfileReducer';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../utils/helpers/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getStaticsReq } from '../redux/reducer/CmsReducer';
import moment from 'moment';


const myProducts = [
  'paddletapYearlySub',
];

const Home = props => {

  // end in-app-purchase


  const [productList, setProductList] = useState(null)

  useEffect(() => {
    getProductsAndPurchases();
  }, []);
  const getProductsAndPurchases = async () => {
    try {
      const productDetails = await getProducts({ skus: myProducts });
      console.log(productDetails, 'Products')
      let _skuForUser = productDetails.find(item => {
        return item.productId === 'paddletapYearlySub';
      });
      setProductList(_skuForUser);
    } catch (error) {
      console.log("Products error: ", error)
    }
  };

  // requestSub

  async function requestSubscriptionFromUser(sku) {
    console.log('asdasasas: ' + sku);

    try {
      await requestSubscription(sku).then(async (result) => {
        console.log(result,'resultresultresultresult')
      })
    } catch (err) {
      console.log(err);
      console.log(err, err.message);
    }
  }


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
  const ProfileReducer = useSelector(state => state.ProfileReducer)
  const CmsReducer = useSelector(state => state.CmsReducer)
  useEffect(() => {


    const unsubscribe = props.navigation.addListener('focus', () => {
      dispatch(getProfileDetailsReq())
      dispatch(getStaticsReq())
    });
  }, [props.navigation, isFocus])

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getStaticsReq())
    }, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isFocus])



  useEffect(() => {
    const unsubscribe = props?.navigation.addListener('focus', () => {
    });

    return unsubscribe;
  }, []);


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
            // props?.navigation?.navigate('SessionDetails', { type: 'upcomming' });

            props?.navigation?.navigate('BottomTab', {
              screen: 'MoreStackScreen',
              params: {
                screen: 'SessionDetails',
                params: {
                  type: item?.type == 'active' ? 'Active' : item?.type == 'bupcoming' ? 'upcoming' : 'Completed',
                  index: item?.type == 'active' ? 0 : item?.type == 'bupcoming' ? 1 : 2,
                  sessionDetails: item,
                  page: 'home'
                },
              },
            });
          }}>
          <View>
            <Image source={item?.type == 'active' ? Icons.batPurple : item?.type == 'bupcoming' ? Icons.batIcon : Icons.batGray} style={styles.batIcon} />
          </View>

          <View style={[styles.flex1, styles.ph10]}>
            <Text numberOfLines={1} style={styles.gameTitle}>{item?.gametype?.title}</Text>
            <View style={[styles.rowContainer, styles.contentCenter]}>
              <Image source={Icons.calander} style={styles.calander} />
              <Text style={styles.gameDate}>
                {' '} {moment(item?.date).format('MMMM D, YYYY')} | {item?.time} {item?.time_format}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: normalize(42)
            }}
            onPress={() => {
              // props?.navigation?.navigate('SessionDetails', {
              //   type: 'upcomming',
              // });
              props?.navigation?.navigate('BottomTab', {
                screen: 'MoreStackScreen',
                params: {
                  screen: 'SessionDetails',
                  params: {
                    type: item?.type == 'active' ? 'Active' : item?.type == 'bupcoming' ? 'upcoming' : 'Completed',
                    index: item?.type == 'active' ? 0 : item?.type == 'bupcoming' ? 1 : 2,
                    sessionDetails: item,
                    page: 'home'
                  },
                },
              });
            }}>
            <Image source={Icons.linkIcon} style={styles.linkIcon} />
            <Text style={styles.typeText}>{item?.type == 'active' ? 'Active' : item?.type == 'bupcoming' ? 'Upcoming' : 'Completed'}</Text>
          </TouchableOpacity>

        </TouchableOpacity>
      </LinearGradient>
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
        <View style={css.mainScreen}>
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
                  <Text style={styles.screenTitle}>PaddleTapp</Text>
                  <TouchableOpacity
                    style={styles.profileWrapper}
                    onPress={() => {
                      props.navigation.navigate('Profile');
                    }}>
                    <Image source={
                      ProfileReducer?.getProfileDetailsRes?.data?.profile_pic ? { uri: `${constants.Media_Url}/uploads/user/profile_pic/${ProfileReducer?.getProfileDetailsRes?.data?.profile_pic}` }
                        : Images.noUser

                    } style={styles.profile} />
                  </TouchableOpacity>
                </View>
              </LinearGradient>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[css.ph10, {
                  flexGrow: 1,
                  paddingHorizontal: normalize(20)
                }]}
              >
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

                <View
                  style={[
                    styles.pv15,
                    styles.rowContainer,
                    styles.w100Percent,
                    ,
                    styles.contentSpaceBetween,
                    styles.contentCenter,
                  ]}>
                  <Text style={styles.headerText}>
                    {/* Active/Upcoming Sessions */}
                    Sessions
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      props?.navigation?.navigate('BottomTab', {
                        screen: 'MoreStackScreen',
                        params: {
                          screen: 'SessionHistory',
                          params: {
                            type: 'upcomming'
                          },
                        },
                      });
                    }}
                  >
                    <Text style={styles.actionText}>View Alls</Text>
                  </TouchableOpacity>
                </View>

                <Button
                  title='Buy'
                  onPress={() => {
                    requestSubscriptionFromUser(myProducts)
                  }}
                />

                <FlatList
                  data={CmsReducer?.getStaticsRes?.data?.all_session_list.docs}
                  renderItem={RenderPicleball}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{
                    flex: 1,
                    paddingBottom: Platform.isPad ? (orientation == 'PORTRAIT' ? normalize(60) : normalize(360)) : normalize(120)
                  }}
                  ListEmptyComponent={() => {
                    return (
                      <View style={styles.ListEmptyComponentStyle}>
                        {/* <Text style={styles.ListEmptyTextStyle}>No Active/Upcoming Sessions Found</Text> */}

                        <Image
                          source={Icons.paddleUp}
                          style={{
                            alignSelf: 'center',
                            height: normalize(170),
                            width: normalize(170),
                            resizeMode: 'contain',
                            opacity: 0.5
                          }}

                        />
                      </View>
                    )
                  }}
                />
                {/* <View style={styles.bottomBorder} /> */}
                {/* <Separator/> */}
                {/* <View style={[styles.w100Percent, styles.btnContainer]}>
                  <CustomButton
                    btnText="Create Session"
                    btnBg={Colors.btnBlue}
                    onPress={() => {
                      props?.navigation.navigate('SessionStartStackScreen');
                    }}
                  />
                </View> */}
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
    flex: 1,
    backgroundColor: Colors.blue,
  },

  flexContainer: {
    flex: 1,
  },
  borderRadius30: {
    borderRadius: normalize(30),
  },
  profileWrapper: {
    height: normalize(40),
    width: normalize(40),
    justifyContent: 'center'
  },

  profile: {
    height: normalize(38),
    width: normalize(38),
    borderRadius: normalize(38) / 2,
    resizeMode: 'cover',
    borderWidth: normalize(2),
    borderColor: '#303a6a',
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
  screenHeader: {
    width: '100%',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(3),
  },
  menuIcon: {
    height: normalize(28),
    width: normalize(28),
    resizeMode: 'contain',
  },
  screenTitle: {
    fontFamily: Fonts.RighteousRegular,
    fontSize: normalize(14),
    color: '#FFFF',
  },
  bottomBorder: {
    width: '100%',
    height: normalize(1),
    backgroundColor: '#fff',
    opacity: 0.2,
    marginTop: normalize(5),
  },
  actionText: {
    color: Colors.actionText,
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,
    textDecorationLine: 'underline',
  },
  headerText: {
    color: '#FFF',
    fontSize: normalize(12),
    fontFamily: Fonts.robotoMedium,
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
    height: normalize(21),
    width: normalize(21),
    resizeMode: 'contain',
  },
  gameDate: {
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(10),
  },
  typeText: {
    color: '#FFF',
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(8),
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
  ListEmptyComponentStyle: {
    paddingVertical: normalize(10),
    flex: 1,
    justifyContent: 'center'
  },
  ListEmptyTextStyle: {
    color: '#FFF',
    fontSize: normalize(11),
    fontFamily: Fonts.robotoMedium,

  },
});

export default withIAPContext(Home);
