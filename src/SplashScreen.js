import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PRIMARY, FONT_COLOR } from './utils/colors';

const SplashScreen = props => {
    return (
            <View style={style.screen}>
                <Text style={style.text}>Cargando...</Text>
            </View>
    );
};

const style = StyleSheet.create({
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