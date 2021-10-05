import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONT_COLOR, PRIMARY } from '../utils/colors';

const SplashScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Cargando...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY
    },
    text: {
        color: FONT_COLOR,
        fontWeight: 'bold',
        fontSize: 40,
        marginBottom: 200
    }
  });

export default SplashScreen;