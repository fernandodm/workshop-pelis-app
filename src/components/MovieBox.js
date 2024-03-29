import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { FONT_COLOR, PRIMARY } from '../utils/colors';

const MovieBox = props => {
  const { movieContainer, movieHeader, imageBackground, title, peliculaRow, descriptionBox, description } = styles;
  return (
    <View style={movieContainer}>
      <View style={movieHeader}>
        <ImageBackground source={{ uri: props.item.image }} style={imageBackground}>
          <Text style={title}>{props.item.name}</Text>
        </ImageBackground>
      </View>
      <View style={{ ...peliculaRow, ...descriptionBox }}>
        <TouchableOpacity onPress={() => Linking.openURL(props.item.url )}>
          <Text style={description}>{props.item.type}</Text>
      </TouchableOpacity>
    </View>
    </View >
  );
};

const styles = StyleSheet.create({
  description: {
    color: FONT_COLOR
  },
  title: {
    fontSize: 22,
    color: FONT_COLOR,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  movieContainer: {
    flex: 1,
    margin: 15,
    width: '93%',
    height: 200,
    backgroundColor: PRIMARY
  },
  movieHeader: {
    height: '85%'
  },
  descriptionBox: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  }
});

export default MovieBox;