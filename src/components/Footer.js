import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Platform} from 'react-native';
import {Fonts, Icons} from '../themes/Themes';
import normalize from '../utils/helpers/normalize';

const Footer = props => {
  return (
    <View style={[styles.footerWrapper]}>
      <TouchableOpacity
        style={[styles.tabWrapper]}
        onPress={() => {
          props?.navigation.navigate('Home');
        }}>
        <Image
          style={[
            styles.tabIcon,
            {
              tintColor: props?.isActiveTab == 1 ? '#F890E7' : '#6C86D8',
            },
          ]}
          source={Icons.home}
        />
        <Text
          style={[
            styles.tabText,
            {
              color: props?.isActiveTab == 1 ? '#F890E7' : '#6C86D8',
            },
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabWrapper]}
        onPress={() => {
          props?.navigation.navigate('PlayerTeams');
        }}>
        <Image
          style={[
            styles.tabIcon,
            {
              tintColor: props?.isActiveTab == 2 ? '#F890E7' : '#6C86D8',
            },
          ]}
          source={Icons.player}
        />
        <Text
          style={[
            styles.tabText,
            {
              color: props?.isActiveTab == 2 ? '#F890E7' : '#6C86D8',
            },
          ]}>
          Players
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabWrapper]}
        onPress={() => {
          props?.navigation.navigate('CreateSessionLocation');
        }}>
        <Image
          style={[
            styles.tabIcon,
            {
              tintColor: props?.isActiveTab == 5 ? '#F890E7' : null,
            },
          ]}
          source={Icons.createSession}
        />
        <Text
          style={[
            styles.tabText,
            {
              color: props?.isActiveTab == 5 ? '#F890E7' : '#fff',
            },
          ]}>
          Sessions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabWrapper]}
        onPress={() => {
          props?.navigation.navigate('LocationList');
        }}>
        <Image
          style={[
            styles.tabIcon,
            {
              tintColor: props?.isActiveTab == 3 ? '#F890E7' : '#6C86D8',
            },
          ]}
          source={Icons.location}
        />
        <Text
          style={[
            styles.tabText,
            {
              color: props?.isActiveTab == 3 ? '#F890E7' : '#6C86D8',
            },
          ]}>
          Locations
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabWrapper]}
        onPress={() => {
          props?.navigation.navigate('More');
        }}>
        <Image
          style={[
            styles.tabIcon,
            {
              tintColor: props?.isActiveTab == 4 ? '#F890E7' : '#6C86D8',
            },
          ]}
          source={Icons.more}
        />
        <Text
          style={[
            styles.tabText,
            {
              color: props?.isActiveTab == 4 ? '#F890E7' : '#6C86D8',
            },
          ]}>
          More
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#193160',
    paddingVertical: normalize(12),
    position: 'absolute',
    bottom: 0,
    paddingBottom: Platform.OS == 'ios' ? normalize(16) : normalize(12),
  },
  tabWrapper: {
    alignItems: 'center',
  },
  tabIcon: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: 'contain',
  },
  tabText: {
    fontFamily: Fonts.robotoMedium,
    fontSize: normalize(10),
    marginTop: normalize(4),
  },
});

export default Footer;
