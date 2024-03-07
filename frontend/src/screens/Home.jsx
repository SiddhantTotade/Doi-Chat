import React from 'react';
import {useLayoutEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import RequestsScreen from './Requests';
import FriendsScreen from './Friends';
import ProfileScreen from './Profile';
import {TouchableOpacity} from 'react-native';
import {icon} from '@fortawesome/fontawesome-svg-core';

const Tab = createBottomTabNavigator();

export default function HomeScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        headerRight: () => (
          <TouchableOpacity>
            <FontAwesomeIcon
              style={{marginRight: 16}}
              icon="magnifying-glass"
              size={22}
              color="#404040"
            />
          </TouchableOpacity>
        ),
        tabBarIcon: ({focused, color, size}) => {
          const icons = {Requests: 'bell', Friends: 'inbox', Profile: 'user'};
          const icon = icons[route.name];
          return <FontAwesomeIcon icon={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#202020',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Requests" component={RequestsScreen}></Tab.Screen>
      <Tab.Screen name="Friends" component={FriendsScreen}></Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}
