import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, ToastAndroid } from 'react-native';
import { saveData, getData } from '../store/store';
import { FONT_TITLE} from '../utils/colors';
import { LOGGEDUSER, USERSFILTERS, BACKGROUNDLOGIN } from '../utils/constants';


const LoginScreen = props => {
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const { screen, image, welcomeText, input, button } = styles;

  const signIn = async () => {
    if ( userName === '' || pass === '' ) {
      return ToastAndroid.show("Complete todos los campos", ToastAndroid.LONG);
    };

    const usersLocalstorage = await getData(USERSFILTERS);
    const newUserFilters = {
      animation: true,
      comedy: true,
      drama: true,
      thriller: true,
      terror: true
    };

    if (usersLocalstorage === null) {
      const newUsers = {};
      newUsers[userName] = newUserFilters;

      await saveData(USERSFILTERS, newUsers);
      await saveData(LOGGEDUSER, userName);
    } else {
      if (usersLocalstorage[userName] === undefined) {
        usersLocalstorage[userName] = newUserFilters;
        await saveData(USERSFILTERS, usersLocalstorage);
      }
      await saveData(LOGGEDUSER, userName);
    }

    props.navigation.navigate('Home');
    // props.navigation.navigate('Home', {
    //   user: userName,
    //   users: usersLocalstorage
    // });
  };

  return (
    <View style={screen}>
      <ImageBackground source={BACKGROUNDLOGIN} style={image}>
      <Text style={welcomeText}>Bienvenido a Pelis App</Text>
      <TextInput
      style={input}
      onChangeText={setUserName}
      placeholder="Ingrese usuario..."
      value={userName} />
      <TextInput
      style={input}
      onChangeText={setPass}
      placeholder="Ingrese password..."
      value={pass}
      secureTextEntry={true} />

      <TouchableOpacity
      style={button}
      activeOpacity={0.6}
      onPress={signIn}>
      <Text style={{fontSize: 20, color: "#fff"}}>Login</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //backgroundColor: PRIMARY
  },
  image: {
    flex:2,
    alignItems: 'center',

  },
  welcomeText: {
    color: FONT_TITLE,
    backgroundColor: "#fffbf4",
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 150,
    marginBottom: 50,
    borderRadius: 20,
    padding: 10
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#eee",
    backgroundColor: "#fff",
    padding: 10
  },
  button: {
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    backgroundColor: '#20dad8',
    borderRadius: 20,
    marginTop: 50
  }
});

export default LoginScreen;