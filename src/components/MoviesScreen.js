import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { movies } from '../../MoviesMock';
import { getData } from '../store/store';
import { FONT_COLOR, PRIMARY } from '../utils/colors';
import { ANIMATION, COMEDY, DRAMA, TERROR, THRILLER, LOGGEDUSER, USERSFILTERS } from '../utils/constants';
import MovieBox from './MovieBox';

const MoviesScreen = () => {
  const [filteredMovies, setfilteredMovies] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getFilteredMovies();
    }, [])
  );

  const getFilteredMovies = async () => {
    const usersLocalstorage = await getData(USERSFILTERS);
    const userLocalstorage = await getData(LOGGEDUSER);

    const selectedFilters = usersLocalstorage[userLocalstorage];

    const newFilteredMovies = movies.filter(movie => {
      if(movie.type === ANIMATION && !selectedFilters.animation) {
        return false;
      }
      if(movie.type === COMEDY && !selectedFilters.comedy) {
        return false;
      }
      if(movie.type === DRAMA && !selectedFilters.drama) {
        return false;
      }
      if(movie.type === THRILLER && !selectedFilters.thriller) {
        return false;
      }
      if(movie.type === TERROR && !selectedFilters.terror) {
        return false;
      }
      return true;
    });

    setfilteredMovies(newFilteredMovies);
  }

  return (
    <>
      {
        filteredMovies.length === 0 &&
        <View style={styles.textNotFound}>
          <Text style={{color: 'rgba(0,0,0,0.6)'}}>No se encontraron peliculas</Text>
        </View>
      }
      {
        filteredMovies.length > 0 &&
        <FlatList
          keyExtractor={(item) => item.name}
          data={filteredMovies}
          renderItem={MovieBox} />
      }
    </>
  );
};

const styles = StyleSheet.create({
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

export default MoviesScreen;