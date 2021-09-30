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
import HomeScreen from './src/HomeScreen';
import LoginScreen from './src/LoginScreen';
import SplashScreen from './src/SplashScreen';
import { PRIMARY, FONT_COLOR } from './src/utils/colors';
import { USERTOKEN } from './src/utils/constants';
import { getData, removeData } from './src/store/store'

const Stack = createStackNavigator();

const App = () => {
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [estaCargando, setEstaCargando] = useState(true);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    getTokenAsync();
  }, [estaCargando]);

  const backAction = () => {
    Alert.alert("Estas por salir de Pelis App", "¿Estas seguro?", [
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

  const getTokenAsync = async () => {
      let userToken;

      try {
        userToken = await getData(USERTOKEN);
      } catch (e) {
        console.log("Hubo un error al tratar de obtener el userToken");
      }
      
      setEstaLogueado(userToken != null);
      setEstaCargando(false);
    };

    const logout = () => {
      Alert.alert("Estas por cerrar sesión", "¿Estas seguro?", [
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
      try {
        await removeData(USERTOKEN);
      } catch (e) {
        console.log("Hubo un error al tratar de obtener el userToken");
      }
      setEstaLogueado(false);
      setEstaCargando(true);
    };


  if(estaCargando){
    return <SplashScreen />
  }

  return (
    <View style={ styles.screen }>
        <NavigationContainer>
          <Stack.Navigator>
          {!estaLogueado && <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/> }
          <Stack.Screen name="Home" component={HomeScreen} 
              options={
                  { title: 'Pelis App',
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
                }}/>
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
