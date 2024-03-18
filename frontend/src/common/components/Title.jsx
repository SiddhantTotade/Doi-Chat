import React from 'react';
import {Text} from 'react-native';

export default function Title({text, color}) {
  return (
    <Text
      style={{
        color: color,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'LeckerliOne-Regular',
        marginBottom: 30,
      }}>
      {text}
    </Text>
  );
}
