import {Dimensions} from 'react-native';
import allimages from './Images';
import allicons from './Icons';
import Icons_Manish from './Icons_Manish';
import Css from './Css';
const {width, height, fontScale} = Dimensions.get('screen');

export const Colors = {
  blue: '#1b1854',
  themeBlue: '#0BD3D3',
  actionText: '#F890E7',
  btnBlue: '#3E87FA',
  btnPink: '#FA8792',
  borderColor: '#3b3a79',
  deleteText: '#FA8792',
  white:'#fff',
  grey:'#E5E8E8'
};

export const Sizes = {
  width,
  height,
  fontScale,
};

export const Fonts = {
  robotoMedium: 'Roboto-Medium',
  robotoMediumItalic: 'Roboto-MediumItalic',
  robotoRegular: 'Roboto-Regular',
  robotoLight: 'Roboto-Light',
  robotoThin: 'Roboto-Thin',
  robotoLightItalic: 'Roboto-LightItalic',
  RighteousRegular: 'Righteous-Regular',
};

export const Images = allimages;
export const Icons = allicons;
export const M_Icons = Icons_Manish;
export const css = Css;
