import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { saveData, getData } from '../store/store';
import { FONT_COLOR, PRIMARY } from '../utils/colors';
import { LOGGEDUSER, USERSFILTERS } from '../utils/constants';


const LoginScreen = props => {
  const [userName, setUserName] = useState(null);
  const [pass, setPass] = useState(null);

  const signIn = async () => {
      const usersLocalstorage = await getData(USERSFILTERS);
      const newUserFilters = {
        animation: true,
        comedy: true,
        drama: true,
        thriller: true,
        terror: true
      };

      if ( usersLocalstorage === null ) {
        const newUsers = {};
        newUsers[userName] = newUserFilters;

        await saveData(USERSFILTERS, newUsers);
        await saveData(LOGGEDUSER, userName);
      } else {
        if ( usersLocalstorage[userName] === undefined ) {
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
    <View style={styles.screen}>
      <Text style={styles.welcomeText}>Bienvenido a Pelis App</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUserName}
        placeholder="Ingrese usuario..."
        value={userName} />
      <TextInput
        style={styles.input}
        onChangeText={setPass}
        placeholder="Ingrese password..."
        value={pass}
        secureTextEntry={true} />

      <TouchableOpacity
        style={{
            borderWidth:1,
            borderColor:'#eee',
            alignItems:'center',
            justifyContent:'center',
            width:100,
            height:100,
            backgroundColor:PRIMARY,
            borderRadius:50,
            marginTop: 50
          }}
          onPress={signIn}>
        <Text style={{fontSize: 20, color: "#fff"}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: PRIMARY
  },
  welcomeText: {
    color: FONT_COLOR,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 150,
    marginBottom: 50
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
    borderColor: "#fff"
  }
});

export default LoginScreen;