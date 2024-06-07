// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Splash from '../Splash';
import Login from '../screens/Login';

import { useSelector } from 'react-redux';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import VerifyOtp from '../screens/VerifyOtp';
import CreatePassword from '../screens/CreatePassword';
import About from '../screens/About';
import BottomTab from './BottomTab';
import GameList from '../screens/GameList';
import Faq from '../screens/Faq';
import cmsScreen from '../screens/cmsScreen';
import Compose from '../screens/Compose';


const StackNav = props => {
  const Stack = createStackNavigator();
  const auth = {
    Splash: Splash,
    Login: Login,
    Signup: Signup,
    ForgotPassword: ForgotPassword,
    VerifyOtp: VerifyOtp,
    CreatePassword: CreatePassword

  };
  const Screens = {
    BottomTab: BottomTab,
    About: About,
    GameList: GameList,
    CreatePassword: CreatePassword,
    Faq: Faq,
    cmsScreen: cmsScreen,
    Compose: Compose,
  };
  const AuthReducer = useSelector((state) => state.AuthReducer);
  return (
    <NavigationContainer

    >
      {(!AuthReducer.token || AuthReducer.token == "") ? (
        <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
          {Object.entries({
            ...auth,
          }).map(([name, component]) => {
            return <Stack.Screen key={name} name={name} component={component} />;
          })}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
          {Object.entries({
            ...Screens,
          }).map(([name, component]) => {
            return <Stack.Screen key={name} name={name} component={component} />;
          })}
        </Stack.Navigator>
      )}

      {/* <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS, 
      }} 
      initialRouteName='Splash'>
        {Object.entries({
          ...Screens,
        }).map(([name, component]) => {
          return <Stack.Screen key={name} name={name} component={component} />;
        })}
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};
export default StackNav;
