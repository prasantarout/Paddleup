import React from 'react';
import Home from '../screens/Home';
import PlayerTeams from '../screens/PlayerTeams';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import {
  View,
  StyleSheet,
  Platform,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import normalize from '../utils/helpers/normalize';
import {Colors, Fonts, Icons} from '../themes/Themes';
import CreateSessionLocation from '../screens/CreateSessionLocation';
import LocationList from '../screens/LocationList';
import More from '../screens/More';
import AddNewPlayer from '../screens/AddNewPlayer';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlayerDetails from '../screens/PlayerDetails';
import CreateSessionGameMode from '../screens/CreateSessionGameMode';
import PlayerTeamNames from '../screens/PlayerTeamNames';
import EmailScreen from '../screens/EmailScreen';
import SelectMail from '../screens/SelectMail';
import SessionResult from '../screens/SessionResult';
import GameList from '../screens/GameList';
import CourtNumberName from '../screens/CourtNumberName';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import DeleteLocation from '../screens/DeleteLocation';
import AddLocation from '../screens/AddLocation';
import SessionDetails from '../screens/SessionDetails';
import SessionHistory from '../screens/SessionHistory';
import Leaderboard from '../screens/Leaderboard';
import OfficialRule from '../screens/OfficialRule';
import MapViews from '../screens/MapViews';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLeaderBoardReq } from '../redux/reducer/CmsReducer';
import { useDispatch } from 'react-redux';
import Setting from '../screens/Setting';

const PlayerStack =
  Platform?.OS == 'android'
    ? createNativeStackNavigator()
    : createStackNavigator();
const SessionStartStack =
  Platform?.OS == 'android'
    ? createNativeStackNavigator()
    : createStackNavigator();
const HomeStack =
  Platform?.OS == 'android'
    ? createNativeStackNavigator()
    : createStackNavigator();
const LocationStack =
  Platform?.OS == 'android'
    ? createNativeStackNavigator()
    : createStackNavigator();
const MoreStack =
  Platform?.OS == 'android'
    ? createNativeStackNavigator()
    : createStackNavigator();

function PlayerStackScreen() {
  return (
    <PlayerStack.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <PlayerStack.Screen
        name="PlayerTeams"
        component={PlayerTeams}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <PlayerStack.Screen
        name="AddNewPlayer"
        component={AddNewPlayer}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <PlayerStack.Screen
        name="PlayerDetails"
        component={PlayerDetails}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </PlayerStack.Navigator>
  );
}
function SessionStartStackScreen() {
  return (
    <SessionStartStack.Navigator
      backBehavior="history"
      initialRouteName="CreateSessionLocation"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <SessionStartStack.Screen
        name="CreateSessionLocation"
        component={CreateSessionLocation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <SessionStartStack.Screen
        name="CreateSessionGameMode"
        component={CreateSessionGameMode}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <SessionStartStack.Screen
        name="PlayerTeamNames"
        component={PlayerTeamNames}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <SessionStartStack.Screen
        name="CourtNumberName"
        component={CourtNumberName}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      {/* <SessionStartStack.Screen
                name="GameList"
                component={GameList}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            /> */}
      <SessionStartStack.Screen
        name="SessionResult"
        component={SessionResult}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <SessionStartStack.Screen
        name="SelectMail"
        component={SelectMail}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <SessionStartStack.Screen
        name="EmailScreen"
        component={EmailScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </SessionStartStack.Navigator>
  );
}
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <HomeStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <HomeStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />

      <HomeStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </HomeStack.Navigator>
  );
}
function LocationStackScreen() {
  return (
    <LocationStack.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {backgroundColor: 'yellow'},
      }}>
      <LocationStack.Screen
        name="LocationList"
        component={LocationList}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <LocationStack.Screen
        name="MapViews"
        component={MapViews}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <LocationStack.Screen
        name="AddLocation"
        component={AddLocation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <LocationStack.Screen
        name="DeleteLocation"
        component={DeleteLocation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </LocationStack.Navigator>
  );
}
function MoreStackScreen() {
  return (
    <MoreStack.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <MoreStack.Screen
        name="More"
        component={More}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <MoreStack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <MoreStack.Screen
        name="SessionHistory"
        component={SessionHistory}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <MoreStack.Screen
        name="SessionDetails"
        component={SessionDetails}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />

      <MoreStack.Screen
        name="OfficialRule"
        component={OfficialRule}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <MoreStack.Screen
        name="SessionResult"
        component={SessionResult}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <MoreStack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </MoreStack.Navigator>
  );
}

