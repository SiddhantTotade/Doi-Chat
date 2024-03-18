import {TouchableOpacity, Text} from 'react-native';

import {useGlobal} from 'core/_index';

export default function RequestAccept({item}) {
  const requestAccept = useGlobal(state => state.requestAccept);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#202020',
        paddingHorizontal: 14,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => requestAccept(item.sender.username)}>
      <Text style={{color: '#fff', fontWeight: 'bold'}}>Accept</Text>
    </TouchableOpacity>
  );
}
