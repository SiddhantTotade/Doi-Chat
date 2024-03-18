import {useLayoutEffect, useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, InputAccessoryView} from 'react-native';

import {useGlobal} from 'core/_index';
import {MessageInput, MessageHeader, MessageBubble} from './messages/index';

export default function MessagesScreen({navigation, route}) {
  const [message, setMessage] = useState('');
  const messageList = useGlobal(state => state.messageList);
  const messagesList = useGlobal(state => state.messagesList);
  const messageSend = useGlobal(state => state.messageSend);
  const messageType = useGlobal(state => state.messageType);
  const messagesNext = useGlobal(state => state.messagesNext);
  const connectionId = route.params.id;
  const friend = route.params.friend;

  // Update the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <MessageHeader friend={friend} />,
    });
  }, []);

  useEffect(() => {
    messageList(connectionId);
  }, []);

  function onSend() {
    const cleaned = message.replace(/\s+/g, ' ').trim();
    if (cleaned.length === 0) return;
    messageSend(connectionId, cleaned);
    setMessage('');
  }

  function onType(value) {
    setMessage(value);
    messageType(friend.username);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          marginBottom: Platform.OS === 'ios' ? 60 : 0,
        }}>
        <FlatList
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={{paddingTop: 30}}
          data={[{id: -1}, ...messagesList]}
          inverted={true}
          keyExtractor={item => item.id}
          onEndReached={() => {
            if (messagesNext) {
              messageList(connectionId, messagesNext);
            }
          }}
          renderItem={({item, index}) => (
            <MessageBubble index={index} message={item} friend={friend} />
          )}
        />
      </View>
      {Platform.OS === 'ios' ? (
        <InputAccessoryView>
          <MessageInput message={message} setMessage={onType} onSend={onSend} />
        </InputAccessoryView>
      ) : (
        <MessageInput message={message} setMessage={onType} onSend={onSend} />
      )}
    </SafeAreaView>
  );
}
