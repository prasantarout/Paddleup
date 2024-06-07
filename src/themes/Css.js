import {StyleSheet, Platform, StatusBar, Dimensions} from 'react-native';
import normalize from '../utils/helpers/normalize';
import {Colors, Sizes} from './Themes';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const css = StyleSheet.create({
  mainPage: {
    height: '90%',
    width: '95%',
    borderRadius: normalize(30),
    justifyContent: 'center',
  },
  mainScreen: {
    flex: 1,
    marginTop: Platform.OS == 'android' ? StatusBar?.currentHeight : 0,
    backgroundColor: '#193160',
    width:'100%'
  },
  mainContainer: {
    height: height,
    backgroundColor:'#193160',
    paddingBottom: normalize(10),
    width:'100%'
  },
  modalBodyText: {
    color: '#fff',
    fontSize: normalize(20),
    fontFamily: 'Roboto-Medium',
    lineHeight: normalize(30),
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  bgRed: {
    backgroundColor: 'red',
  },
  text: {
    fontFamily: 'Roboto-Medium',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  br30: {
    borderRadius: normalize(30),
  },
  jcc: {
    justifyContent: 'center',
  },
  jcfe: {
    justifyContent: 'flex-end',
  },
  jcsb: {
    justifyContent: 'space-between',
  },
  jcfs: {
    justifyContent: 'flex-start',
  },
  aife: {
    alignItems: 'flex-end',
  },
  aifs: {
    alignItems: 'flex-start',
  },
  aic: {
    alignItems: 'center',
  },
  ass: {
    alignSelf: 'flex-start',
  },
  asc: {
    alignSelf: 'center',
  },
  op0: {
    opacity: 0,
  },

  br6: {
    borderRadius: 6,
  },
  br50: {
    borderRadius: 50,
  },
  br100: {
    borderRadius: 100,
  },
  textWhite: {
    color: '#fff',
    fontSize:normalize(14)
  },
  inputGap: {
    marginBottom: normalize(8),
  },
  inputStyle: {
    height: normalize(45),
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: normalize(16),
  },
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },

  underLine: {
    textDecorationLine: 'underline',
  },
  capital: {
    textTransform: 'uppercase',
  },

  f1: {
    flex: 1,
  },
  fw: {
    flexWrap: 'wrap',
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBetweenTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  fw500: {
    fontWeight: Platform.OS === 'ios' ? '500' : '600',
  },
  fw600: {
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
  },
  fw700: {
    fontWeight: Platform.OS === 'ios' ? '700' : '800',
  },
  fw800: {
    fontWeight: Platform.OS === 'ios' ? '800' : '900',
  },
  w10: {
    width: '10%',
  },
  w20: {
    width: '20%',
  },
  w25: {
    width: '25%',
  },
  w33: {
    width: '33%',
  },
  w30: {
    width: '30%',
  },
  w35: {
    width: '35%',
  },
  w40: {
    width: '40%',
  },
  w50: {
    width: '50%',
  },
  w60: {
    width: '60%',
  },
  w70: {
    width: '70%',
  },
  w80: {
    width: '80%',
  },
  w90: {
    width: '90%',
  },
  w100: {
    width: '100%',
  },
  m0: {
    margin: 0,
  },
  mx: {
    marginHorizontal: 0,
  },
  my0: {
    marginVertical: 0,
  },
  mt0: {
    marginTop: 0,
  },
  mt1: {
    marginTop: normalize(4),
  },
  mt2: {
    marginTop: normalize(8),
  },
  mt3: {
    marginTop: normalize(16),
  },
  mt4: {
    marginTop: normalize(20),
  },
  mt5: {
    marginTop: normalize(25),
  },
  mb1: {
    marginBottom: normalize(4),
  },
  mb0: {
    marginBottom: 0,
  },
  mb2: {
    marginBottom: normalize(8),
  },
  mb3: {
    marginBottom: normalize(16),
  },
  mb4: {
    marginBottom: normalize(20),
  },
  mb5: {
    marginBottom: normalize(25),
  },
  ml1: {
    marginLeft: normalize(4),
  },
  ml2: {
    marginLeft: normalize(8),
  },
  ml3: {
    marginLeft: normalize(16),
  },
  ml4: {
    marginLeft: normalize(20),
  },
  ml5: {
    marginLeft: normalize(25),
  },
  mr1: {
    marginRight: normalize(4),
  },
  mr2: {
    marginRight: normalize(8),
  },
  mr3: {
    marginRight: normalize(16),
  },
  mr4: {
    marginRight: normalize(20),
  },
  mr5: {
    marginRight: normalize(25),
  },
  my2: {
    marginVertical: normalize(8),
  },
  my3: {
    marginVertical: normalize(16),
  },
  p0: {
    padding: 0,
  },
  px0: {
    paddingHorizontal: 0,
  },
  py0: {
    paddingVertical: 0,
  },
  p2: {
    padding: normalize(8),
  },
  p3: {
    padding: normalize(16),
  },
  p4: {
    padding: normalize(24),
  },
  p5: {
    padding: normalize(32),
  },
  px2: {
    paddingHorizontal: normalize(8),
  },
  px3: {
    paddingHorizontal: normalize(16),
  },
  px4: {
    paddingHorizontal: normalize(24),
  },
  px5: {
    paddingHorizontal: normalize(32),
  },
  py2: {
    paddingVertical: normalize(8),
  },
  py3: {
    paddingVertical: normalize(16),
  },
  py4: {
    paddingVertical: normalize(24),
  },
  py5: {
    paddingVertical: normalize(32),
  },
  pl1: {
    paddingLeft: normalize(4),
  },
  pl2: {
    paddingLeft: normalize(8),
  },
  pl3: {
    paddingLeft: normalize(16),
  },
  pl4: {
    paddingLeft: normalize(20),
  },
  pl5: {
    paddingLeft: normalize(25),
  },
  pr1: {
    paddingRight: normalize(4),
  },
  pr2: {
    paddingRight: normalize(8),
  },
  pr3: {
    paddingRight: normalize(16),
  },
  pr4: {
    paddingRight: normalize(20),
  },
  pr5: {
    paddingRight: normalize(25),
  },
  pt1: {
    paddingTop: normalize(4),
  },
  pt2: {
    paddingTop: normalize(8),
  },
  pt3: {
    paddingTop: normalize(16),
  },
  pt4: {
    paddingTop: normalize(20),
  },
  pt5: {
    paddingTop: normalize(25),
  },
  pb1: {
    paddingBottom: normalize(4),
  },
  pb2: {
    paddingBottom: normalize(8),
  },
  pb3: {
    paddingBottom: normalize(16),
  },
  pb4: {
    paddingBottom: normalize(20),
  },
  pb5: {
    paddingBottom: normalize(25),
  },
  fheight: {
    marginBottom: normalize(70),
  },
  pStatusBar: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  pbStatusBar: {
    paddingBottom: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  pb70: {
    paddingBottom: normalize(72),
  },
  backArrow: {
    width: normalize(24),
    height: normalize(24),
    resizeMode: 'contain',
  },
  menuIcon: {
    width: normalize(25),
    height: normalize(25),
    resizeMode: 'contain',
  },
  marginTop10:{
    marginTop: normalize(10)
  },
  marginTop20:{
    marginTop: normalize(20)
  }
});

export default css;
