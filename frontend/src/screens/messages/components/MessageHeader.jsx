import {View, Text} from 'react-native';

import {Thumbnail} from 'common/index';

export default function MessageHeader({friend}) {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
      <Thumbnail url={friend.thumbnail} size={30} />
      <Text
        style={{
          marginLeft: 10,
          fontSize: 18,
          fontWeight: 'bold',
          color: '#202020',
        }}>
        {friend.name}
      </Text>
    </View>
  );
}
