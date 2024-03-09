import {View, Text, TextInput} from 'react-native';

export default function Input({
  title,
  value,
  error,
  setValue,
  setError,
  secureTextEntry = false,
}) {
  return (
    <View>
      <Text
        style={{
          color: error ? '#ff5555' : '#70747a',
          marginVertical: 6,
          paddingLeft: 16,
        }}>
        {error ? error : title}
      </Text>
      <TextInput
        style={{
          backgroundColor: '#e1e2e4',
          borderWidth: 1,
          borderColor: error ? '#ff5555' : 'transparent',
          borderRadius: 10,
          height: 52,
          paddingHorizontal: 16,
          fontSize: 16,
        }}
        autoCapitalize="none"
        autoComplete="off"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={text => {
          setValue(text);
          if (error) {
            setError('');
          }
        }}
      />
    </View>
  );
}
