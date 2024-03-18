import {View, Text} from 'react-native';

import {utils} from 'core/_index';

export default function MessageBubbleMe({text, created}) {
  return (
    <View style={{flexDirection: 'row', padding: 4, paddingRight: 12}}>
      <View style={{flex: 1}} />
      <View
        style={{
          backgroundColor: '#303040',
          borderRadius: 21,
          maxWidth: '75%',
          paddingHorizontal: 8,
          paddingVertical: 8,
          justifyContent: 'center',
          marginRight: 8,
          minHeight: 42,
        }}>
        <Text style={{color: '#fff', fontSize: 10, lineHeight: 18}}>
          {utils.convertTime(created)}
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 13,
            lineHeight: 18,
            borderColor: 'red',
            padding: 8,
            borderRadius: 10,
            backgroundColor: '#4d4d4d',
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
}
