import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput } from 'react-native';
import { Colors, Fonts, Icons } from '../themes/Themes';
import normalize from '../utils/helpers/normalize';
import LinearGradient from 'react-native-linear-gradient';

const CustomInput = (props) => {
    return (

        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 0 }}

            colors={['#4b4190', '#614799', '#623d95']}
            style={[styles.linearGradient, {
                marginBottom: props?.marginBottom ? props?.marginBottom : normalize(15)
            }]}>
            <Image
                style={[styles.icon, { marginRight: '4%' }]}
                source={props?.icon}

            />
            <TextInput
                placeholder={props?.placeholderText}
                placeholderTextColor={'#FFF'}
                style={[styles.textInput]}
            

                onChangeText={(text) => {
                    props?.onChangeText(text)
                }}
                secureTextEntry={props?.secureTextEntry}
                value={props?.value}

            />

            {
                props?.isSecureShow && (
                    <TouchableOpacity
                        onPress={() => {
                            props?.onPress()
                        }}
                    >
                        <Image
                            style={styles.passwordSecurity}
                            source={props?.secureTextEntry ? Icons.eyeLock : Icons.eyeOpen}
                        />
                    </TouchableOpacity>
                )
            }

        </LinearGradient>

    );
}

const styles = StyleSheet.create({

    linearGradient: {
        paddingHorizontal: normalize(15),
        borderRadius: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: normalize(10),
    },
    textInput: {
        height: normalize(45),
        fontFamily: Fonts.robotoMedium,
        fontSize: normalize(13),
        color: '#FFFF',
        padding: 0,
        borderRadius: normalize(10),
        flex:1
    },
    icon: {
        height: normalize(19),
        width: normalize(17),
        resizeMode: 'contain',
    },
    passwordSecurity: {
        height: normalize(16),
        width: normalize(16),
        resizeMode: 'contain',
    },



})

export default CustomInput;
