import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useGlobal} from 'core/_index';
import {Thumbnail} from 'common/index';
import {FriendsScreen, ProfileScreen, RequestsScreen} from './_index';

const Tab = createBottomTabNavigator();

export default function HomeScreen({navigation}) {
  const socketConnect = useGlobal(state => state.socketConnect);
  const socketClose = useGlobal(state => state.socketClose);
  const user = useGlobal(state => state.user);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    };
  }, []);

  function onSearch() {
    navigation.navigate('Search');
  }

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        headerLeft: () => (
          <View style={{marginLeft: 16}}>
            <Thumbnail url={user.thumbnail} size={28} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={onSearch}>
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
