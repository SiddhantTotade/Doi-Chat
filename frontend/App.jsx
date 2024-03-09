import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import './src/core/fontawesome';
import useGlobal from './src/core/global';

import SplashScreen from './src/screens/Splash';
import HomeScreen from './src/screens/Home';
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import SearchScreen from './src/screens/Search';
import MessagesScreen from './src/screens/Messages';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const initialized = useGlobal(state => state.initialized);
  const authenticated = useGlobal(state => state.authenticated);
  const init = useGlobal(state => state.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <NavigationContainer theme={lightTheme}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        {!initialized ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Message" component={MessagesScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
