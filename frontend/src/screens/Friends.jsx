import React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';

import {Empty} from 'common/index';
import {useGlobal} from 'core/_index';
import {FriendRow} from './friends/index';

export default function FriendsScreen({navigation}) {
  const friendList = useGlobal(state => state.friendList);

  // Show loading indicator
  if (friendList === null) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  // Show empty if no request
  if (friendList?.length === 0) {
    return <Empty icon="inbox" message="No messages yet" />;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={friendList}
        renderItem={({item}) => (
          <FriendRow navigation={navigation} item={item} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
