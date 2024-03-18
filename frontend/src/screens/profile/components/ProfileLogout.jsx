import {TouchableOpacity, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useGlobal} from 'core/_index';

export default function ProfileLogout() {
  const logout = useGlobal(state => state.logout);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 26,
        backgroundColor: '#202020',
        marginTop: 40,
      }}
      onPress={logout}>
      <FontAwesomeIcon
        icon="right-from-bracket"
        size={20}
        color="#d0d0d0"
        style={{marginRight: 12}}
      />
      <Text style={{fontWeight: 'bold', color: '#d0d0d0'}}>Logout</Text>
    </TouchableOpacity>
  );
}
