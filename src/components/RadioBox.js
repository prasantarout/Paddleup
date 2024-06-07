import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../themes/Themes';

const RadioBox = (props) => {
    return (
        <View style={[styles.checkBoxContainer, {
            marginBottom: props?.marginBottom,
            marginTop: props?.marginTop,
            marginRight: props?.marginRight,
        }]}>
            <TouchableOpacity style={styles.checkBoxWrapper}
                onPress={() => {
                    props?.onPress()
                }}
            >
                {
                    props?.isCheck && (
                        <View style={styles.checkBox}></View>

                    )
                }
            </TouchableOpacity>
            <Text style={styles.checkBoxLabel}>{props?.label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    checkBoxWrapper: {
        height: normalize(20),
        width: normalize(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: normalize(2),
        borderColor: Colors.blue,
        borderRadius: normalize(50)
    },
    checkBox: {
        height: normalize(10),
        width: normalize(10),
        backgroundColor: Colors.blue,
        borderRadius: normalize(50)

    },

    checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkBoxLabel: {
        marginLeft: normalize(4),
        color: '#000',
        fontFamily: Fonts.Ubuntu_Medium,
        fontSize: normalize(11),
    },
})

export default RadioBox;
