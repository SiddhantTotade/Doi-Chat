import React, {useState, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import Input from '../common/Input';
import Title from '../common/Title';
import Button from '../common/Button';

import api from '../core/api';
import utils from '../core/utils';
import useGlobal from '../core/global';

export default function SignInScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const login = useGlobal(state => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function onSignIn() {
    const failUsername = !username;
    if (failUsername) setErrorUsername('Username not provided');

    const failPassword = !password;
    if (failPassword) setErrorPassword('Password not provided');

    if (failPassword || failUsername) {
      return;
    }

    // Make SignIn Request
    api({
      url: '/auth/signin/',
      method: 'POST',
      data: {username: username, password: password},
    })
      .then(res => {
        const credentials = {username: username, password: password};
        utils.log(res.data), login(credentials, res.data.user, res.data.tokens);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error);
        }
        console.log('Error', error);
      });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <Title text="Doi" color="#202020" />
            <Input
              title="Username"
              value={username}
              error={errorUsername}
              setValue={setUsername}
              setError={setErrorUsername}
            />
            <Input
              title="Password"
              value={password}
              error={errorPassword}
              setValue={setPassword}
              setError={setErrorPassword}
              secureTextEntry={true}
            />
            <Button title="Sign In" onPress={onSignIn} />
            <Text style={{textAlign: 'center', marginTop: 40}}>
              Don't have an account?{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
