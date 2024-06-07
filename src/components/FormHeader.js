import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Fonts, Icons, Images } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import LinearGradient from 'react-native-linear-gradient';


import { GoogleSignin } from '@react-native-google-signin/google-signin';
import constants from '../utils/helpers/constants';
import { socialSigninSignupReq } from '../redux/reducer/AuthReducer';
import { useDispatch } from 'react-redux';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import CustomToast from '../utils/helpers/CustomToast';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

GoogleSignin.configure({
    webClientId: constants.WEBCLIENTID,
    offlineAccess: true,
});

const FormHeader = (props) => {
    const [userInfo, setUserInfo] = useState(null);

    const dispatch = useDispatch()
    async function signinWithGoogle() {
        const userInfo = await GoogleSignin.signIn()

        console.log(userInfo, 'userInfo')

        let obj = {
            social_id: userInfo?.user?.id,
            register_type: 'google',
            type: props?.type,
            email: userInfo?.user?.email,
            full_name: userInfo?.user?.name
        }
        dispatch(socialSigninSignupReq(obj))
    }


    async function onAppleButtonPress() {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });

        let obj = {
            social_id: appleAuthRequestResponse?.user,
            register_type: 'apple',
            type: props?.type,
            email: appleAuthRequestResponse?.email,
            full_name: appleAuthRequestResponse?.fullName?.givenName
        }
        dispatch(socialSigninSignupReq(obj))
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
        if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated
        }
    }

    async function onFabLoginPress() {
        // LoginManager.logInWithPermissions(["public_profile","email"]).then(
        //     function (result) {
        //         if (result.isCancelled) {
        //             console.log("Login cancelled 12333");
        //         } else {
        //             console.log(
        //                 "Login success with permissions: 12333 " +
        //                 JSON.stringify(result)
        //             );
        //             AccessToken.getCurrentAccessToken().then((data) => {
        //                 const { accessToken } = data
        //                 // initUser(accessToken)
        //                 console.log(data,'datadatadata')
        //               })
        //         }
        //     },
        //     function (error) {
        //         console.log("Login fail with error: 12333" + error);
        //     }
        // );
        LoginManager.logInWithPermissions(['public_profile']).then(
            (result) => {
                console.log(result,'kjkjkjkjkjk')
                if (result?.isCancelled) {
                    console.log('Facebook login was cancelled');
                } else {
                    console.log('Facebook login  sucess');
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const accessToken = data.accessToken.toString();
                        getUserInfo(accessToken);
                    });
                }
            },
            (error) => {
                console.log('Facebook login error:', error);
            }
        );
    }

    const getUserInfo = (accessToken) => {
        const request = new GraphRequest('/me?fields=id,name,email', null, (error, result) => {
            if (error) {
                console.log('Error fetching user data from Facebook:', error);
            } else {
                setUserInfo(result);
                let obj = {
                    social_id: result?.id,
                    register_type: 'facebook',
                    type: props?.type,
                    email: result?.email,
                    full_name: result?.name
                }

                console.log(obj,'objobjobjobj')
                dispatch(socialSigninSignupReq(obj))
            }
        });

        new GraphRequestManager().addRequest(request).start();


    };

    return (
        <View style={[styles.topHeader, { marginBottom: props?.marginBottom ? props?.marginBottom : 0 }]}>
            <View style={styles.headerLogoContainer}>
                <Image
                    style={styles.headerLogo}
                    source={Images.logo}
                />

            </View>
            <Text style={styles.headerTitle}>{props?.title}</Text>
            <Text style={styles.headerSubTitle}>{props?.subTitle}</Text>
            <Image
                style={styles.dashedLine}
                source={Images.dashedLine}
            />

            {
                props?.isSocialBtn && (
                    <>

                        <View style={styles.socialLoginWrapper}>
                            <LinearGradient
                                style={styles.btn}
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }}
                                colors={['#4e4394', '#4e4394', '#4b3e8d']}>
                                <TouchableOpacity
                                    onPress={signinWithGoogle}
                                >
                                    <Image
                                        style={styles.socialLoginIcon}
                                        source={Icons.google}
                                    />
                                </TouchableOpacity>
                            </LinearGradient>
                            {/* <LinearGradient
                                style={styles.btn}
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }}
                                colors={['#534391', '#574493', '#624799']}>
                                <TouchableOpacity

                                    onPress={() => {
                                        onFabLoginPress()
                                    }}
                                >
                                    <Image
                                        style={styles.socialLoginIcon}
                                        source={Icons.facebook}
                                    />
                                </TouchableOpacity>
                            </LinearGradient> */}
                            <LinearGradient
                                style={styles.btn}
                                start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }}
                                colors={['#4b4190', '#614799', '#623d95']}>
                                <TouchableOpacity
                                    onPress={() => {
                                        appleAuth.isSupported ? onAppleButtonPress() : CustomToast(`This device doesn't support Apple login.`)
                                    }}>
                                    <Image
                                        style={styles.socialLoginIcon}
                                        source={Icons.apple}
                                    />
                                </TouchableOpacity>
                            </LinearGradient>



                        </View>
                        <Image
                            style={styles.dashedLine}
                            source={Images.dashedLine}
                        />

                    </>
                )
            }

        </View>
    );
}

const styles = StyleSheet.create({
    headerLogo: {
        height: normalize(60),
        width: normalize(60),
        resizeMode: 'contain'
    },
    headerLogoContainer: {
        backgroundColor: '#5b568d',
        height: normalize(90),
        width: normalize(90),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(100) / 2
    },
    flexContainer: {
        flex: 1,
    },
    contentCenter: {
        alignItems: 'center'
    },
    topHeader: {
        alignItems: 'center',
        width: '100%'
    },
    headerTitle: {
        fontFamily: Fonts.robotoMedium,
        color: '#FFF',
        fontSize: normalize(20),
        marginTop: normalize(10),
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    headerSubTitle: {
        fontFamily: Fonts.robotoMedium,
        color: '#FFF',
        fontSize: normalize(11),
        marginTop: normalize(5),
        marginBottom: normalize(10),
        textAlign: 'center'
    },
    dashedLine: {
        height: normalize(2),
        resizeMode: 'contain',
        marginTop: normalize(14),
        marginBottom: normalize(14),
        resizeMode: 'contain',
        width: '100%'

    },
    socialLoginWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    btn: {
        backgroundColor: '#4a4090',
        alignItems: 'center',
        borderRadius: normalize(10),
        paddingVertical: normalize(10),
        width: '49%',
    },
    socialLoginIcon: {
        height: normalize(25),
        width: normalize(25),
        resizeMode: 'contain'
    }
})

export default FormHeader;
