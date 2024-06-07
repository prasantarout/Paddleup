import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { Fonts, Images } from '../themes/Themes';
import Modal from 'react-native-modal'
import Icons from '../themes/Icons';
const HomeMenu = (props) => {

    const menuItem = [
        {
            title: 'Players/Teams',
            navigation: 'PlayerTeams'
        },
        {
            title: 'Locations',
            navigation: 'LocationList'
        },
        {
            title: 'Leaderboard',
            navigation: 'Leaderboard'
        },
        {
            title: 'Session History',
            navigation: 'SessionHistory'
        },
        {
            title: 'Official Rules',
            navigation: 'OfficialRule'
        },
        {
            title: 'About',
            navigation: 'About'
        },
    ]


    const RenderMenu = ({ item, index }) => {
        return (

            <TouchableOpacity style={styles.navWrapper}
                onPress={() => {
                    props?.colseMenu()
                    props.navigation.navigate(item?.navigation)
                }}
            >
                <Text style={styles.navText}>
                    {item?.title}
                </Text>

                {
                    index + 1 !== menuItem?.length && (
                        <Image
                            style={styles.dashedLine}
                            source={Images.dashedLine}
                        />
                    )
                }

            </TouchableOpacity>
        )
    }
    return (
        <Modal
            avoidKeyboard
            backdropOpacity={0.5}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            backdropTransitionOutTiming={0}
            hideModalContentWhileAnimating={true}
            animationInTiming={900}
            animationOutTiming={1000}
            isVisible={props?.isHomeMenu}
            useNativeDriver={true}
            onBackButtonPress={() => {
                props?.colseMenu()
            }}
            onBackdropPress={() => props?.colseMenu()}
            style={styles.modalView}>
            <ImageBackground
                borderRadius={normalize(10)}
                style={styles.modalWrap}
                source={Images.modalBg}
            >

                <TouchableOpacity style={styles.crossIconWrapper}

                    onPress={() => {
                        props?.colseMenu()
                    }}
                >
                    <Image
                        source={Icons.crossIcon}
                        style={styles.crossIcon}
                    />
                </TouchableOpacity>

                <FlatList
                    data={menuItem}
                    contentContainerStyle={{
                        paddingVertical: normalize(50)
                    }}
                    renderItem={RenderMenu}
                    keyExtractor={item => item.id}
                />


            </ImageBackground>


        </Modal>
    );
}

const styles = StyleSheet.create({
    modalWrap: {
        padding: normalize(10),
        borderRadius: normalize(5),
        resizeMode: 'stretch',

    },


    navText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: normalize(14),
        fontFamily: Fonts.robotoMedium
    },
    dashedLine: {
        height: normalize(2),
        resizeMode: 'contain',
        marginTop: normalize(20),
        marginBottom: normalize(15),
        resizeMode: 'contain',
        width: '80%',
        alignSelf: 'center'
    },
    crossIcon: {
        height: normalize(15),
        width: normalize(15),
        resizeMode: 'contain'
    },
    crossIconWrapper: {
        alignItems: 'flex-end',
        paddingBottom: 0
    },


})

export default HomeMenu;
