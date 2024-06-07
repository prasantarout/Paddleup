import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, SafeAreaView, StatusBar, Platform, TextInput, Touc, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import normalize from '../utils/helpers/normalize';
import Icons from '../themes/Icons';
import { Fonts } from '../themes/Themes';
import CustomToast from '../utils/helpers/CustomToast';
import RandomNumber from '../utils/helpers/RandomNumber';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactReq } from '../redux/reducer/CmsReducer';
import Loader from '../components/Loader';

let status = ''
const Compose = (props) => {
    const dispatch = useDispatch()

    const [isApiCall, setIsApiCall] = useState(false)
    const CmsReducer = useSelector(state => state.CmsReducer)
    const [message, setMessage] = useState('')
    const [ticketId, setTicketId] = useState(`${RandomNumber(8, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')}`)
    const handleSendEmail = () => {
        if (message?.trim() == '') {
            CustomToast('Message is required')
            return false
        }

        let obj = {
            message: message,
            ticketId: ticketId,
            message: message,
            email: props?.route?.params?.email,
            name: props?.route?.params?.name,
        }
        dispatch(submitContactReq(obj))
    }


    if (status === '' || CmsReducer.status !== status) {
        switch (CmsReducer.status) {
            case 'CMS/submitContactReq':
                status = CmsReducer.status;
                setIsApiCall(true)
                break;
            case 'CMS/submitContactSucces':
                status = CmsReducer.status;
                setIsApiCall(false)
                props?.navigation.goBack()
                break;
            case 'CMS/submitContactFailure':
                status = CmsReducer.status;
                setIsApiCall(false)
                break;
        }
    }

    return (

        <>
            <StatusBar
                translucent
                backgroundColor={'#FFF'}
                {...props}
                barStyle={'dark-content'}
            />


            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#FFF'
            }}>
                <TouchableOpacity

                    activeOpacity={1}

                    onPress={() => {
                        Keyboard.dismiss()
                    }}
                >
                    <View style={styles.mainHeader}>
                        <TouchableOpacity
                            onPress={() => {
                                props?.navigation.goBack()
                            }}
                        >
                            <Image
                                source={Icons.arrow}
                                style={styles.arrowLeftIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.pageTitle}>Compose</Text>

                        <TouchableOpacity
                            onPress={() => {
                                // props?.navigation.goBack()
                                isApiCall ? null : handleSendEmail()
                            }}
                        >
                            {
                                isApiCall ? (<ActivityIndicator />) : (
                                    <Image
                                        source={Icons.send}
                                        style={styles.arrowRightIcon}
                                    />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                    <View style={styles.commmonHeader}>
                        <Text style={styles.keyTitle}>From: </Text>
                        <Text numberOfLines={1} style={styles.valueTitle}>{
                            props?.route?.params?.email
                        }</Text>
                    </View>
                    <View style={[styles.commmonHeader, {
                        justifyContent: 'flex-start'
                    }]}>
                        <Text style={styles.keyTitle}>To: </Text>

                        <View style={styles.toInfo}>
                            <Image
                                source={Icons.paddleupLogo}
                                style={styles.paddleupLogo}
                            />
                            <Text numberOfLines={1} style={styles.toEmail}>support@paddletapp.com</Text>
                        </View>

                    </View>

                    <View style={styles.commmonHeader}>
                        <Text style={styles.keyTitle}>Subject: </Text>
                        <Text numberOfLines={1} style={styles.valueTitle}>CONTACT SUPPORT #{ticketId}</Text>
                    </View>


                </TouchableOpacity>
                <TextInput
                    style={{
                        flex: 1,
                        color: '#000',
                        padding: 0,
                        paddingHorizontal: normalize(15),
                        paddingTop: normalize(10)
                    }}
                    textAlignVertical='top'
                    multiline={true}
                    placeholderTextColor={'#000'}
                    onChangeText={(text) => {
                        setMessage(text)
                    }}
                    value={message}
                />
            </SafeAreaView>

        </>
    );
}

const styles = StyleSheet.create({

    mainHeader: {
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight + normalize(10) : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: normalize(15),
        borderBottomWidth: .5,
        borderBottomColor: '#CCC',
        paddingBottom: normalize(8)
    },
    arrowLeftIcon: {
        height: normalize(18),
        width: normalize(20),
        tintColor: '#878787'
    },
    pageTitle: {
        color: '#878787',
        flex: 1,
        fontSize: normalize(18),
        fontFamily: Fonts.robotoRegular,
        marginLeft: normalize(10)
    },
    arrowRightIcon: {
        height: normalize(18),
        width: normalize(20),
        // resizeMode: 'contain'÷
        tintColor: '#878787'
    },
    commmonHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: normalize(15),
        paddingVertical: normalize(10),
        borderBottomWidth: .5,
        borderBottomColor: '#CCC',
    },
    keyTitle: {
        color: '#6b6e72',
        fontSize: normalize(12),
        fontFamily: Fonts.robotoRegular,
    },
    valueTitle: {
        color: '#65686c',
        fontSize: normalize(12),
        fontFamily: Fonts.robotoRegular,
        flex: 1
    },
    toEmail: {
        color: '#65686c',
        fontSize: normalize(12),
        fontFamily: Fonts.robotoRegular,
        marginRight: normalize(10)
    },
    paddleupLogo: {
        height: normalize(25),
        width: normalize(25),
        marginRight: normalize(5)
    },
    toInfo: {
        // flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: normalize(10),
        borderWidth: .5,
        borderColor: '#CCC',
        borderRadius: normalize(50)
    }
})

export default Compose;
