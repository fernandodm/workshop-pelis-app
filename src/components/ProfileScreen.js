import React, { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet, Switch, Text, ToastAndroid, View } from 'react-native';
import { getData, saveData } from '../store/store';
import { LOGGEDUSER, USERSFILTERS } from '../utils/constants';

const FilterSwitch = ({name, state, onChange}) => {
    return (
        <View style={styles.filtroContainer}>
            <Text>{name}</Text>
            <Switch
                trackColor={{true: '#2196f3', false: '#778899'}}
                thumbColor={Platform.OS === 'android' ? '#2196f3' : ''}
                value={state}
                onValueChange={onChange} />
        </View>
    );
};

const ProfileScreen = props => {
    const [isAnimation, setIsAnimation] = useState(false);
    const [isComedy, setIsComedy] = useState(false);
    const [isDrama, setIsDrama] = useState(false);
    const [isThriller, setIsThriller] = useState(false);
    const [isTerror, setIsTerror] = useState(false);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState({});

    useEffect(async () => {
        const usersLocalstorage = await getData(USERSFILTERS);
        setUsers(usersLocalstorage);

        const userLocalstorage = await getData(LOGGEDUSER);
        setUser(userLocalstorage);

        const userFilters = usersLocalstorage[userLocalstorage];

        setIsAnimation(userFilters.animation);
        setIsComedy(userFilters.comedy);
        setIsDrama(userFilters.drama);
        setIsThriller(userFilters.thriller);
        setIsTerror(userFilters.terror);
    }, []);

    const saveFilters = () => {
        const selectedFilters = {
            animation: isAnimation,
            comedy: isComedy,
            drama: isDrama,
            thriller: isThriller,
            terror: isTerror
        }

        try{
            users[user] = selectedFilters;
            saveData(USERSFILTERS, users);
            props.navigation.navigate('movies');
            ToastAndroid.show("Filtros guardado correctamente", ToastAndroid.SHORT);
        }catch(ex){
            ToastAndroid.show("No se pudieron guardar los filtros", ToastAndroid.SHORT);
        }
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.text}>Usuario: {user}</Text>
            <FilterSwitch
                name={'Animación'}
                state={isAnimation}
                onChange={newValue => setIsAnimation(newValue)} />
            <FilterSwitch
                name={'Comedia'}
                state={isComedy}
                onChange={newValue => setIsComedy(newValue)} />
            <FilterSwitch
                name={'Drama'}
                state={isDrama}
                onChange={newValue => setIsDrama(newValue)} />
            <FilterSwitch
                name={'Thriller'}
                state={isThriller}
                onChange={newValue => setIsThriller(newValue)} />
            <FilterSwitch
                name={'Terror'}
                state={isTerror}
                onChange={newValue => setIsTerror(newValue)} />
            <View style={styles.button}>
                <Button
                    onPress={saveFilters}
                    title="Guardar"/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button:{
        width: '50%',
        margin: 15
    },
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        margin: 15,
        textAlign: 'center',
    },
    filtroContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%'
    }
});

export default ProfileScreen;