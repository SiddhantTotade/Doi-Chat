import {View, Text} from 'react-native';

import SearchButton from './SearchButton';
import {Thumbnail, Cell} from 'common/index';

export default function SearchRow({user}) {
  return (
    <Cell>
      <Thumbnail url={user.thumbnail} size={76} />
      <View style={{flex: 1, paddingHorizontal: 16}}>
        <Text style={{fontWeight: 'bold', color: '#202020', marginBottom: 4}}>
          {user.name}
        </Text>
        <Text style={{color: '#606060'}}>{user.username}</Text>
      </View>
      <SearchButton user={user} />
    </Cell>
  );
}
