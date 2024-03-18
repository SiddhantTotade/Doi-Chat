import {View, Text} from 'react-native';

import {Thumbnail} from 'common/index';
import {utils} from 'core/_index';
import MessageTypingAnimation from './MessageTypingAnimation';

export default function MessageBubbleFriend({
  text = '',
  friend,
  created,
  typing = false,
}) {
  return (
    <View style={{flexDirection: 'row', padding: 4, paddingLeft: 16}}>
      <Thumbnail url={friend.thumbnail} size={20} />
      <View
        style={{
          backgroundColor: '#d0d2db',
          borderRadius: 21,
          maxWidth: '75%',
          paddingHorizontal: 8,
          paddingVertical: 8,
          justifyContent: 'center',
          marginLeft: 8,
          minHeight: 42,
        }}>
        <Text style={{color: '#000', fontSize: 10, lineHeight: 18}}>
          {utils.convertTime(created)}
        </Text>
        {typing ? (
          <View style={{flexDirection: 'row'}}>
            <MessageTypingAnimation offset={0} />
            <MessageTypingAnimation offset={1} />
            <MessageTypingAnimation offset={2} />
          </View>
        ) : (
          <Text
            style={{
              color: '#202020',
              fontSize: 13,
              lineHeight: 18,
              padding: 8,
              borderRadius: 10,
              backgroundColor: '#e0e0e0',
            }}>
            {text}
          </Text>
        )}
      </View>
      <View style={{flex: 1}} />
    </View>
  );
}
