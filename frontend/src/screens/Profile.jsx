import React from 'react';
import {View, Text} from 'react-native';

import {useGlobal} from 'core/_index';
import {ProfileImage, ProfileLogout} from './profile/index';

export default function ProfileScreen() {
  const user = useGlobal(state => state.user);

  return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 100}}>
      <ProfileImage />
      <Text
        style={{
          textAlign: 'center',
          color: '#303030',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 6,
          marginBottom: 6,
        }}>
        {user.name}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: '#303030',
          fontSize: 14,
        }}>
        @{user.username}
      </Text>
      <ProfileLogout />
    </View>
  );
}
