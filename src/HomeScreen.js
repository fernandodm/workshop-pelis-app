import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PeliculasScreen from './PeliculasScreen';
import PerfilScreen from './PerfilScreen';

const Tab = createMaterialBottomTabNavigator();

const HomeScreen = props => {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Peliculas" component={PeliculasScreen} 
                    options={{
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="movie-open-outline" color={color} size={26} />
                        ),
                      }}/>
                <Tab.Screen name="Perfil" component={PerfilScreen} 
                    options={{
                        tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                        ),
                    }}/>
            </Tab.Navigator>
    );
};

export default HomeScreen;