import {View, TextInput, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function MessageInput({message, setMessage, onSend}) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        placeholder="Type here..."
        placeholderTextColor="#909090"
        value={message}
        onChangeText={setMessage}
        style={{
          flex: 1,
          paddingHorizontal: 18,
          borderWidth: 1,
          borderRadius: 25,
          borderColor: '#d0d0d0',
          backgroundColor: '#fff',
          height: 50,
        }}
      />
      <TouchableOpacity onPress={onSend}>
        <FontAwesomeIcon
          icon="paper-plane"
          size={22}
          color="#303040"
          style={{marginHorizontal: 12}}
        />
      </TouchableOpacity>
    </View>
  );
}
