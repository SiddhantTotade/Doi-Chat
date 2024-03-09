import React, {useState, useLayoutEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Input from '../common/Input';
import Button from '../common/Button';
import Title from '../common/Title';

import api from '../core/api';
import utils from '../core/utils';
import useGlobal from '../core/global';

export default function SignUpScreen({navigation}) {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [errorUsername, setErrorUsername] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorPassword1, setErrorPassword1] = useState('');
  const [errorPassword2, setErrorPassword2] = useState('');

  const login = useGlobal(state => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function onSignUp() {
    const failUsername = !username || username.length < 5;
    if (failUsername) setErrorUsername('Username must be >= 5 characters');

    const failFirstname = !firstName;
    if (failFirstname) setErrorFirstName('First Name not provided');

    const failLastName = !lastName;
    if (failLastName) setErrorLastName('Last Name not provided');

    const failPassword1 = !password1 || password1 < 8;
    if (failPassword1) setErrorPassword1('Password is too short');

    const failPassword2 = password2 !== password1;
    if (failPassword2) setErrorPassword2("Password don't match");

    if (
      failUsername ||
      failFirstname ||
      failLastName ||
      failPassword1 ||
      failPassword2
    ) {
      return;
    }

    api({
      url: '/auth/signup/',
      method: 'POST',
      data: {
        username: username,
        first_name: firstName,
        last_name: lastName,
        password: password1,
      },
    })
      .then(res => {
        const credentials = {username: username, password: password1};
        utils.log(res.data), login(credentials, res.data.user);
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
              paddingHorizontal: 16,
            }}>
            <Title text="Doi" color="#202020" />
            <Input
              title="Username"
              value={username}
              setValue={setUsername}
              error={errorUsername}
              setError={setErrorUsername}
            />
            <Input
              title="First Name"
              value={firstName}
              setValue={setFirstName}
              error={errorFirstName}
              setError={setErrorFirstName}
            />
            <Input
              title="Last Name"
              value={lastName}
              setValue={setLastName}
              error={errorLastName}
              setError={setErrorLastName}
            />
            <Input
              title="Password"
              value={password1}
              setValue={setPassword1}
              error={errorPassword1}
              setError={setErrorPassword1}
              secureTextEntry={true}
            />
            <Input
              title="Confirm Password"
              value={password2}
              setValue={setPassword2}
              error={errorPassword2}
              setError={setErrorPassword2}
              secureTextEntry={true}
            />
            <Button title="Sign Up" onPress={onSignUp} />
            <Text style={{textAlign: 'center', marginTop: 40}}>
              Already have an account?{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => navigation.navigate('SignIn')}>
                Sign In
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
