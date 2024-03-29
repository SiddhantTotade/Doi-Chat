import {TouchableOpacity, Text, View} from 'react-native';

import {Cell, Thumbnail} from 'common/index';
import {utils} from 'core/_index';

export default function FriendRow({navigation, item}) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Message', item)}>
      <Cell>
        <Thumbnail url={item.friend.thumbnail} size={76} />
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <Text style={{fontWeight: 'bold', color: '#202020', marginBottom: 4}}>
            {item.friend.name}
          </Text>
          <Text style={{color: '#606060'}}>
            {item.preview}
            {'.'}
            <Text style={{color: '#909090', fontSize: 13}}>
              {utils.formatTime(item.updated)}
            </Text>
          </Text>
        </View>
      </Cell>
    </TouchableOpacity>
  );
}
