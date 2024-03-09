import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {launchImageLibrary} from 'react-native-image-picker';

import useGlobal from '../core/global';
import utils from '../core/utils';

function ProfileImage() {
  return (
    <TouchableOpacity
      onPress={() =>
        launchImageLibrary({includeBase64: true}, response => {
          utils.log('LaunchImage', response);
          if(response.didCancel) return
          const file = response.assets(0)
        })
      }>
      <Image
        source={require('../assets/Profile.png')}
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: '#e0e0e0',
          marginBottom: 20,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          right: 10,
          backgroundColor: '#202020',
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: '#fff',
        }}>
        <FontAwesomeIcon icon="pencil" size={15} color="#d0d0d0" />
      </View>
    </TouchableOpacity>
  );
}

function ProfileLogout() {
  const logout = useGlobal(state => state.logout);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 26,
        backgroundColor: '#202020',
        marginTop: 40,
      }}
      onPress={logout}>
      <FontAwesomeIcon
        icon="right-from-bracket"
        size={20}
        color="#d0d0d0"
        style={{marginRight: 12}}
      />
      <Text style={{fontWeight: 'bold', color: '#d0d0d0'}}>Logout</Text>
    </TouchableOpacity>
  );
}

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
