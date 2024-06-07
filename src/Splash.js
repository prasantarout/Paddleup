import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, StatusBar, ImageBackground } from 'react-native';
import { Colors, Images, Sizes } from './themes/Themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import normalize from './utils/helpers/normalize';

import { CircularProgress, GradientCircularProgress } from "react-native-circular-gradient-progress";
const Splash = (props) => {
    const [progress, setProgress] = useState(20)
    // useEffect(() => {
    //   
    // })

    useEffect(() => {
        setInterval(() => {
            setProgress(80)
        }, 1000);

        setTimeout(() => {
            setProgress(100)
            props.navigation.replace('Login')
        }, 2000)
    }, [])
    return (
        <>

            <StatusBar translucent backgroundColor={Colors.blue} {...props} barStyle={'light-content'} />


            <SafeAreaView style={[styles.contentCenter, styles.bgBlue]}>
                <ImageBackground
                    source={Images.splash}
                    style={[styles.splashBg, styles.contentCenter]}>


                    <View style={styles.progressContainer} >
                        <View style={styles.logoContainer} >
                            <Image
                                source={Images.logo}
                                style={styles.splashIcon}

                            />
                        </View>

                        <GradientCircularProgress
                            size={normalize(170)}
                            progress={progress}
                            strokeWidth={1}
                            emptyColor="#6b699a"
                            endColor={'#8d89b1'}
                            startColor={'#5babd4'}
                            middleColor={'#6FDDB0'}
                        >


                        </GradientCircularProgress>



                    </View>

                </ImageBackground>
            </SafeAreaView>

        </>
    );
}

const styles = StyleSheet.create({

    splashBg: {
        width: Sizes.width,
        height: Sizes.height,
        resizeMode: 'cover',

    },
    contentCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashIcon: {
        height: '80%',
        width: '80%',
        resizeMode: 'contain'
    },
    bgBlue: {
        backgroundColor: Colors.blue
    },
    progressContainer: {
        justifyContent: "center", alignItems: 'center'
    },
    logoContainer: {
        height: normalize(169),
        width: normalize(169),
        borderRadius: normalize(166) / 2,
        position: "absolute", backgroundColor: "#5c5990",
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Splash;
