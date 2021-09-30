import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableOpacity } from 'react-native'
import { saveData } from './store/store';
import { USERTOKEN } from './utils/constants';
import { PRIMARY, FONT_COLOR } from './utils/colors';

const LoginScreen = props => {
  const [userName, setUserName] = useState(null);
  const [pass, setPass] = useState(null);

     const signIn = async () => {
          await saveData(USERTOKEN, userName);
          props.navigation.navigate('Home');
       };

    return (
          <View style={style.screen}>
            <Text style={style.textBienvenida}>Bienvenido a Pelis App</Text>
            <TextInput
              style={style.input}
              onChangeText={setUserName}
              placeholder="Ingrese usuario..."
              value={userName}
            />
            <TextInput
              style={style.input}
              onChangeText={setPass}
              placeholder="Ingrese password..."
              value={pass}
              secureTextEntry={true}
            />

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

const style = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: PRIMARY
  },
  textBienvenida: {
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