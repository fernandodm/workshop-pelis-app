import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MoviesScreen from './MoviesScreen';
import ProfileScreen from './ProfileScreen';
import { BACKGROUNDHOME } from '../utils/constants';


const Tab = createMaterialBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="movies"
        component={MoviesScreen}
        // children={() => (
        //   <MoviesScreen
        //     user={user}
        //     users={users} />
        // )}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="movie-open-outline"
              color={color}
              size={26} />
          )
        }}/>
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        // children={() => (
        //   <ProfileScreen
        //     user={user}
        //     users={users} />
        // )}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={26} />
          )
        }}/>
    </Tab.Navigator>
  );
};


export default HomeScreen;