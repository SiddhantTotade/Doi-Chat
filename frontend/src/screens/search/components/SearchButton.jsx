import {TouchableOpacity, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useGlobal} from 'core/_index';

export default function SearchButton({user}) {
  // Add a tick icon if the user is already connected
  if (user.status === 'connected') {
    return (
      <FontAwesomeIcon
        icon="circle-check"
        size={30}
        color="#20d080"
        style={{marginRight: 10}}
      />
    );
  }

  const requestConnect = useGlobal(state => state.requestConnect);

  const data = {};

  switch (user.status) {
    case 'no-connection':
      data.text = 'Connect';
      data.disabled = false;
      data.onPress = () => requestConnect(user.username);
      break;
    case 'pending-them':
      data.text = 'Pending';
      data.disabled = true;
      data.onPress = () => {};
      break;
    case 'pending-me':
      data.text = 'Accept';
      data.disabled = false;
      data.onPress = () => {};
      break;

    default:
      break;
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: data.disabled ? '#505055' : '#202020',
        paddingHorizontal: 14,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
      }}
      disabled={data.disabled}
      onPress={data.onPress}>
      <Text
        style={{
          color: data.disabled ? '#808080' : '#fff',
          fontWeight: 'bold',
        }}>
        {data.text}
      </Text>
    </TouchableOpacity>
  );
}