const BottomTab = props => {

  const dispatch = useDispatch()
  return (
    <Tab.Navigator
      initialRouteName="HomeStackScreen"
      backBehavior="history"
      screenOptions={{
        showIcon: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        // unmountOnBlur: true,
      }}>
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        listeners={({navigation}) => ({
          blur: () => navigation.setParams({screen: undefined}),
        })}
        options={{
          // unmountOnBlur: true,
          tabBarButton: item => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    item?.accessibilityState?.selected
                      ? props?.navigation?.navigate('BottomTab', {
                          screen: 'HomeStackScreen',
                          params: {
                            screen: 'Home',
                          },
                        })
                      : props?.navigation.navigate('HomeStackScreen');
                  }}
                  style={styles.tabWrapper}>
                  <Image
                    source={Icons.home}
                    style={[
                      {
                        tintColor: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : '#6C86D8',
                      },
                      styles.tabBarButton,
                    ]}
                  />

                  <Text
                    style={[
                      {
                        color: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : '#6C86D8',
                      },
                      styles.tabText,
                    ]}>
                    Home
                  </Text>
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="PlayerStackScreen"
        component={PlayerStackScreen}
        options={{
          // unmountOnBlur: true,
          tabBarButton: item => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    item?.accessibilityState?.selected
                      ? props?.navigation?.navigate('BottomTab', {
                          screen: 'PlayerStackScreen',
                          params: {
                            screen: 'PlayerTeams',
                          },
                        })
                      : props?.navigation.navigate('PlayerStackScreen');
                  }}
                  style={styles.tabWrapper}>
                  <Image
                    source={Icons.player}
                    style={[
                      {
                        tintColor: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : '#6C86D8',
                      },
                      styles.tabBarButton,
                    ]}
                  />

                  <Text
                    style={[
                      {
                        color: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : '#6C86D8',
                      },
                      styles.tabText,
                    ]}>
                    Players
                  </Text>
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="SessionStartStackScreen"
        component={SessionStartStackScreen}
        options={{
          // unmountOnBlur: true,
          tabBarButton: item => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (item?.accessibilityState?.selected) {
                      props?.navigation?.navigate('BottomTab', {
                        screen: 'SessionStartStackScreen',
                        params: {
                          screen: 'CreateSessionLocation',
                        },
                      });
                    } else {
                      props?.navigation.navigate('SessionStartStackScreen');
                    }
                    AsyncStorage.removeItem('selectedPlayers');
                  }}
                  style={styles.tabWrapper}>
                  <Image
                    source={Icons.createSession}
                    style={[
                      {
                        tintColor: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : null,
                      },
                      styles.tabBarButton,
                    ]}
                  />
                  <Text
                    style={[
                      {
                        color: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : '#6C86D8',
                      },
                      styles.tabText,
                    ]}>
                    Sessions
                  </Text>
                </TouchableOpacity>
              </>
            );
          },
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="LocationStackScreen"
        component={LocationStackScreen}
        options={{
          // unmountOnBlur: true,
          tabBarButton: item => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    item?.accessibilityState?.selected
                      ? props?.navigation?.navigate('BottomTab', {
                          screen: 'LocationStackScreen',
                          params: {
                            screen: 'LocationList',
                          },
                        })
                      : props?.navigation.navigate('LocationStackScreen');
                  }}
                  style={styles.tabWrapper}>
                  <Image
                    source={Icons.location}
                    style={[
                      {
                        tintColor: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : null,
                      },
                      styles.tabBarButton,
                    ]}
                  />

                  <Text
                    style={[
                      {
                        color: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : '#6C86D8',
                      },
                      styles.tabText,
                    ]}>
                    Locations
                  </Text>
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="MoreStackScreen"
        component={MoreStackScreen}
        options={{
          // unmountOnBlur: true,
          tabBarButton: item => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    dispatch(getLeaderBoardReq({}))
                    item?.accessibilityState?.selected
                      ? props?.navigation?.navigate('BottomTab', {
                          screen: 'MoreStackScreen',
                          params: {
                            screen: 'More',
                          },
                        })
                      : props?.navigation.navigate('MoreStackScreen');
                  }}
                  style={styles.tabWrapper}>
                  <Image
                    source={Icons.more}
                    style={[
                      {
                        tintColor: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : null,
                      },
                      styles.tabBarButton,
                    ]}
                  />

                  <Text
                    style={[
                      {
                        color: item?.accessibilityState?.selected
                          ? '#F890E7'
                          : '#6C86D8',
                      },
                      styles.tabText,
                    ]}>
                    More
                  </Text>
                </TouchableOpacity>
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabText: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(10),
    marginTop: normalize(4),
  },
  tabBarButton: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: 'contain',
  },
  tabBarStyle: {
    backgroundColor: '#193160',
    height:
      Platform.OS == 'android'
        ? normalize(55)
        : Platform?.isPad
        ? normalize(60)
        : normalize(85),
    borderTopWidth: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabWrapper: {
    alignItems: 'center',
    width: '20%',
  },
});

export default BottomTab;
