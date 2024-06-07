import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar, Image, Platform, TouchableOpacity, ImageBackground, Dimensions, TextInput, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native';
import { Fonts, Colors, Icons, Sizes } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import { Images } from '../themes/Themes';
import CustomInput from '../components/CustomInput';
import CustomToast from '../utils/helpers/CustomToast';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../redux/reducer/AuthReducer';
import FormHeader from '../components/FormHeader';
import Modal from 'react-native-modal'
import CustomButton from '../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Empty = (props) => {



    return (
        <>
            <StatusBar translucent backgroundColor={Colors.blue} {...props} barStyle={'light-content'} />
            <SafeAreaView style={styles.SafeAreaView}>
                <View style={css.mainPage}>
                    <KeyboardAwareScrollView scrollEnabled={false} behavior={Platform.OS == 'ios' ? 'position' : null}>
                        <ImageBackground style={styles.mainContainer}
                            resizeMode='stretch'
                            source={Images.mainContainer}>
                            <ScrollView style={[styles.flexContainer, styles.borderRadius30, styles.ph10]}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.contentCenter}>
                            </ScrollView>
                        </ImageBackground>
                    </KeyboardAwareScrollView>
                </View>


            </SafeAreaView>

        </>

    );
}

const styles = StyleSheet.create({
    SafeAreaView: {
        backgroundColor: Colors.blue,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        maxHeight: Sizes.height - normalize(100),
        width: '100%',
        borderRadius: normalize(30),
        paddingVertical: normalize(10)

    },
    mainPage: {
        height: Sizes.height - normalize(100),
        width: Sizes.width - normalize(40),
        borderRadius: normalize(30),
        justifyContent: 'center'

    },
    flexContainer: {
        // flex: 1,
        width: '100%',
    },

    borderRadius30: {
        borderRadius: normalize(30)
    },




})

export default Empty;
