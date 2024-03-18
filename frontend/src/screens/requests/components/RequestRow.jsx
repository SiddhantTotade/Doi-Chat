import {View, Text} from 'react-native';

import {utils} from 'core/_index';
import {Cell, Thumbnail} from 'common/index';
import {RequestAccept} from 'screens/requests/index';

export default function RequestRow({item}) {
  const message = 'Request to connect';

  return (
    <Cell>
      <Thumbnail url={item.sender.thumbnail} size={76} />
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <Text style={{fontWeight: 'bold', color: '#202020', marginBottom: 4}}>
          {item.sender.name}
        </Text>
        <Text style={{color: '#606060'}}>
          {message}{' '}
          <Text style={{color: '#909090', fontSize: 13}}>
            {utils.formatTime(item.created)}
          </Text>
        </Text>
      </View>
      <RequestAccept item={item} />
    </Cell>
  );
}
