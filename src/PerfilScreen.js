import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Platform, ToastAndroid, Button } from 'react-native';
import { getData, saveData } from './store/store'
import { FILTROS, USERTOKEN } from './utils/constants'

const FilterSwitch = props => {
    return (
        <View style={style.filtroContainer}>
            <Text>{props.name}</Text>
            <Switch 
                trackColor={{true: '#2196f3', false: '#778899'}}
                thumbColor={Platform.OS === 'android' ? '#2196f3' : ''}
                value={props.state} 
                onValueChange={props.onChange}
            />
        </View>
    );
};

const PerfilScreen = props => {
    const [isAnimacionSeleccionado, setIsAnimacionSeleccionado] = useState(false);
    const [isComediaSeleccionado, setIsComediaSeleccionado] = useState(false);
    const [isDramaSeleccionado, setIsDramaSeleccionado] = useState(false);
    const [isThrillerSeleccionado, setIsThrillerSeleccionado] = useState(false);
    const [isTerrorSeleccionado, setIsTerrorSeleccionado] = useState(false);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setUserName(await getData(USERTOKEN))

            const filtros = await getData(FILTROS);

            if(filtros != null){
                setIsAnimacionSeleccionado(filtros.animacion);
                setIsComediaSeleccionado(filtros.comedia);
                setIsDramaSeleccionado(filtros.drama);
                setIsThrillerSeleccionado(filtros.thriller);
                setIsTerrorSeleccionado(filtros.terror);
            }
        }
        fetchData();
    }, []);     

    const guardarFiltros = () => {
        const filtrosAplicados = {
            animacion: isAnimacionSeleccionado,
            comedia: isComediaSeleccionado,
            drama: isDramaSeleccionado,
            thriller: isThrillerSeleccionado,
            terror: isTerrorSeleccionado
        }
        
        try{
            saveData(FILTROS, filtrosAplicados);
            props.navigation.navigate('Peliculas');
            ToastAndroid.show("Filtros guardado correctamente", ToastAndroid.SHORT);
        }catch(ex){
            ToastAndroid.show("No se pudieron guardar los filtros", ToastAndroid.SHORT);
        }        
    };

    return (
        <View style={style.screen}>
            <Text style={style.text}>Usuario: {userName}</Text>
            <FilterSwitch 
                    name={'Animacion'} 
                    state={isAnimacionSeleccionado} 
                    onChange={newValue => setIsAnimacionSeleccionado(newValue)}
                    />
            <FilterSwitch 
                    name={'Comedia'} 
                    state={isComediaSeleccionado} 
                    onChange={newValue => setIsComediaSeleccionado(newValue)}
                    />
            <FilterSwitch 
                name={'Drama'} 
                state={isDramaSeleccionado} 
                onChange={newValue => setIsDramaSeleccionado(newValue)}
                />
            <FilterSwitch 
                name={'Thriller'} 
                state={isThrillerSeleccionado} 
                onChange={newValue => setIsThrillerSeleccionado(newValue)}
                />
            <FilterSwitch 
                name={'Terror'} 
                state={isTerrorSeleccionado} 
                onChange={newValue => setIsTerrorSeleccionado(newValue)}
                />
            <View style={style.button}>
                <Button onPress={guardarFiltros} 
                        title="Guardar"
                    />
            </View>
        </View>
    );
};

const style = StyleSheet.create({
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

export default PerfilScreen;