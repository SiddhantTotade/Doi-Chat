import React from 'react';
import {ActivityIndicator, View, FlatList} from 'react-native';

import {Empty} from 'common/index';
import {useGlobal} from 'core/_index';
import {RequestRow} from './requests/index';

export default function RequestsScreen() {
  const requestList = useGlobal(state => state.requestList);

  // Show loading indicator
  if (requestList === null) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  // Show empty if no request
  if (requestList?.length === 0) {
    return <Empty icon="bell" message="No request" />;
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={requestList}
        renderItem={({item}) => <RequestRow item={item} />}
        keyExtractor={item => item.sender.username}
      />
    </View>
  );
}
