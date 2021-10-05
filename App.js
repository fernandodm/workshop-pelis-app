/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Alert, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './src/components/HomeScreen';
import LoginScreen from './src/components/LoginScreen';
import SplashScreen from './src/components/SplashScreen';
import { PRIMARY, FONT_COLOR } from './src/utils/colors';
import { getData, removeData } from './src/store/store'

const Stack = createStackNavigator();

const App = () => {
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [estaCargando, setEstaCargando] = useState(true);

  useEffect(async () => {
        const loggedUser = await getData('loggedUser');
        setEstaLogueado(loggedUser !== null);
        setEstaCargando(false);
        BackHandler.addEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    Alert.alert("Estas por salir de Pelis App", "¿Estás seguro?", [
      {
        text: "Cancelar",
        onPress: () => null
      },
      {
        text: "Aceptar",
        onPress: () => BackHandler.exitApp()
      }
    ]);
    return true;
  };

    const logout = () => {
      Alert.alert("Estas por cerrar sesión", "¿Estás seguro?", [
        {
          text: "Cancelar",
          onPress: () => null
        },
        {
          text: "Aceptar",
          onPress: executeLogout
        }
      ]);
      return true;
    };

    const executeLogout = async () => {
        setEstaCargando(true);
        try {
            await removeData('loggedUser');
            setEstaLogueado(false);
        } catch (e) {
            console.log("Hubo un error al tratar de desloguearse");
        } finally {
            setEstaCargando(false);
        }
    };


  if(estaCargando){
    return <SplashScreen />
  }

  return (
    <View style={ styles.screen }>
        <NavigationContainer>
          <Stack.Navigator>

          {!estaLogueado && <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> }
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                title: 'Pelis App',
                headerTitleAlign:'center',
                headerStyle: {
                    backgroundColor: PRIMARY
                },
                headerTintColor: FONT_COLOR,
                headerTitleStyle: {
                    fontWeight: 'bold'
                },
                headerLeft: null,
                headerRight: () => (
                    <MaterialCommunityIcons style={{marginRight: 15}} name="logout" size={24} color="white" onPress={logout} />
                )
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default App;
