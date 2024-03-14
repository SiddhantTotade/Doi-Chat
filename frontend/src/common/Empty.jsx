import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';

export default function Empty({icon, message, ceneterd = true}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: ceneterd ? 'center' : 'flex-start',
        alignItems: 'center',
        paddingVertical: 120,
      }}>
      <FontAwesomeIcon
        icon={icon}
        size={90}
        color="#d0d0d0"
        style={{marginBottom: 16}}
      />
      <Text style={{color: '#c3c3c3', fontSize: 16}}>{message}</Text>
    </View>
  );
}
