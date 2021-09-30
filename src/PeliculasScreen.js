import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { PRIMARY, FONT_COLOR } from './utils/colors';
import { DRAMA, COMEDIA, ANIMACION, TERROR, THRILLER, FILTROS } from './utils/constants';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from './store/store'
import { peliculas } from '../PeliculasMock'

const renderGridItem = (itemData) => {
    return (
            <View style={style.peliculaItem}>
                <View  style={style.peliculaHeader}>
                    <ImageBackground source={{uri: itemData.item.image}} style={style.imagen}>
                        <Text style={style.textoTitulo}>{itemData.item.name}</Text>
                    </ImageBackground>
                </View>
                <View style={{...style.peliculaRow, ...style.peliculaDetalle}}>
                    <Text style={style.textoDetalle}>{itemData.item.type}</Text>
                </View>
            </View>
        );
};

const PeliculasScreen = props => {
    const [peliculasFiltradas, setPeliculasFiltradas] = useState([]);    
   
    useFocusEffect(
        React.useCallback(() => {
            getPeliculasFiltradas();
        }, [])
      );

    const getPeliculasFiltradas = async () => {
        const filtrosAplicados = await getData(FILTROS);
        if(filtrosAplicados === null)
            return setPeliculasFiltradas([]);

        const pelisFiltradas = peliculas.filter(pelicula => {
            if(pelicula.type === ANIMACION && !filtrosAplicados.animacion) {
                return false;
            }
            if(pelicula.type === COMEDIA && !filtrosAplicados.comedia) {
                return false;
            }
            if(pelicula.type === DRAMA && !filtrosAplicados.drama) {
                return false;
            }
            if(pelicula.type === THRILLER && !filtrosAplicados.thriller) {
                return false;
            }
            if(pelicula.type === TERROR && !filtrosAplicados.terror) {
                return false;
            } 
            return true;
        });

        setPeliculasFiltradas(pelisFiltradas);
    }

    return (
        <>  
            { peliculasFiltradas.length === 0 && 
                <View style={style.textNotFound}>
                    <Text style={{color:  'rgba(0,0,0,0.6)'}}>No se encontraron peliculas</Text>
                </View>
            }
            { peliculasFiltradas.length != 0 &&
             <FlatList 
                keyExtractor={(item) => item.name}
                data={peliculasFiltradas} 
                renderItem={renderGridItem}
            />}
        </>
    );
};

const style = StyleSheet.create({
    textNotFound: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: 15
    },
    textoDetalle: {
        color: FONT_COLOR
    },
    textoTitulo: {
        fontSize: 22,
        color: FONT_COLOR,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingVertical: 5,
        paddingHorizontal:12
    },
    imagen: {
        width: '100%', 
        height: '100%'
    },
    peliculaItem: {
        flex: 1,
        margin: 15,
        width: '93%',
        height: 200,
        backgroundColor: PRIMARY
    },
    peliculaHeader: {
        height: '85%'
    },
    peliculaDetalle: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    }
});

export default PeliculasScreen;